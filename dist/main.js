/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQSx1Q0FBdUMsSUFBSSxlQUFlLE9BQU87QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0EsdUNBQXVDLElBQUksZUFBZSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0EsdUNBQXVDLElBQUksZUFBZSxPQUFPO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQSx5Q0FBeUMsSUFBSSxlQUFlLE9BQU87QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYyxlQUFlLGlCQUFpQjtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKCdqZWUnKVxubGV0IGN1cnJlbnRTaGlwTGVuZ3RoPTU7XG5sZXQgcGxheWVyUm90YXRlPWZhbHNlO1xubGV0IGNvbXBSb3RhdGU9cGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuY29uc3QgZ3JpZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZDEnKTtcbmNvbnN0IGdyaWQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQyJyk7XG5jb25zdCBvdmVybGF5R3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkLW92ZXJsYXknKTtcblxuY29uc3QgZ2VuZXJhdGVDZWxscyA9IChncmlkRWxlbWVudCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JywgaSk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLWNvbCcsIGopO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbiAgICAgICAgZ3JpZEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbmdlbmVyYXRlQ2VsbHMoZ3JpZDEpO1xuZ2VuZXJhdGVDZWxscyhncmlkMik7XG5nZW5lcmF0ZUNlbGxzKG92ZXJsYXlHcmlkKTtcblxuXG5jb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAocm93LCBjb2wpID0+IHtcbiAgICByZXR1cm4gcm93ID49IDAgJiYgcm93IDw9IDkgJiYgY29sID49IDAgJiYgY29sIDw9IDk7XG4gIH1cblxuY29uc3QgaXNWYWxpZENvbHVtbj0oY29sdW1uKSA9PiB7XG4gICAgcmV0dXJuIGNvbHVtbiA+PSAwICYmIGNvbHVtbiA8PSA5O1xuICB9XG5cbmNvbnN0IGlzVmFsaWRSb3c9KHJvdykgPT4ge1xuICByZXR1cm4gcm93ID49IDAgJiYgcm93IDw9IDk7XG4gIH1cblxuY29uc3QgaG92ZXJTaGlwcyA9IChyb3csIGNvbHVtbikgPT4ge1xuICBpZiAoIXBsYXllclJvdGF0ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmFsaWRDb2x1bW4oY29sdW1uKSkge1xuICAgICAgICBvdmVybGF5R3JpZFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbHVtbn1cIl1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcbiAgICAgIH1cbiAgICAgIGNvbHVtbisrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZhbGlkUm93KHJvdykpIHtcbiAgICAgICAgb3ZlcmxheUdyaWRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x1bW59XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gICAgICB9XG4gICAgICByb3crKztcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVuSG92ZXJTaGlwcyA9IChyb3csY29sdW1uKSA9PiB7XG4gIGlmICghcGxheWVyUm90YXRlKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgIGlmIChpc1ZhbGlkQ29sdW1uKGNvbHVtbikpIHtcbiAgICBvdmVybGF5R3JpZFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbHVtbn1cIl1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcmVkJyk7XG4gICAgfVxuICAgIGNvbHVtbisrO1xuICB9fVxuICBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZhbGlkUm93KHJvdykpIHtcbiAgICAgIG92ZXJsYXlHcmlkXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x1bW59XCJdYClcbiAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcmVkJyk7XG4gICAgICAgICAgfVxuICAgICAgcm93Kys7XG4gICAgfVxuICB9ICAgXG59XG5cbmNvbnN0IGdldENlbGwgPSAocm93LCBjb2x1bW4sIGdyaWQpID0+IHtcbiAgY29uc3QgY2VsbCA9IGdyaWQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEtcm93PVwiJHtwYXJzZUludChyb3cpfVwiXVtkYXRhLWNvbD1cIiR7cGFyc2VJbnQoY29sdW1uKX1cIl1gXG4gICk7XG4gIHJldHVybiBjZWxsO1xufTtcblxuY29uc3Qgc2VsZWN0UG9zaXRpb24gPSAocm93LCBjb2x1bW4sIGdyaWQsIHJvdGF0ZSxsZW5ndGgpID0+IHtcbiAgaWYgKCFyb3RhdGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IGNvbHVtbiArIGk7XG4gICAgICBnZXRDZWxsKHJvdywgY3VycmVudENvbCwgZ3JpZCkuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudFJvdyA9IHJvdyArIGk7XG4gICAgICBnZXRDZWxsKGN1cnJlbnRSb3csIGNvbHVtbiwgZ3JpZCkuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgY2hlY2tQb3NpdGlvbiA9IChyb3csIGNvbCwgZ3JpZCwgcm90YXRlKSA9PiB7XG4gIGlmICghcm90YXRlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudENvbCA9IGNvbCArIGk7XG4gICAgICBpZiAoXG4gICAgICAgICFpc1ZhbGlkUG9zaXRpb24ocm93LCBjdXJyZW50Q29sKSB8fFxuICAgICAgICBnZXRDZWxsKHJvdywgY3VycmVudENvbCwgZ3JpZCkuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3cgKyBpO1xuICAgICAgaWYgKFxuICAgICAgICAhaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRSb3csIGNvbCkgfHxcbiAgICAgICAgZ2V0Q2VsbChjdXJyZW50Um93LCBjb2wsIGdyaWQpLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuY29uc3QgcGxhY2VTaGlwID0gKHJvdywgY29sLCBncmlkLCByb3RhdGUpID0+IHtcbiAgbGV0IHN0YXJ0Um93ID0gcGFyc2VJbnQocm93KTtcbiAgbGV0IHN0YXJ0Q29sID0gcGFyc2VJbnQoY29sKTtcblxuICBpZiAoY2hlY2tQb3NpdGlvbihzdGFydFJvdywgc3RhcnRDb2wsIGdyaWQsIHJvdGF0ZSkpIHtcbiAgICAvL3BsYXllckJvYXJkLnBsYWNlU2hpcChzdGFydFJvdywgc3RhcnRDb2wsIGN1cnJlbnRTaGlwTGVuZ3RoLCByb3RhdGUpO1xuXG4gICAgc2VsZWN0UG9zaXRpb24oc3RhcnRSb3csIHN0YXJ0Q29sLCBncmlkLCBwbGF5ZXJSb3RhdGUsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcbiAgICBzZWxlY3RQb3NpdGlvbihzdGFydFJvdywgc3RhcnRDb2wsIGdyaWQxLCBwbGF5ZXJSb3RhdGUsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcbiAgICAvL3NlbGVjdFBvc2l0aW9uKHN0YXJ0Um93LCBzdGFydENvbCwgZ3JpZDIsIGNvbXBSb3RhdGUpO1xuICAgIFxuXG4gICAgY3VycmVudFNoaXBMZW5ndGgtLTtcbiAgfVxufTtcblxuY29uc3QgZ2V0UmFuZG9tUm93ID0gKCkgPT4gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbmNvbnN0IGdldFJhbmRvbUNvbCA9ICgpID0+IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbmNvbnN0IHBsYWNlQ29tcFNoaXAgPSAoKSA9PiB7XG4gIGZvciAobGV0IGkgPSA1OyBpID4gMTsgaS0tKSB7XG4gICAgbGV0IHJvdz1nZXRSYW5kb21Sb3c7XG4gICAgbGV0IGNvbD1nZXRSYW5kb21Db2w7XG4gICAgd2hpbGUgKCFjaGVja1Bvc2l0aW9uKHJvdywgY29sLCBncmlkMiwgY29tcFJvdGF0ZSApKSB7XG4gICAgICByb3c9Z2V0UmFuZG9tUm93O1xuICAgICAgY29sPWdldFJhbmRvbUNvbDtcbiAgICB9XG4gIH1cbiAgc2VsZWN0UG9zaXRpb24ocm93LCBjb2wsIGdyaWQyLCBjb21wUm90YXRlLGkpXG59O1xuXG5cblxuXG5cblxuXG5vdmVybGF5R3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICBsZXQgcm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgbGV0IGNvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sO1xuICAgIGNvbnNvbGUubG9nKCdqZWUnKVxuICAgIGhvdmVyU2hpcHMocm93LCBjb2x1bW4pO1xuICB9KTtcbn0pXG5cbm92ZXJsYXlHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xuICAgIGxldCByb3cgPSBlLnRhcmdldC5kYXRhc2V0LnJvdztcbiAgICBsZXQgY29sdW1uID0gZS50YXJnZXQuZGF0YXNldC5jb2w7XG4gICAgY29uc29sZS5sb2coJ2pvbycpXG4gICAgdW5Ib3ZlclNoaXBzKHJvdywgY29sdW1uKTtcbiAgfSk7XG59KVxuXG5vdmVybGF5R3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICBsZXQgcm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgbGV0IGNvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sO1xuICAgIHBsYWNlU2hpcChyb3csY29sdW1uLCBvdmVybGF5R3JpZClcbiAgfSlcblxuICBwbGFjZUNvbXBTaGlwKCk7XG4gICAgXG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9