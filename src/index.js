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