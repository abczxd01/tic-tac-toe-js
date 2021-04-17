import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import trainDataRouter from './train_data/trainDataRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;
const players = [];

app.use(cookieParser('Secret'));
app.get('/', (req, res) => {
  if (req.cookies.userid === undefined) {
    const id = uuidv4();
    res.cookie('userid', id);
    console.log('Пользователь создан');
    players.push({ id });
  } else {
    console.log('Пользователь уже существует:', req.cookies);
    console.log(players);
  }
});

app.use(express.static('public'));
app.use('/trainData', trainDataRouter);
app.use(express.json());

async function startApp() {
  try {
    app.listen(PORT, '0.0.0.0', () => console.log('server start'));
  } catch (err) {
    console.log(err);
  }
}

startApp();
