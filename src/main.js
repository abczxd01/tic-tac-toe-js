const canvasAll = document.querySelectorAll('.grid__canvas');
const canvasAllCtx = [];

for (let i = 0; i < canvasAll.length; i++) {
  canvasAllCtx.push(canvasAll[i].getContext('2d'));
  canvasAll[i].height = canvasAll[i].clientHeight;
  canvasAll[i].width = canvasAll[i].clientWidth;
}

let isMouseDown;
let curTarget;
const pixel = 12;

for (let index = 0; index < canvasAllCtx.length; index++) {
  canvasAll[index].addEventListener('mousedown', (event) => {
    isMouseDown = true;
    canvasAllCtx[index].beginPath();
    curTarget = event.target;
  });

  canvasAll[index].addEventListener('mousemove', (event) => {
    if (isMouseDown) {
      if (curTarget !== event.target) {
        canvasAllCtx[index].closePath();
      } else {
        canvasAllCtx[index].lineWidth = pixel;
        canvasAllCtx[index].fillStyle = 'red';
        canvasAllCtx[index].strokeStyle = 'red';
        canvasAllCtx[index].lineTo(event.offsetX, event.offsetY);
        canvasAllCtx[index].stroke();

        canvasAllCtx[index].beginPath();
        canvasAllCtx[index].arc(event.offsetX, event.offsetY, pixel / 2, 0, Math.PI * 2);
        canvasAllCtx[index].fill();

        canvasAllCtx[index].beginPath();
        canvasAllCtx[index].moveTo(event.offsetX, event.offsetY);
      }
    }
  });
  canvasAll[index].addEventListener('mouseup', () => { isMouseDown = false; });
}
