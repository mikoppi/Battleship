import { Ship } from "./Ship";
import { shipDetailsHelper} from '../helpers/helpers';



export const Gameboard=() => {
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
        
        const newShip = Ship(length)
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
            //board[row][column]='miss';
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
        }
        return true
    };

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