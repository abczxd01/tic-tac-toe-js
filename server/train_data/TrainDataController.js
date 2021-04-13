import { readFile } from 'fs';
import { resolve, join } from 'path';

const trainDataPath = join(resolve(), '/train_data/trainData.json');
class TrainDataController {
  async get(req, res) {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
      readFile(trainDataPath, 'UTF-8', (err, result) => {
        if (err) throw new Error(err);
        res.end(result);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new TrainDataController();
