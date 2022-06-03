import {Gameboard} from "../factories/Gameboard.js"

export const Player = (enemyBoard) => {

    const attack = (row,column) => {
        return enemyBoard.receiveAttack(row,column);
    }

    const checkWin = () => {
        return enemyBoard.allShipsSunk();
    }
}