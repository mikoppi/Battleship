import { Ship } from "./Ship";


export const Gameboard=() => {
    //Creates a 10x10 board. [row=y][column=x]
    let board=[];
    const initBoard=(() => {
        for (let i=0;i<10;i++) {
            board[i]=[];
            for (let j=0;j<10;j++) {
                board[i].push(false);
            }
        }
    })();
    
    //Places ships on the board to specific coordinates. Need to check if out of bounds!
    const placeShip=(row,column,length) => {
        let ship=Ship(length);
        //check if place already taken
        if (board[row][column]) return false;
        if (ship.getDirection==="horizontal") {
            for (let i=0;i<ship.length;i++) {
                board[row][column+i]=ship;
            }
        } else {
            for (let i=0;i<ship.length;i++) {
                board[row+i][column]=ship;
            }
        }
    }

    return {
        board,
        initBoard,
        placeShip
    }
}

    //Function to receive attacks to given coordinates. 
    //Checks if it hit anything and also keeps track of misses. Displays the misses.

    //Determines whether all the ships are sunk or not.