import { SHIP_TYPES_LENGTHS} from '../helpers/helpers';

//Factory function that creates an object of every ship.
export const Ship = (type) => {
    const length=SHIP_TYPES_LENGTHS[type];
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