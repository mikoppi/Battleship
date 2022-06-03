import {Gameboard} from "../factories/Gameboard.js"
import { Ship } from "../factories/Ship";


const testGameboard=Gameboard();


test('gameboard setup', () => {
  expect(testGameboard.board[7][5].ship).toBe(null);
});

test('can place horizontally', () => {
  expect(testGameboard.validHorizontal(0, 4, 6)).toBe(true);
});

test('can place vertically', () => {
  expect(testGameboard.validVertical(4, 0, 6)).toBe(true);
});

test('given coordinate contains ship horizontally', () => {
  testGameboard.placeShip(1,1,5,'horizontal')
  expect(testGameboard.board[1][3].ship).not.toBeNull();
});

test('given coordinate contains ship vertically', () => {
  testGameboard.placeShip(2,0,5,'vertical')
  expect(testGameboard.board[4][0].ship).not.toBeNull();
});

test('place ship out of bounds', () => {
  expect(()=>{testGameboard.placeShip(9,6,5,'horizontal')}).toThrow("orientation must be 'horizontal' or 'vertical' and not out of bounds")
});

test('hit a ship', () => {
  testGameboard.placeShip(0,0,5,'horizontal');
  testGameboard.receiveAttack(0,1);
  testGameboard.receiveAttack(0,4);
  testGameboard.receiveAttack(0,5);
  expect(testGameboard.board[0][0].ship.getHits()).toStrictEqual([null,'hit',null,null,'hit'])
  expect(testGameboard.board[0][5]).toBe('miss');
});

test('are all ships sunk', () => {
  testGameboard.placeShip(8,9,1,'vertical')
  expect(testGameboard.allShipsSunk()).toBe(false)
});
