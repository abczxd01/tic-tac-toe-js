class ObjectDetection {
  constructor() {
    this.net = new brain.NeuralNetwork();
  }

  async getTrainData() {
    const res = await fetch('http://localhost:8000/trainData');
    return res.json(res);
  }

  async trainNet() {
    const trainData = await this.getTrainData();
    this.net.train(trainData, { log: true });
  }

  async findObject(canvasCell) {
    const result = brain.likely(canvasCell.calculate(), this.net);
    console.log(result);
  }
}
export default new ObjectDetection();
