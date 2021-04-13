import express from 'express';
import trainDataRouter from './train_data/trainDataRouter.js';

const PORT = 8000;
const app = express();
app.use('/trainData', trainDataRouter);
app.use(express.json());

async function startApp() {
  try {
    app.listen(PORT, '127.0.0.1', () => console.log('server start'));
  } catch (err) {
    console.log(err);
  }
}

startApp();
