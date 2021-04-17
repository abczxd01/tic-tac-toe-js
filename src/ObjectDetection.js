class ObjectDetection {
  constructor() {
    this.net = new brain.NeuralNetwork();
  }

  async getTrainData() {
    try {
      const res = await fetch(process.env.SERVER_URL+'/trainData');
      return res.json(res);
    } catch (error) {
      console.log(`Ошибка связанная с сервером:${error}`);
      return error;
    }
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
