import { NeuralNetwork, likely } from 'brain.js';
import CanvasCell from './CanvasCell';

async function getTrainData() {
  const res = await fetch('http://127.0.0.1:8000/trainData');
  return res.json(res);
}

const net = new NeuralNetwork();

async function trainNet() {
  const trainData = await getTrainData();
  net.train(trainData, { log: true });
}
trainNet();
const canvasAll = document.querySelectorAll('.grid__canvas');
const CanvasCells = [];

function completeCanvasCells(element) {
  CanvasCells.push(new CanvasCell(element));
}

function addSizeCanvasCells(element) {
  element.height = 215;
  element.width = 215;
}

canvasAll.forEach((element, index) => {
  completeCanvasCells(element);
  addSizeCanvasCells(element, index);
});

let isMouseDown;
let curTarget;

class HandlersForDraw {
  startDraw(event, canvasCtx) {
    isMouseDown = true;
    canvasCtx.beginPath();
    curTarget = event.target;
  }

  continuebDraw(event, canvasCtx, canvasCell) {
    if (isMouseDown) {
      if (curTarget !== event.target) {
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
    isMouseDown = false;
  }
}
const handlersForDraw = new HandlersForDraw();

CanvasCells.forEach((value) => {
  value.element.addEventListener('mousedown', (event) => {
    handlersForDraw.startDraw(event, value.ctx);
  });
  value.element.addEventListener('mousemove', (event) => {
    handlersForDraw.continuebDraw(event, value.ctx, value);
  });
  value.element.addEventListener('mouseup', (event) => {
    handlersForDraw.endDraw(event, value.ctx);
    setTimeout(() => {
      const resultDetection = likely(value.calculate(), net);
      console.log(resultDetection);
      value.clear();
    }, 2000);
  });
});
