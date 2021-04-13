export default class CanvasCell {
  constructor(element) {
    this.pixelSize = 12;
    this.element = element;
    this.ctx = element.getContext('2d');
  }

  drawLine(x1, y1, x2, y2, color = 'gray') {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineJoin = 'miter';
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawCell(x, y, w, h) {
    this.ctx.fillStyle = 'blue';
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineJoin = 'miter';
    this.ctx.lineWidth = 1;
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
  }

  drawGrid() {
    const w = this.element.width;
    const h = this.element.height;
    const p = w / this.pixelSize;

    const xStep = w / p;
    const yStep = h / p;

    for (let x = 0; x < w; x += xStep) {
      this.drawLine(x, 0, x, h);
    }

    for (let y = 0; y < h; y += yStep) {
      this.drawLine(0, y, w, y);
    }
  }

  calculate(draw = false) {
    const w = this.element.width;
    const h = this.element.height;
    const p = w / this.pixelSize;

    const xStep = w / p;
    const yStep = h / p;

    const vector = [];
    const __draw = [];

    for (let x = 0; x < w; x += xStep) {
      for (let y = 0; y < h; y += yStep) {
        const data = this.ctx.getImageData(x, y, xStep, yStep);

        let nonEmptyPixelsCount = 0;
        for (let i = 0; i < data.data.length; i += 10) {
          const isEmpty = data.data[i] === 0;

          if (!isEmpty) {
            nonEmptyPixelsCount += 1;
          }
        }

        if (nonEmptyPixelsCount > 1 && draw) {
          __draw.push([x, y, xStep, yStep]);
        }

        vector.push(nonEmptyPixelsCount > 1 ? 1 : 0);
      }
    }
    if (draw) {
      this.clear();
      this.drawGrid();
      for (const _d in __draw) {
        this.drawCell(__draw[_d][0], __draw[_d][1], __draw[_d][2], __draw[_d][3]);
      }
    }
    return vector;
  }
}
