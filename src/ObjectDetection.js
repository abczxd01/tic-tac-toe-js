import { NeuralNetwork, likely } from 'brain.js';

class ObjectDetection {
  constructor() {
    this.net = new NeuralNetwork();
  }

  async getTrainData() {
    const res = await fetch('http://127.0.0.1:8000/trainData');
    return res.json(res);
  }

  async trainNet() {
    const trainData = await this.getTrainData();
    this.net.train(trainData, { log: true });
  }

  async findObject(canvasCell) {
    const result = likely(canvasCell.calculate(), this.net);
    console.log(result);
  }
}
export default new ObjectDetection();
