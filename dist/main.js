/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
console.log('jee')
let currentShipLength=5;
let rotate=false;
const grid1 = document.getElementById('grid1');
const grid2 = document.getElementById('grid2');
const overlayGrid = document.getElementById('grid-overlay');

const generateCells = (gridElement) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        cell.classList.add('cell');
        gridElement.appendChild(cell);
      }
    }
  }
  generateCells(grid1);
  generateCells(grid2);
  generateCells(overlayGrid);

const isValidColumn=(column) => {
    return column >= 0 && column <= 9;
  }

const isValidRow=(row) => {
  return row >= 0 && row <= 9;
  }

const hoverShips = (row,column) => {
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
    if (isValidColumn(column)) {
    overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${column}"]`)
          .classList.add('hovered');
        }
    column++;
  }
} else {
  for (let i = 0; i < currentShipLength; i++) {
    if (isValidRow(row)) {
    overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${column}"]`)
          .classList.add('hovered');
        }
    row++;
  }
}  
}

const unHoverShips = (row,column) => {
  if (!rotate) {
  for (let i = 0; i < currentShipLength; i++) {
    if (isValidColumn(column)) {
    overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${column}"]`)
          .classList.remove('hovered');
    }
    column++;
  }}
  else {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidRow(row)) {
      overlayGrid
            .querySelector(`[data-row="${row}"][data-col="${column}"]`)
            .classList.remove('hovered');
          }
      row++;
    }
  }   
}


overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('mouseenter', (e) => {
    let row = e.target.dataset.row;
    let column = e.target.dataset.col;
    console.log('jee')
    hoverShips(row, column);
  });
})

overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('mouseleave', (e) => {
    let row = e.target.dataset.row;
    let column = e.target.dataset.col;
    console.log('joo')
    unHoverShips(row, column);
  });
})
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0EsdUNBQXVDLElBQUksZUFBZSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBLHVDQUF1QyxJQUFJLGVBQWUsT0FBTztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBLHVDQUF1QyxJQUFJLGVBQWUsT0FBTztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0EseUNBQXlDLElBQUksZUFBZSxPQUFPO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ2plZScpXG5sZXQgY3VycmVudFNoaXBMZW5ndGg9NTtcbmxldCByb3RhdGU9ZmFsc2U7XG5jb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkMScpO1xuY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZDInKTtcbmNvbnN0IG92ZXJsYXlHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQtb3ZlcmxheScpO1xuXG5jb25zdCBnZW5lcmF0ZUNlbGxzID0gKGdyaWRFbGVtZW50KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1yb3cnLCBpKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJywgaik7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBncmlkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2VuZXJhdGVDZWxscyhncmlkMSk7XG4gIGdlbmVyYXRlQ2VsbHMoZ3JpZDIpO1xuICBnZW5lcmF0ZUNlbGxzKG92ZXJsYXlHcmlkKTtcblxuY29uc3QgaXNWYWxpZENvbHVtbj0oY29sdW1uKSA9PiB7XG4gICAgcmV0dXJuIGNvbHVtbiA+PSAwICYmIGNvbHVtbiA8PSA5O1xuICB9XG5cbmNvbnN0IGlzVmFsaWRSb3c9KHJvdykgPT4ge1xuICByZXR1cm4gcm93ID49IDAgJiYgcm93IDw9IDk7XG4gIH1cblxuY29uc3QgaG92ZXJTaGlwcyA9IChyb3csY29sdW1uKSA9PiB7XG4gIGlmICghcm90YXRlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlzVmFsaWRDb2x1bW4oY29sdW1uKSkge1xuICAgIG92ZXJsYXlHcmlkXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sdW1ufVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoJ2hvdmVyZWQnKTtcbiAgICAgICAgfVxuICAgIGNvbHVtbisrO1xuICB9XG59IGVsc2Uge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaXNWYWxpZFJvdyhyb3cpKSB7XG4gICAgb3ZlcmxheUdyaWRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x1bW59XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xuICAgICAgICB9XG4gICAgcm93Kys7XG4gIH1cbn0gIFxufVxuXG5jb25zdCB1bkhvdmVyU2hpcHMgPSAocm93LGNvbHVtbikgPT4ge1xuICBpZiAoIXJvdGF0ZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaXNWYWxpZENvbHVtbihjb2x1bW4pKSB7XG4gICAgb3ZlcmxheUdyaWRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x1bW59XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXJlZCcpO1xuICAgIH1cbiAgICBjb2x1bW4rKztcbiAgfX1cbiAgZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWYWxpZFJvdyhyb3cpKSB7XG4gICAgICBvdmVybGF5R3JpZFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sdW1ufVwiXWApXG4gICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXJlZCcpO1xuICAgICAgICAgIH1cbiAgICAgIHJvdysrO1xuICAgIH1cbiAgfSAgIFxufVxuXG5cbm92ZXJsYXlHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgIGxldCByb3cgPSBlLnRhcmdldC5kYXRhc2V0LnJvdztcbiAgICBsZXQgY29sdW1uID0gZS50YXJnZXQuZGF0YXNldC5jb2w7XG4gICAgY29uc29sZS5sb2coJ2plZScpXG4gICAgaG92ZXJTaGlwcyhyb3csIGNvbHVtbik7XG4gIH0pO1xufSlcblxub3ZlcmxheUdyaWQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgbGV0IHJvdyA9IGUudGFyZ2V0LmRhdGFzZXQucm93O1xuICAgIGxldCBjb2x1bW4gPSBlLnRhcmdldC5kYXRhc2V0LmNvbDtcbiAgICBjb25zb2xlLmxvZygnam9vJylcbiAgICB1bkhvdmVyU2hpcHMocm93LCBjb2x1bW4pO1xuICB9KTtcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9