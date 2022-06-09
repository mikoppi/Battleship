import {Gameboard} from "../factories/Gameboard.js"

export const Player = (enemyBoard) => {
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