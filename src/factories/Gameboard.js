import { Ship } from "./Ship";
import { shipDetailsHelper} from '../helpers/helpers';



export const Gameboard=() => {
    //Creates a 10x10 board. [row=y][column=x]
    let board=[];
    const initBoard=(() => {
        for (let i=0;i<10;i++) {
            board[i]=[];
            for (let j=0;j<10;j++) {
                board[i][j] = null;
            }
        }
    })();
    
    //checks if its possible to add ship horizontally
    const validHorizontal = (row, column, length) => {
        if (column+length>10) return false;

        for (let i = 0; i < length; i++) {
            if (board[row][column + i]!==null) {
              return false;
            }
        }
        return true;
    }   

        //checks if its possible to add ship vertically
    const validVertical = (row, column, length) => {
        if (row+length>10) return false;

        for (let i = 0; i < length; i++) {
            if (board[row+i][column]!==null) {
              return false;
            }
        }
        return true;
    }   
    //Places ships on the board to specific coordinates. Need to check if out of bounds!
    const placeShip=(row,column,shipName,direction) => {
        const shipLength = shipDetailsHelper[shipName];
        
        if (direction==="horizontal") {
            for (let i=0;i<shipLength;i++) {
                board[row][column+i]=Ship(shipLength);
            }
        } else if (direction==="vertical") {
            for (let i=0;i<shipLength;i++) {
                board[row+i][column]=Ship(shipLength)
            }
        } else {
            throw new Error("orientation must be 'horizontal' or 'vertical'");
        }

    }

    return {
        board,
        initBoard,
        validHorizontal,
        validVertical,
        placeShip,
    }
}

    //Function to receive attacks to given coordinates. 
    //Checks if it hit anything and also keeps track of misses. Displays the misses.

    //Determines whether all the ships are sunk or not.