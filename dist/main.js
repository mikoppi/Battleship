/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/factories/Ship.js");
/* harmony import */ var _helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/helpers */ "./src/helpers/helpers.js");





const Gameboard=() => {
    //Creates a 10x10 board. [row=y][column=x]
    let board=[];
    let ships=[];
    const initBoard=(() => {
        for (let i=0;i<10;i++) {
            board[i]=[];
            for (let j=0;j<10;j++) {
                board[i].push({
                    ship: null,
                    part:null
                  });
            }
        }
    })();
    
    //checks if its possible to add ship horizontally
    const validHorizontal = (row, column, length) => {
        if (column+length>10) return false;

        for (let i = 0; i < length; i++) {
            if (board[row][column + i].ship!==null) {
              return false;
            }
        }
        return true;
    }   

        //checks if its possible to add ship vertically
    const validVertical = (row, column, length) => {
        if (row+length>10) return false;

        for (let i = 0; i < length; i++) {
            if (board[row+i][column].ship!==null) {
              return false;
            }
        }
        return true;
    }   
    //Places ships on the board to specific coordinates. Need to check if out of bounds!
    const placeShip=(row,column,length,direction) => {
        
        const newShip = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(length)
        ships.push(newShip);
        
        if (!direction&& validHorizontal(row,column,length)) {
            for (let i = column, j = 0; i < column + length; i++, j++) {
                board[row][i].ship = newShip;
                board[row][i].part = j;
            }
        } else if (direction&& validVertical(row,column,length)) {
            for (let i = row, j = 0; i < row + length; i++, j++)  {
                board[i][column].ship = newShip;
                board[i][column].part = j;
            }
        } else {
            throw new Error("Ship can not be placed");
        }
    }

    const receiveAttack = (row, column) => {
        if (board[row][column].ship === null) {
            board[row][column]='miss';
            return false
        }
        else {
            board[row][column].ship.hit([board[row][column].part]);
            return true;
    }}

    const allShipsSunk=() => {
        for (let i=0; i<ships.length; i++) {
            let shipHitArray=ships[i].getHits();
            for (let j = 0; j < shipHitArray.length; j++) {
                if (!shipHitArray[j]) return false;
            }   
        };
        return true
    }

    return {
        board,
        initBoard,
        validHorizontal,
        validVertical,
        placeShip,
        allShipsSunk,
        receiveAttack
    }
}

    //Function to receive attacks to given coordinates. 
    //Checks if it hit anything and also keeps track of misses. Displays the misses.

    //Determines whether all the ships are sunk or not.

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _factories_Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/Gameboard.js */ "./src/factories/Gameboard.js");


const Player = (enemyBoard) => {
    let attackedCoords=[];
   
    const attack = (row,column) => {
        return enemyBoard.receiveAttack(row,column);
    }

    const checkWin = () => {
        return enemyBoard.allShipsSunk();
    }

    return {
      attack,
      checkWin,
      attackedCoords
    }
}

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });


//Factory function that creates an object of every ship.
const Ship = (l) => {
    let length=l
    let direction="horizontal";

    //Ships direction can be changed.
    const changeDirection=(direction) => {
        direction==='horizontal' ? direction==='vertical' : direction==='horizontal';
    }
    const getDirection=() => direction;

    //where the ship gets hit. Each ship should have their own array of hits.
    //Length is the ship length.
    const hitArray=Array(length).fill(null);
    const hit=(i)=>(hitArray[i]='hit');
    const getHits=()=>hitArray;

    //Ship has sunk when the ships hitArray is full of 'hit' elements.
    const isSunk=()=>hitArray.every(element => element==='hit');

    return {
        length,
        changeDirection,
        getDirection,
        hit,
        getHits,
        isSunk
    }

} 

/***/ }),

/***/ "./src/helpers/helpers.js":
/*!********************************!*\
  !*** ./src/helpers/helpers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipDetailsHelper": () => (/* binding */ shipDetailsHelper)
