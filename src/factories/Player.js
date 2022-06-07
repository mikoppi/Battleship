import {Gameboard} from "../factories/Gameboard.js"

export const Player = (name) => {
    let attackedCoords=[];
    let _name=name;

    const getName=() => {
        return _name;
      }
    
    const setName=(newName) => {
        _name = newName;
      }

    const attack = (row,column) => {
        return enemyBoard.receiveAttack(row,column);
    }

    const checkWin = () => {
        return enemyBoard.allShipsSunk();
    }
}