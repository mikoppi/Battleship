import {Gameboard} from "../factories/Gameboard.js"

export const Player = (enemyBoard) => {
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