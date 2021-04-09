const canvasAll = document.querySelectorAll('.grid__canvas');

const canvasAllCtx = [];

for (let i = 0; i < canvasAll.length; i++) {
  canvasAllCtx.push(canvasAll[i].getContext('2d'));
  canvasAll[i].height = canvasAll[i].clientHeight;
  canvasAll[i].width = canvasAll[i].clientWidth;
}

const mouse = { x: 0, y: 0 };
let draw = false;
let curTarget;

for (let index = 0; index < canvasAllCtx.length; index++) {
  canvasAll[index].addEventListener('mousedown', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw = true;
    canvasAllCtx[index].beginPath();
    canvasAllCtx[index].moveTo(mouse.x, mouse.y);
    canvasAllCtx[index].lineWidth = 10;
    curTarget = e.target;
  });

  canvasAll[index].addEventListener('mousemove', function (e) {
    if (curTarget !== e.target) {
      canvasAllCtx[index].closePath();
      draw = false;
    }
    if (draw === true) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      canvasAllCtx[index].lineTo(mouse.x, mouse.y);
      canvasAllCtx[index].stroke();
    }
  });
  canvasAll[index].addEventListener('mouseup', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    canvasAllCtx[index].lineTo(mouse.x, mouse.y);
    canvasAllCtx[index].stroke();
    canvasAllCtx[index].closePath();
    draw = false;
  });
}
