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

    const position = (row, column) => {
      return {
        row: row,
        column: column,
      }
    }
   
    const attack = (row,column) => {
        return enemyBoard.receiveAttack(row,column);
    }

    const checkWin = () => {
        return enemyBoard.allShipsSunk();
    }

    const checkIfAttacked = (position) => {
      for (let i = 0; i < attackedCoords.length; i++) {
        if (attackedCoords[i].row === position.row && attackedCoords[i].col === position.col)
          return true;
      }
      return false;

    }

    const randomAttack= () => {
      if (attackedCoords.length === 100) return false;

      let randomRow = parseInt(Math.random() * 10);
      let randomCol = parseInt(Math.random() * 10);
      while (checkIfAttacked({ row: randomRow, col: randomCol })) {
        randomRow = parseInt(Math.random() * 10);
        randomCol = parseInt(Math.random() * 10);
      }

      attackedCoords.push({ row: randomRow, col: randomCol });

      return {
        check: enemyBoard.receiveAttack(randomRow, randomCol),
        r: randomRow,
        c: randomCol,
      };
    };

  

    return {
      attack,
      checkWin,
      attackedCoords,
      checkIfAttacked, 
      randomAttack
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
const rotateBtn = document.getElementById('rotate-btn');
const alertElement = document.getElementById('alert');
const alertResult = document.getElementById('alert-result');

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
  

    selectPosition(startRow, startCol, grid, playerRotate, currentShipLength);
    selectPosition(startRow, startCol, grid1, playerRotate, currentShipLength);
    playerBoard.placeShip(startRow, startCol, currentShipLength, rotate)
    
    

    currentShipLength--;
    if (currentShipLength===0) closeOverlay();
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


function closeOverlay() {
  overlay.classList.add('hidden');
}

function openResults(result) {
  alertElement.classList.remove('hidden');
  alertResult.textContent = 'You ' + result.toLowerCase() + '!';
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
const computerPlayer= (0,_factories_Player__WEBPACK_IMPORTED_MODULE_0__.Player)(playerBoard)

grid2.addEventListener('click', (e) => {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const cell = getCell(row, col, grid2);

  if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

  if (humanPlayer.attack(row, col)) {
    cell.classList.add('hit');
  } else {
    cell.classList.add('miss');
  }

  if(humanPlayer.checkWin) {
    openResults('WIN!')
  }

  const computerAttack = computerPlayer.randomAttack();
  if (computerAttack.check) {
    getCell(computerAttack.r, computerAttack.c, grid1).classList.add('hit');
  } else {
    getCell(computerAttack.r, computerAttack.c, grid1).classList.add(
      'miss'
    );
  }
})

rotateBtn.addEventListener('click', () => {
  playerRotate === false ? (playerRotate = true) : (playerRotate = false);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUc7O0FBRUgsQ0FBQzs7QUFFRDs7QUFFQSxvQkFBb0IseURBQU07QUFDMUIsc0JBQXNCLHlEQUFNOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWxwZXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL1NoaXBcIjtcbmltcG9ydCB7IHNoaXBEZXRhaWxzSGVscGVyfSBmcm9tICcuLi9oZWxwZXJzL2hlbHBlcnMnO1xuXG5cblxuZXhwb3J0IGNvbnN0IEdhbWVib2FyZD0oKSA9PiB7XG4gICAgLy9DcmVhdGVzIGEgMTB4MTAgYm9hcmQuIFtyb3c9eV1bY29sdW1uPXhdXG4gICAgbGV0IGJvYXJkPVtdO1xuICAgIGxldCBzaGlwcz1bXTtcbiAgICBjb25zdCBpbml0Qm9hcmQ9KCgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8MTA7aSsrKSB7XG4gICAgICAgICAgICBib2FyZFtpXT1bXTtcbiAgICAgICAgICAgIGZvciAobGV0IGo9MDtqPDEwO2orKykge1xuICAgICAgICAgICAgICAgIGJvYXJkW2ldLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzaGlwOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBwYXJ0Om51bGxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICBcbiAgICAvL2NoZWNrcyBpZiBpdHMgcG9zc2libGUgdG8gYWRkIHNoaXAgaG9yaXpvbnRhbGx5XG4gICAgY29uc3QgdmFsaWRIb3Jpem9udGFsID0gKHJvdywgY29sdW1uLCBsZW5ndGgpID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbitsZW5ndGg+MTApIHJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmRbcm93XVtjb2x1bW4gKyBpXS5zaGlwIT09bnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSAgIFxuXG4gICAgICAgIC8vY2hlY2tzIGlmIGl0cyBwb3NzaWJsZSB0byBhZGQgc2hpcCB2ZXJ0aWNhbGx5XG4gICAgY29uc3QgdmFsaWRWZXJ0aWNhbCA9IChyb3csIGNvbHVtbiwgbGVuZ3RoKSA9PiB7XG4gICAgICAgIGlmIChyb3crbGVuZ3RoPjEwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGJvYXJkW3JvdytpXVtjb2x1bW5dLnNoaXAhPT1udWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9ICAgXG4gICAgLy9QbGFjZXMgc2hpcHMgb24gdGhlIGJvYXJkIHRvIHNwZWNpZmljIGNvb3JkaW5hdGVzLiBOZWVkIHRvIGNoZWNrIGlmIG91dCBvZiBib3VuZHMhXG4gICAgY29uc3QgcGxhY2VTaGlwPShyb3csY29sdW1uLGxlbmd0aCxkaXJlY3Rpb24pID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aClcbiAgICAgICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghZGlyZWN0aW9uJiYgdmFsaWRIb3Jpem9udGFsKHJvdyxjb2x1bW4sbGVuZ3RoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNvbHVtbiwgaiA9IDA7IGkgPCBjb2x1bW4gKyBsZW5ndGg7IGkrKywgaisrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbcm93XVtpXS5zaGlwID0gbmV3U2hpcDtcbiAgICAgICAgICAgICAgICBib2FyZFtyb3ddW2ldLnBhcnQgPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiYmIHZhbGlkVmVydGljYWwocm93LGNvbHVtbixsZW5ndGgpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcm93LCBqID0gMDsgaSA8IHJvdyArIGxlbmd0aDsgaSsrLCBqKyspICB7XG4gICAgICAgICAgICAgICAgYm9hcmRbaV1bY29sdW1uXS5zaGlwID0gbmV3U2hpcDtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVtjb2x1bW5dLnBhcnQgPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCBjYW4gbm90IGJlIHBsYWNlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKGJvYXJkW3Jvd11bY29sdW1uXS5zaGlwID09PSBudWxsKSB7XG4gICAgICAgICAgICBib2FyZFtyb3ddW2NvbHVtbl09J21pc3MnO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBib2FyZFtyb3ddW2NvbHVtbl0uc2hpcC5oaXQoW2JvYXJkW3Jvd11bY29sdW1uXS5wYXJ0XSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9fVxuXG4gICAgY29uc3QgYWxsU2hpcHNTdW5rPSgpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2hpcEhpdEFycmF5PXNoaXBzW2ldLmdldEhpdHMoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcEhpdEFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwSGl0QXJyYXlbal0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBib2FyZCxcbiAgICAgICAgaW5pdEJvYXJkLFxuICAgICAgICB2YWxpZEhvcml6b250YWwsXG4gICAgICAgIHZhbGlkVmVydGljYWwsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgYWxsU2hpcHNTdW5rLFxuICAgICAgICByZWNlaXZlQXR0YWNrXG4gICAgfVxufVxuXG4gICAgLy9GdW5jdGlvbiB0byByZWNlaXZlIGF0dGFja3MgdG8gZ2l2ZW4gY29vcmRpbmF0ZXMuIFxuICAgIC8vQ2hlY2tzIGlmIGl0IGhpdCBhbnl0aGluZyBhbmQgYWxzbyBrZWVwcyB0cmFjayBvZiBtaXNzZXMuIERpc3BsYXlzIHRoZSBtaXNzZXMuXG5cbiAgICAvL0RldGVybWluZXMgd2hldGhlciBhbGwgdGhlIHNoaXBzIGFyZSBzdW5rIG9yIG5vdC4iLCJpbXBvcnQge0dhbWVib2FyZH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9HYW1lYm9hcmQuanNcIlxuXG5leHBvcnQgY29uc3QgUGxheWVyID0gKGVuZW15Qm9hcmQpID0+IHtcbiAgICBsZXQgYXR0YWNrZWRDb29yZHM9W107XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcm93OiByb3csXG4gICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgfVxuICAgIH1cbiAgIFxuICAgIGNvbnN0IGF0dGFjayA9IChyb3csY29sdW1uKSA9PiB7XG4gICAgICAgIHJldHVybiBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2socm93LGNvbHVtbik7XG4gICAgfVxuXG4gICAgY29uc3QgY2hlY2tXaW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbmVteUJvYXJkLmFsbFNoaXBzU3VuaygpO1xuICAgIH1cblxuICAgIGNvbnN0IGNoZWNrSWZBdHRhY2tlZCA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRhY2tlZENvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXR0YWNrZWRDb29yZHNbaV0ucm93ID09PSBwb3NpdGlvbi5yb3cgJiYgYXR0YWNrZWRDb29yZHNbaV0uY29sID09PSBwb3NpdGlvbi5jb2wpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBjb25zdCByYW5kb21BdHRhY2s9ICgpID0+IHtcbiAgICAgIGlmIChhdHRhY2tlZENvb3Jkcy5sZW5ndGggPT09IDEwMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICBsZXQgcmFuZG9tUm93ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCByYW5kb21Db2wgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgd2hpbGUgKGNoZWNrSWZBdHRhY2tlZCh7IHJvdzogcmFuZG9tUm93LCBjb2w6IHJhbmRvbUNvbCB9KSkge1xuICAgICAgICByYW5kb21Sb3cgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICByYW5kb21Db2wgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgfVxuXG4gICAgICBhdHRhY2tlZENvb3Jkcy5wdXNoKHsgcm93OiByYW5kb21Sb3csIGNvbDogcmFuZG9tQ29sIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGVjazogZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbVJvdywgcmFuZG9tQ29sKSxcbiAgICAgICAgcjogcmFuZG9tUm93LFxuICAgICAgICBjOiByYW5kb21Db2wsXG4gICAgICB9O1xuICAgIH07XG5cbiAgXG5cbiAgICByZXR1cm4ge1xuICAgICAgYXR0YWNrLFxuICAgICAgY2hlY2tXaW4sXG4gICAgICBhdHRhY2tlZENvb3JkcyxcbiAgICAgIGNoZWNrSWZBdHRhY2tlZCwgXG4gICAgICByYW5kb21BdHRhY2tcbiAgICB9XG59IiwiXG5cbi8vRmFjdG9yeSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYW4gb2JqZWN0IG9mIGV2ZXJ5IHNoaXAuXG5leHBvcnQgY29uc3QgU2hpcCA9IChsKSA9PiB7XG4gICAgbGV0IGxlbmd0aD1sXG4gICAgbGV0IGRpcmVjdGlvbj1cImhvcml6b250YWxcIjtcblxuICAgIC8vU2hpcHMgZGlyZWN0aW9uIGNhbiBiZSBjaGFuZ2VkLlxuICAgIGNvbnN0IGNoYW5nZURpcmVjdGlvbj0oZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIGRpcmVjdGlvbj09PSdob3Jpem9udGFsJyA/IGRpcmVjdGlvbj09PSd2ZXJ0aWNhbCcgOiBkaXJlY3Rpb249PT0naG9yaXpvbnRhbCc7XG4gICAgfVxuICAgIGNvbnN0IGdldERpcmVjdGlvbj0oKSA9PiBkaXJlY3Rpb247XG5cbiAgICAvL3doZXJlIHRoZSBzaGlwIGdldHMgaGl0LiBFYWNoIHNoaXAgc2hvdWxkIGhhdmUgdGhlaXIgb3duIGFycmF5IG9mIGhpdHMuXG4gICAgLy9MZW5ndGggaXMgdGhlIHNoaXAgbGVuZ3RoLlxuICAgIGNvbnN0IGhpdEFycmF5PUFycmF5KGxlbmd0aCkuZmlsbChudWxsKTtcbiAgICBjb25zdCBoaXQ9KGkpPT4oaGl0QXJyYXlbaV09J2hpdCcpO1xuICAgIGNvbnN0IGdldEhpdHM9KCk9PmhpdEFycmF5O1xuXG4gICAgLy9TaGlwIGhhcyBzdW5rIHdoZW4gdGhlIHNoaXBzIGhpdEFycmF5IGlzIGZ1bGwgb2YgJ2hpdCcgZWxlbWVudHMuXG4gICAgY29uc3QgaXNTdW5rPSgpPT5oaXRBcnJheS5ldmVyeShlbGVtZW50ID0+IGVsZW1lbnQ9PT0naGl0Jyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIGNoYW5nZURpcmVjdGlvbixcbiAgICAgICAgZ2V0RGlyZWN0aW9uLFxuICAgICAgICBoaXQsXG4gICAgICAgIGdldEhpdHMsXG4gICAgICAgIGlzU3Vua1xuICAgIH1cblxufSAiLCJleHBvcnQgY29uc3Qgc2hpcERldGFpbHNIZWxwZXI9e1xuICAgIGNhcnJpZXI6NSxcbiAgICBiYXR0bGVzaGlwOjQsXG4gICAgZGVzdHJveWVyOjMsXG4gICAgc3VibWFyaW5lOjMsXG4gICAgcGF0cm9sX2JvYXQ6MlxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9mYWN0b3JpZXMvUGxheWVyXCJcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2ZhY3Rvcmllcy9HYW1lYm9hcmRcIlxuXG5jb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG5sZXQgY3VycmVudFNoaXBMZW5ndGg9NTtcbmxldCBwbGF5ZXJSb3RhdGU9ZmFsc2U7XG5sZXQgY29tcFJvdGF0ZT1wYXJzZUludChNYXRoLnJhbmRvbSgpICogMikgPT09IDAgPyB0cnVlIDogZmFsc2U7XG5jb25zdCBncmlkMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkMScpO1xuY29uc3QgZ3JpZDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZDInKTtcbmNvbnN0IG92ZXJsYXlHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQtb3ZlcmxheScpO1xuY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdGF0ZS1idG4nKTtcbmNvbnN0IGFsZXJ0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGVydCcpO1xuY29uc3QgYWxlcnRSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxlcnQtcmVzdWx0Jyk7XG5cbmNvbnN0IGdlbmVyYXRlQ2VsbHMgPSAoZ3JpZEVsZW1lbnQpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXJvdycsIGkpO1xuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1jb2wnLCBqKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4gICAgICAgIGdyaWRFbGVtZW50LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5nZW5lcmF0ZUNlbGxzKGdyaWQxKTtcbmdlbmVyYXRlQ2VsbHMoZ3JpZDIpO1xuZ2VuZXJhdGVDZWxscyhvdmVybGF5R3JpZCk7XG5cblxuY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKHJvdywgY29sKSA9PiB7XG4gICAgcmV0dXJuIHJvdyA+PSAwICYmIHJvdyA8PSA5ICYmIGNvbCA+PSAwICYmIGNvbCA8PSA5O1xuICB9XG5cbmNvbnN0IGlzVmFsaWRDb2x1bW49KGNvbHVtbikgPT4ge1xuICAgIHJldHVybiBjb2x1bW4gPj0gMCAmJiBjb2x1bW4gPD0gOTtcbiAgfVxuXG5jb25zdCBpc1ZhbGlkUm93PShyb3cpID0+IHtcbiAgcmV0dXJuIHJvdyA+PSAwICYmIHJvdyA8PSA5O1xuICB9XG5cbmNvbnN0IGhvdmVyU2hpcHMgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgaWYgKCFwbGF5ZXJSb3RhdGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpc1ZhbGlkQ29sdW1uKGNvbHVtbikpIHtcbiAgICAgICAgb3ZlcmxheUdyaWRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x1bW59XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gICAgICB9XG4gICAgICBjb2x1bW4rKztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWYWxpZFJvdyhyb3cpKSB7XG4gICAgICAgIG92ZXJsYXlHcmlkXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sdW1ufVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICAgICAgfVxuICAgICAgcm93Kys7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1bkhvdmVyU2hpcHMgPSAocm93LGNvbHVtbikgPT4ge1xuICBpZiAoIXBsYXllclJvdGF0ZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaXNWYWxpZENvbHVtbihjb2x1bW4pKSB7XG4gICAgb3ZlcmxheUdyaWRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x1bW59XCJdYClcbiAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXJlZCcpO1xuICAgIH1cbiAgICBjb2x1bW4rKztcbiAgfX1cbiAgZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXNWYWxpZFJvdyhyb3cpKSB7XG4gICAgICBvdmVybGF5R3JpZFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbD1cIiR7Y29sdW1ufVwiXWApXG4gICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXJlZCcpO1xuICAgICAgICAgIH1cbiAgICAgIHJvdysrO1xuICAgIH1cbiAgfSAgIFxufVxuXG5jb25zdCBnZXRDZWxsID0gKHJvdywgY29sdW1uLCBncmlkKSA9PiB7XG4gIGNvbnN0IGNlbGwgPSBncmlkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXJvdz1cIiR7cGFyc2VJbnQocm93KX1cIl1bZGF0YS1jb2w9XCIke3BhcnNlSW50KGNvbHVtbil9XCJdYFxuICApO1xuICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IHNlbGVjdFBvc2l0aW9uID0gKHJvdywgY29sdW1uLCBncmlkLCByb3RhdGUsbGVuZ3RoKSA9PiB7XG4gIGlmICghcm90YXRlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBjb2x1bW4gKyBpO1xuICAgICAgZ2V0Q2VsbChyb3csIGN1cnJlbnRDb2wsIGdyaWQpLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3cgKyBpO1xuICAgICAgZ2V0Q2VsbChjdXJyZW50Um93LCBjb2x1bW4sIGdyaWQpLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGNoZWNrUG9zaXRpb24gPSAocm93LCBjb2wsIGdyaWQsIHJvdGF0ZSkgPT4ge1xuICBpZiAoIXJvdGF0ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGN1cnJlbnRDb2wgPSBjb2wgKyBpO1xuICAgICAgaWYgKFxuICAgICAgICAhaXNWYWxpZFBvc2l0aW9uKHJvdywgY3VycmVudENvbCkgfHxcbiAgICAgICAgZ2V0Q2VsbChyb3csIGN1cnJlbnRDb2wsIGdyaWQpLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjdXJyZW50Um93ID0gcm93ICsgaTtcbiAgICAgIGlmIChcbiAgICAgICAgIWlzVmFsaWRQb3NpdGlvbihjdXJyZW50Um93LCBjb2wpIHx8XG4gICAgICAgIGdldENlbGwoY3VycmVudFJvdywgY29sLCBncmlkKS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3RlZFwiKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbCwgZ3JpZCwgcm90YXRlKSA9PiB7XG4gIGxldCBzdGFydFJvdyA9IHBhcnNlSW50KHJvdyk7XG4gIGxldCBzdGFydENvbCA9IHBhcnNlSW50KGNvbCk7XG5cbiAgaWYgKGNoZWNrUG9zaXRpb24oc3RhcnRSb3csIHN0YXJ0Q29sLCBncmlkLCByb3RhdGUpKSB7XG4gIFxuXG4gICAgc2VsZWN0UG9zaXRpb24oc3RhcnRSb3csIHN0YXJ0Q29sLCBncmlkLCBwbGF5ZXJSb3RhdGUsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcbiAgICBzZWxlY3RQb3NpdGlvbihzdGFydFJvdywgc3RhcnRDb2wsIGdyaWQxLCBwbGF5ZXJSb3RhdGUsIGN1cnJlbnRTaGlwTGVuZ3RoKTtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoc3RhcnRSb3csIHN0YXJ0Q29sLCBjdXJyZW50U2hpcExlbmd0aCwgcm90YXRlKVxuICAgIFxuICAgIFxuXG4gICAgY3VycmVudFNoaXBMZW5ndGgtLTtcbiAgICBpZiAoY3VycmVudFNoaXBMZW5ndGg9PT0wKSBjbG9zZU92ZXJsYXkoKTtcbiAgfVxufTtcblxuLy9jb25zdCBnZXRSYW5kb21Sb3cgPSAoKSA9PiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuLy9jb25zdCBnZXRSYW5kb21Db2wgPSAoKSA9PiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuXG5mdW5jdGlvbiBwbGFjZUNvbXBTaGlwKCkge1xuICBmb3IgKGxldCBpID0gNTsgaSA+PSAxOyBpLS0pIHtcbiAgICBsZXQgcm93ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgY29sID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBsZXQgcmFuZG9tUm90YXRlID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHdoaWxlICghY2hlY2tQb3NpdGlvbihyb3csIGNvbCwgZ3JpZDIsIHJhbmRvbVJvdGF0ZSkpIHtcbiAgICAgIHJvdyA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb2wgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgcmFuZG9tUm90YXRlID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwKHJvdywgY29sLCBpLCByYW5kb21Sb3RhdGUpXG4gICAgc2VsZWN0UG9zaXRpb24oIHJvdywgY29sLCBncmlkMiwgcmFuZG9tUm90YXRlLCBpKTtcbiAgXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjbG9zZU92ZXJsYXkoKSB7XG4gIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIG9wZW5SZXN1bHRzKHJlc3VsdCkge1xuICBhbGVydEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIGFsZXJ0UmVzdWx0LnRleHRDb250ZW50ID0gJ1lvdSAnICsgcmVzdWx0LnRvTG93ZXJDYXNlKCkgKyAnISc7XG59XG5cblxuXG5vdmVybGF5R3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICBsZXQgcm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgbGV0IGNvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sO1xuICAgIGNvbnNvbGUubG9nKCdqZWUnKVxuICAgIGhvdmVyU2hpcHMocm93LCBjb2x1bW4pO1xuICB9KTtcbn0pXG5cbm92ZXJsYXlHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZSkgPT4ge1xuICAgIGxldCByb3cgPSBlLnRhcmdldC5kYXRhc2V0LnJvdztcbiAgICBsZXQgY29sdW1uID0gZS50YXJnZXQuZGF0YXNldC5jb2w7XG4gICAgY29uc29sZS5sb2coJ2pvbycpXG4gICAgdW5Ib3ZlclNoaXBzKHJvdywgY29sdW1uKTtcbiAgfSk7XG59KVxuXG5vdmVybGF5R3JpZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICBsZXQgcm93ID0gZS50YXJnZXQuZGF0YXNldC5yb3c7XG4gICAgbGV0IGNvbHVtbiA9IGUudGFyZ2V0LmRhdGFzZXQuY29sO1xuICAgIHBsYWNlU2hpcChyb3csY29sdW1uLCBvdmVybGF5R3JpZClcbiAgfSlcblxufSk7XG5cbnBsYWNlQ29tcFNoaXAoKTtcblxuY29uc3QgaHVtYW5QbGF5ZXIgPSBQbGF5ZXIoY29tcHV0ZXJCb2FyZClcbmNvbnN0IGNvbXB1dGVyUGxheWVyPSBQbGF5ZXIocGxheWVyQm9hcmQpXG5cbmdyaWQyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3cpO1xuICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbCk7XG4gIGNvbnN0IGNlbGwgPSBnZXRDZWxsKHJvdywgY29sLCBncmlkMik7XG5cbiAgaWYgKGNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSB8fCBjZWxsLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpKSByZXR1cm47XG5cbiAgaWYgKGh1bWFuUGxheWVyLmF0dGFjayhyb3csIGNvbCkpIHtcbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICB9IGVsc2Uge1xuICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICB9XG5cbiAgaWYoaHVtYW5QbGF5ZXIuY2hlY2tXaW4pIHtcbiAgICBvcGVuUmVzdWx0cygnV0lOIScpXG4gIH1cblxuICBjb25zdCBjb21wdXRlckF0dGFjayA9IGNvbXB1dGVyUGxheWVyLnJhbmRvbUF0dGFjaygpO1xuICBpZiAoY29tcHV0ZXJBdHRhY2suY2hlY2spIHtcbiAgICBnZXRDZWxsKGNvbXB1dGVyQXR0YWNrLnIsIGNvbXB1dGVyQXR0YWNrLmMsIGdyaWQxKS5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgfSBlbHNlIHtcbiAgICBnZXRDZWxsKGNvbXB1dGVyQXR0YWNrLnIsIGNvbXB1dGVyQXR0YWNrLmMsIGdyaWQxKS5jbGFzc0xpc3QuYWRkKFxuICAgICAgJ21pc3MnXG4gICAgKTtcbiAgfVxufSlcblxucm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwbGF5ZXJSb3RhdGUgPT09IGZhbHNlID8gKHBsYXllclJvdGF0ZSA9IHRydWUpIDogKHBsYXllclJvdGF0ZSA9IGZhbHNlKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9