console.log('jee')
let currentShipLength=5;
let playerRotate=false;
let compRotate=parseInt(Math.random() * 2) === 0 ? true : false;
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


const isValidPosition = (row, col) => {
    return row >= 0 && row <= 9 && col >= 0 && col <= 9;
  }

const isValidColumn=(column) => {
    return column >= 0 && column <= 9;
  }

const isValidRow=(row) => {
  return row >= 0 && row <= 9;
  }

const hoverShips = (row, column) => {
  if (!playerRotate) {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidColumn(column)) {
        overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${column}"]`)
          .classList.add("hovered");
      }
      column++;
    }
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidRow(row)) {
        overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${column}"]`)
          .classList.add("hovered");
      }
      row++;
    }
  }
};

const unHoverShips = (row,column) => {
  if (!playerRotate) {
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

const getCell = (row, column, grid) => {
  const cell = grid.querySelector(
    `[data-row="${parseInt(row)}"][data-col="${parseInt(column)}"]`
  );
  return cell;
};

const selectPosition = (row, column, grid, rotate,length) => {
  if (!rotate) {
    for (let i = 0; i < length; i++) {
      let currentCol = column + i;
      getCell(row, currentCol, grid).classList.add("selected");
    }
  } else {
    for (let i = 0; i < length; i++) {
      let currentRow = row + i;
      getCell(currentRow, column, grid).classList.add("selected");
    }
  }
};

const checkPosition = (row, col, grid, rotate) => {
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      let currentCol = col + i;
      if (
        !isValidPosition(row, currentCol) ||
        getCell(row, currentCol, grid).classList.contains("selected")
      ) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      let currentRow = row + i;
      if (
        !isValidPosition(currentRow, col) ||
        getCell(currentRow, col, grid).classList.contains("selected")
      ) {
        return false;
      }
    }
    return true;
  }
};

const placeShip = (row, col, grid, rotate) => {
  let startRow = parseInt(row);
  let startCol = parseInt(col);

  if (checkPosition(startRow, startCol, grid, rotate)) {
    //playerBoard.placeShip(startRow, startCol, currentShipLength, rotate);

    selectPosition(startRow, startCol, grid, playerRotate, currentShipLength);
    selectPosition(startRow, startCol, grid1, playerRotate, currentShipLength);
    //selectPosition(startRow, startCol, grid2, compRotate);
    

    currentShipLength--;
  }
};

const getRandomRow = () => parseInt(Math.random() * 10);
const getRandomCol = () => parseInt(Math.random() * 10);

const placeCompShip = () => {
  for (let i = 5; i > 1; i--) {
    let row=getRandomRow;
    let col=getRandomCol;
    while (!checkPosition(row, col, grid2, compRotate )) {
      row=getRandomRow;
      col=getRandomCol;
    }
  }
  selectPosition(row, col, grid2, compRotate,i)
};







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

overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', (e)=> {
    let row = e.target.dataset.row;
    let column = e.target.dataset.col;
    placeShip(row,column, overlayGrid)
  })

  placeCompShip();
    
});

