const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const PAGES_DIR = path.resolve(__dirname, 'src/');
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));


if (isDev) {
    module.exports = {
        entry: {
            main: path.resolve(__dirname, './src/main.js'),
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[contenthash].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ]
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader'
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)$/,
                    include: [
                        path.resolve(__dirname, 'src/fonts'),
                    ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|svg|gif)$/,
                    exclude: [
                        path.resolve(__dirname, 'src/fonts'),
                    ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                },
            ]
        },
        plugins: [
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`
            })),
            new CleanWebpackPlugin(),
        ]
    };
} else if (isProd) {
    module.exports = {
        entry: {
            main: path.resolve(__dirname, './src/main.js'),
        },
        output: {
            path: path.resolve(__dirname, './server/public'),
            filename: '[name].[contenthash].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '',
                                esModule: false
                            }
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    config: path.resolve(__dirname, 'postcss.config.js'),
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader'
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)$/,
                    include: [
                        path.resolve(__dirname, 'src/fonts'),
                    ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|svg|gif)$/,
                    exclude: [
                        path.resolve(__dirname, 'src/fonts'),
                    ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                },
            ]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].[contenthash].css',
            }),
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace(/\.pug/, '.html')}`
            })),
            new CleanWebpackPlugin(),
        ]
    }
}