/* harmony export */ });
const shipDetailsHelper={
    carrier:5,
    battleship:4,
    destroyer:3,
    submarine:3,
    patrol_boat:2
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/Player */ "./src/factories/Player.js");
/* harmony import */ var _factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Gameboard */ "./src/factories/Gameboard.js");




const playerBoard = (0,_factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const computerBoard = (0,_factories_Gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();

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

//const getRandomRow = () => parseInt(Math.random() * 10);
//const getRandomCol = () => parseInt(Math.random() * 10);

function placeCompShip() {
  for (let i = 5; i >= 1; i--) {
    let row = parseInt(Math.random() * 10);
    let col = parseInt(Math.random() * 10);
    let randomRotate = parseInt(Math.random() * 2) === 0 ? true : false;
    while (!checkPosition(row, col, grid2, randomRotate)) {
      row = parseInt(Math.random() * 10);
      col = parseInt(Math.random() * 10);
      randomRotate = parseInt(Math.random() * 2) === 0 ? true : false;
    }

    computerBoard.placeShip(row, col, i, randomRotate)
    selectPosition( row, col, grid2, randomRotate, i);
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

overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', (e)=> {
    let row = e.target.dataset.row;
    let column = e.target.dataset.col;
    placeShip(row,column, overlayGrid)
  })

});

placeCompShip();

const humanPlayer = (0,_factories_Player__WEBPACK_IMPORTED_MODULE_0__.Player)(computerBoard)

