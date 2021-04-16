import express from 'express';
import trainDataRouter from './train_data/trainDataRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.static('public'));
app.use('/trainData', trainDataRouter);
app.use(express.json());

async function startApp() {
  try {
    app.listen(PORT, () => console.log('server start'));
  } catch (err) {
    console.log(err);
  }
}

startApp();
