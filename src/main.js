import objectDetection from './ObjectDetection';
import handlersForDraw from './HandlersForDraw';
import CanvasCell from './CanvasCell';

objectDetection.trainNet();

const gridGame = document.querySelector('.grid-game');
const canvases = document.querySelectorAll('.grid-game__canvas');
const CanvasCells = [];

function completeCanvasCells(element) {
  CanvasCells.push(new CanvasCell(element));
}

function addSizeCanvasCells(element) {
  element.height = 215;
  element.width = 215;
}

canvases.forEach((element, index) => {
  completeCanvasCells(element);
  addSizeCanvasCells(element, index);
});

gridGame.addEventListener('mousedown', (event) => {
  if (event.target.tagName !== 'CANVAS') return false;
  handlersForDraw.startDraw(event, CanvasCells[event.target.id].ctx);
});

gridGame.addEventListener('mousemove', (event) => {
  if (event.target.tagName !== 'CANVAS') return false;
  handlersForDraw.continuebDraw(
    event, CanvasCells[event.target.id].ctx, CanvasCells[event.target.id],
  );
});

gridGame.addEventListener('mouseup', (event) => {
  if (event.target.tagName !== 'CANVAS') return false;
  handlersForDraw.endDraw(event, CanvasCells[event.target.id].ctx);
  setTimeout(() => {
    objectDetection.findObject(CanvasCells[event.target.id]);
    CanvasCells[event.target.id].clear();
  }, 2000);
});
