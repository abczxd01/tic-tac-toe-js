class HandlersForDraw {
  constructor() {
    this.curTarget;
    this.isMouseDown;
  }

  startDraw(event, canvasCtx) {
    this.isMouseDown = true;
    canvasCtx.beginPath();
    this.curTarget = event.target;
  }

  continuebDraw(event, canvasCtx, canvasCell) {
    if (this.isMouseDown) {
      if (this.curTarget !== event.target) {
        canvasCtx.closePath();
      } else {
        canvasCtx.lineWidth = canvasCell.pixelSize;
        canvasCtx.fillStyle = 'red';
        canvasCtx.strokeStyle = 'red';
        canvasCtx.lineTo(event.offsetX, event.offsetY);
        canvasCtx.stroke();

        canvasCtx.beginPath();
        canvasCtx.arc(event.offsetX, event.offsetY, canvasCell.pixelSize / 2, 0, Math.PI * 2);
        canvasCtx.fill();

        canvasCtx.beginPath();
        canvasCtx.moveTo(event.offsetX, event.offsetY);
      }
    }
  }

  endDraw() {
    this.isMouseDown = false;
  }
}

export default new HandlersForDraw();