grid2.addEventListener('click', (e) => {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const cell = getCell(row, col, grid2);

  if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

  if (humanPlayer.attack(row, col)) {
    cell.classList.add('hit');
  } else {
    cell.classList.add('miss');
  }})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYyxlQUFlLGlCQUFpQjtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsQ0FBQzs7QUFFRDs7QUFFQSxvQkFBb0IseURBQU07O0FBRTFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVscGVycy9oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9TaGlwXCI7XG5pbXBvcnQgeyBzaGlwRGV0YWlsc0hlbHBlcn0gZnJvbSAnLi4vaGVscGVycy9oZWxwZXJzJztcblxuXG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQ9KCkgPT4ge1xuICAgIC8vQ3JlYXRlcyBhIDEweDEwIGJvYXJkLiBbcm93PXldW2NvbHVtbj14XVxuICAgIGxldCBib2FyZD1bXTtcbiAgICBsZXQgc2hpcHM9W107XG4gICAgY29uc3QgaW5pdEJvYXJkPSgoKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGk9MDtpPDEwO2krKykge1xuICAgICAgICAgICAgYm9hcmRbaV09W107XG4gICAgICAgICAgICBmb3IgKGxldCBqPTA7ajwxMDtqKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcGFydDpudWxsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKCk7XG4gICAgXG4gICAgLy9jaGVja3MgaWYgaXRzIHBvc3NpYmxlIHRvIGFkZCBzaGlwIGhvcml6b250YWxseVxuICAgIGNvbnN0IHZhbGlkSG9yaXpvbnRhbCA9IChyb3csIGNvbHVtbiwgbGVuZ3RoKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4rbGVuZ3RoPjEwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sdW1uICsgaV0uc2hpcCE9PW51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gICBcblxuICAgICAgICAvL2NoZWNrcyBpZiBpdHMgcG9zc2libGUgdG8gYWRkIHNoaXAgdmVydGljYWxseVxuICAgIGNvbnN0IHZhbGlkVmVydGljYWwgPSAocm93LCBjb2x1bW4sIGxlbmd0aCkgPT4ge1xuICAgICAgICBpZiAocm93K2xlbmd0aD4xMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZFtyb3craV1bY29sdW1uXS5zaGlwIT09bnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAgIFxuICAgIC8vUGxhY2VzIHNoaXBzIG9uIHRoZSBib2FyZCB0byBzcGVjaWZpYyBjb29yZGluYXRlcy4gTmVlZCB0byBjaGVjayBpZiBvdXQgb2YgYm91bmRzIVxuICAgIGNvbnN0IHBsYWNlU2hpcD0ocm93LGNvbHVtbixsZW5ndGgsZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXdTaGlwID0gU2hpcChsZW5ndGgpXG4gICAgICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWRpcmVjdGlvbiYmIHZhbGlkSG9yaXpvbnRhbChyb3csY29sdW1uLGxlbmd0aCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjb2x1bW4sIGogPSAwOyBpIDwgY29sdW1uICsgbGVuZ3RoOyBpKyssIGorKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW3Jvd11baV0uc2hpcCA9IG5ld1NoaXA7XG4gICAgICAgICAgICAgICAgYm9hcmRbcm93XVtpXS5wYXJ0ID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24mJiB2YWxpZFZlcnRpY2FsKHJvdyxjb2x1bW4sbGVuZ3RoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHJvdywgaiA9IDA7IGkgPCByb3cgKyBsZW5ndGg7IGkrKywgaisrKSAge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldW2NvbHVtbl0uc2hpcCA9IG5ld1NoaXA7XG4gICAgICAgICAgICAgICAgYm9hcmRbaV1bY29sdW1uXS5wYXJ0ID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgY2FuIG5vdCBiZSBwbGFjZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgICAgIGlmIChib2FyZFtyb3ddW2NvbHVtbl0uc2hpcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYm9hcmRbcm93XVtjb2x1bW5dPSdtaXNzJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYm9hcmRbcm93XVtjb2x1bW5dLnNoaXAuaGl0KFtib2FyZFtyb3ddW2NvbHVtbl0ucGFydF0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfX1cblxuICAgIGNvbnN0IGFsbFNoaXBzU3Vuaz0oKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNoaXBIaXRBcnJheT1zaGlwc1tpXS5nZXRIaXRzKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBIaXRBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICghc2hpcEhpdEFycmF5W2pdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYm9hcmQsXG4gICAgICAgIGluaXRCb2FyZCxcbiAgICAgICAgdmFsaWRIb3Jpem9udGFsLFxuICAgICAgICB2YWxpZFZlcnRpY2FsLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIGFsbFNoaXBzU3VuayxcbiAgICAgICAgcmVjZWl2ZUF0dGFja1xuICAgIH1cbn1cblxuICAgIC8vRnVuY3Rpb24gdG8gcmVjZWl2ZSBhdHRhY2tzIHRvIGdpdmVuIGNvb3JkaW5hdGVzLiBcbiAgICAvL0NoZWNrcyBpZiBpdCBoaXQgYW55dGhpbmcgYW5kIGFsc28ga2VlcHMgdHJhY2sgb2YgbWlzc2VzLiBEaXNwbGF5cyB0aGUgbWlzc2VzLlxuXG4gICAgLy9EZXRlcm1pbmVzIHdoZXRoZXIgYWxsIHRoZSBzaGlwcyBhcmUgc3VuayBvciBub3QuIiwiaW1wb3J0IHtHYW1lYm9hcmR9IGZyb20gXCIuLi9mYWN0b3JpZXMvR2FtZWJvYXJkLmpzXCJcblxuZXhwb3J0IGNvbnN0IFBsYXllciA9IChlbmVteUJvYXJkKSA9PiB7XG4gICAgbGV0IGF0dGFja2VkQ29vcmRzPVtdO1xuICAgXG4gICAgY29uc3QgYXR0YWNrID0gKHJvdyxjb2x1bW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csY29sdW1uKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja1dpbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGVuZW15Qm9hcmQuYWxsU2hpcHNTdW5rKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF0dGFjayxcbiAgICAgIGNoZWNrV2luLFxuICAgICAgYXR0YWNrZWRDb29yZHNcbiAgICB9XG59IiwiXG5cbi8vRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYW4gb2JqZWN0IG9mIGV2ZXJ5IHNoaXAuXG5leHBvcnQgY29uc3QgU2hpcCA9IChsKSA9PiB7XG4gICAgbGV0IGxlbmd0aD1sXG4gICAgbGV0IGRpcmVjdGlvbj1cImhvcml6b250YWxcIjtcblxuICAgIC8vU2hpcHMgZGlyZWN0aW9uIGNhbiBiZSBjaGFuZ2VkLlxuICAgIGNvbnN0IGNoYW5nZURpcmVjdGlvbj0oZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIGRpcmVjdGlvbj09PSdob3Jpem9udGFsJyA/IGRpcmVjdGlvbj09PSd2ZXJ0aWNhbCcgOiBkaXJlY3Rpb249PT0naG9yaXpvbnRhbCc7XG4gICAgfVxuICAgIGNvbnN0IGdldERpcmVjdGlvbj0oKSA9PiBkaXJlY3Rpb247XG5cbiAgICAvL3doZXJlIHRoZSBzaGlwIGdldHMgaGl0LiBFYWNoIHNoaXAgc2hvdWxkIGhhdmUgdGhlaXIgb3duIGFycmF5IG9mIGhpdHMuXG4gICAgLy9MZW5ndGggaXMgdGhlIHNoaXAgbGVuZ3RoLlxuICAgIGNvbnN0IGhpdEFycmF5PUFycmF5KGxlbmd0aCkuZmlsbChudWxsKTtcbiAgICBjb25zdCBoaXQ9KGkpPT4oaGl0QXJyYXlbaV09J2hpdCcpO1xuICAgIGNvbnN0IGdldEhpdHM9KCk9PmhpdEFycmF5O1xuXG4gICAgLy9TaGlwIGhhcyBzdW5rIHdoZW4gdGhlIHNoaXBzIGhpdEFycmF5IGlzIGZ1bGwgb2YgJ2hpdCcgZWxlbWVudHMuXG4gICAgY29uc3QgaXNTdW5rPSgpPT5oaXRBcnJheS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQ9PT0naGl0Jyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIGNoYW5nZURpcmVjdGlvbixcbiAgICAgICAgZ2V0RGlyZWN0aW9uLFxuICAgICAgICBoaXQsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGlzU3Vua1xuICAgIH1cblxufSAiLCJleHBvcnQgY29uc3Qgc2hpcERldGFpbHNIZWxwZXI9e1xuICAgIGNhcnJpZXI6NSxcbiAgICBiYXR0bGVzaGlwOjQsXG4gICAgZGVzdHJveWVyOjMsXG4gICAgc3VibWFyaW5lOjMsXG4gICAgcGF0cm9sX2JvYXQ6MlxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9mYWN0b3JpZXMvUGxheWVyXCJcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2ZhY3Rvcmllcy9HYW1lYm9hcmRcIlxuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG5sZXQgY3VycmVudFNoaXBMZW5ndGg9NTtcbmxldCBwbGF5ZXJSb3RhdGU9ZmFsc2U7XG5sZXQgY29tcFJvdGF0ZT1wYXJzZUludChNYXRoLnJhbmRvbSgpICogMikgPT09IDAgPyB0cnVlIDogZmFsc2U7XG5jb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkMScpO1xuY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZDInKTtcbmNvbnN0IG92ZXJsYXlHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQtb3ZlcmxheScpO1xuXG5jb25zdCBnZW5lcmF0ZUNlbGxzID0gKGdyaWRFbGVtZW50KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1yb3cnLCBpKTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJywgaik7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBncmlkRWxlbWVudC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuZ2VuZXJhdGVDZWxscyhncmlkMSk7XG5nZW5lcmF0ZUNlbGxzKGdyaWQyKTtcbmdlbmVyYXRlQ2VsbHMob3ZlcmxheUdyaWQpO1xuXG5cbmNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChyb3csIGNvbCkgPT4ge1xuICAgIHJldHVybiByb3cgPj0gMCAmJiByb3cgPD0gOSAmJiBjb2wgPj0gMCAmJiBjb2wgPD0gOTtcbiAgfVxuXG5jb25zdCBpc1ZhbGlkQ29sdW1uPShjb2x1bW4pID0+IHtcbiAgICByZXR1cm4gY29sdW1uID49IDAgJiYgY29sdW1uIDw9IDk7XG4gIH1cblxuY29uc3QgaXNWYWxpZFJvdz0ocm93KSA9PiB7XG4gIHJldHVybiByb3cgPj0gMCAmJiByb3cgPD0gOTtcbiAgfVxuXG5jb25zdCBob3ZlclNoaXBzID0gKHJvdywgY29sdW1uKSA9PiB7XG4gIGlmICghcGxheWVyUm90YXRlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWYWxpZENvbHVtbihjb2x1bW4pKSB7XG4gICAgICAgIG92ZXJsYXlHcmlkXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sdW1ufVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgICAgfVxuICAgICAgY29sdW1uKys7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmFsaWRSb3cocm93KSkge1xuICAgICAgICBvdmVybGF5R3JpZFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbHVtbn1cIl1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcbiAgICAgIH1cbiAgICAgIHJvdysrO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdW5Ib3ZlclNoaXBzID0gKHJvdyxjb2x1bW4pID0+IHtcbiAgaWYgKCFwbGF5ZXJSb3RhdGUpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGlzVmFsaWRDb2x1bW4oY29sdW1uKSkge1xuICAgIG92ZXJsYXlHcmlkXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sdW1ufVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyZWQnKTtcbiAgICB9XG4gICAgY29sdW1uKys7XG4gIH19XG4gIGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmFsaWRSb3cocm93KSkge1xuICAgICAgb3ZlcmxheUdyaWRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2w9XCIke2NvbHVtbn1cIl1gKVxuICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyZWQnKTtcbiAgICAgICAgICB9XG4gICAgICByb3crKztcbiAgICB9XG4gIH0gICBcbn1cblxuY29uc3QgZ2V0Q2VsbCA9IChyb3csIGNvbHVtbiwgZ3JpZCkgPT4ge1xuICBjb25zdCBjZWxsID0gZ3JpZC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS1yb3c9XCIke3BhcnNlSW50KHJvdyl9XCJdW2RhdGEtY29sPVwiJHtwYXJzZUludChjb2x1bW4pfVwiXWBcbiAgKTtcbiAgcmV0dXJuIGNlbGw7XG59O1xuXG5jb25zdCBzZWxlY3RQb3NpdGlvbiA9IChyb3csIGNvbHVtbiwgZ3JpZCwgcm90YXRlLGxlbmd0aCkgPT4ge1xuICBpZiAoIXJvdGF0ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gY29sdW1uICsgaTtcbiAgICAgIGdldENlbGwocm93LCBjdXJyZW50Q29sLCBncmlkKS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50Um93ID0gcm93ICsgaTtcbiAgICAgIGdldENlbGwoY3VycmVudFJvdywgY29sdW1uLCBncmlkKS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBjaGVja1Bvc2l0aW9uID0gKHJvdywgY29sLCBncmlkLCByb3RhdGUpID0+IHtcbiAgaWYgKCFyb3RhdGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50Q29sID0gY29sICsgaTtcbiAgICAgIGlmIChcbiAgICAgICAgIWlzVmFsaWRQb3NpdGlvbihyb3csIGN1cnJlbnRDb2wpIHx8XG4gICAgICAgIGdldENlbGwocm93LCBjdXJyZW50Q29sLCBncmlkKS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudFJvdyA9IHJvdyArIGk7XG4gICAgICBpZiAoXG4gICAgICAgICFpc1ZhbGlkUG9zaXRpb24oY3VycmVudFJvdywgY29sKSB8fFxuICAgICAgICBnZXRDZWxsKGN1cnJlbnRSb3csIGNvbCwgZ3JpZCkuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0ZWRcIilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5jb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2wsIGdyaWQsIHJvdGF0ZSkgPT4ge1xuICBsZXQgc3RhcnRSb3cgPSBwYXJzZUludChyb3cpO1xuICBsZXQgc3RhcnRDb2wgPSBwYXJzZUludChjb2wpO1xuXG4gIGlmIChjaGVja1Bvc2l0aW9uKHN0YXJ0Um93LCBzdGFydENvbCwgZ3JpZCwgcm90YXRlKSkge1xuICAgIC8vcGxheWVyQm9hcmQucGxhY2VTaGlwKHN0YXJ0Um93LCBzdGFydENvbCwgY3VycmVudFNoaXBMZW5ndGgsIHJvdGF0ZSk7XG5cbiAgICBzZWxlY3RQb3NpdGlvbihzdGFydFJvdywgc3RhcnRDb2wsIGdyaWQsIHBsYXllclJvdGF0ZSwgY3VycmVudFNoaXBMZW5ndGgpO1xuICAgIHNlbGVjdFBvc2l0aW9uKHN0YXJ0Um93LCBzdGFydENvbCwgZ3JpZDEsIHBsYXllclJvdGF0ZSwgY3VycmVudFNoaXBMZW5ndGgpO1xuICAgIC8vc2VsZWN0UG9zaXRpb24oc3RhcnRSb3csIHN0YXJ0Q29sLCBncmlkMiwgY29tcFJvdGF0ZSk7XG4gICAgXG5cbiAgICBjdXJyZW50U2hpcExlbmd0aC0tO1xuICB9XG59O1xuXG4vL2NvbnN0IGdldFJhbmRvbVJvdyA9ICgpID0+IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG4vL2NvbnN0IGdldFJhbmRvbUNvbCA9ICgpID0+IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbmZ1bmN0aW9uIHBsYWNlQ29tcFNoaXAoKSB7XG4gIGZvciAobGV0IGkgPSA1OyBpID49IDE7IGktLSkge1xuICAgIGxldCByb3cgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCBjb2wgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGxldCByYW5kb21Sb3RhdGUgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMikgPT09IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgd2hpbGUgKCFjaGVja1Bvc2l0aW9uKHJvdywgY29sLCBncmlkMiwgcmFuZG9tUm90YXRlKSkge1xuICAgICAgcm93ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICByYW5kb21Sb3RhdGUgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMikgPT09IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZVNoaXAocm93LCBjb2wsIGksIHJhbmRvbVJvdGF0ZSlcbiAgICBzZWxlY3RQb3NpdGlvbiggcm93LCBjb2wsIGdyaWQyLCByYW5kb21Sb3RhdGUsIGkpO1xuICB9XG59XG5cblxuXG5cblxuXG5vdmVybGF5R3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICBsZXQgcm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgbGV0IGNvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sO1xuICAgIGNvbnNvbGUubG9nKCdqZWUnKVxuICAgIGhvdmVyU2hpcHMocm93LCBjb2x1bW4pO1xuICB9KTtcbn0pXG5cbm92ZXJsYXlHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xuICAgIGxldCByb3cgPSBlLnRhcmdldC5kYXRhc2V0LnJvdztcbiAgICBsZXQgY29sdW1uID0gZS50YXJnZXQuZGF0YXNldC5jb2w7XG4gICAgY29uc29sZS5sb2coJ2pvbycpXG4gICAgdW5Ib3ZlclNoaXBzKHJvdywgY29sdW1uKTtcbiAgfSk7XG59KVxuXG5vdmVybGF5R3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICBsZXQgcm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgbGV0IGNvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sO1xuICAgIHBsYWNlU2hpcChyb3csY29sdW1uLCBvdmVybGF5R3JpZClcbiAgfSlcblxufSk7XG5cbnBsYWNlQ29tcFNoaXAoKTtcblxuY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZClcblxuZ3JpZDIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sKTtcbiAgY29uc3QgY2VsbCA9IGdldENlbGwocm93LCBjb2wsIGdyaWQyKTtcblxuICBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIHx8IGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpIHJldHVybjtcblxuICBpZiAoaHVtYW5QbGF5ZXIuYXR0YWNrKHJvdywgY29sKSkge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gIH19KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9