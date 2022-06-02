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
  testGameboard.placeShip(0,0,5,'horizontal')
  expect(testGameboard.board[0][0].ship).not.toBeNull();
});

test('given coordinate contains ship vertically', () => {
  testGameboard.placeShip(0,0,5,'vertical')
  expect(testGameboard.board[4][0].ship).not.toBeNull();
});

test('hit a ship', () => {
  testGameboard.placeShip(0,0,5,'horizontal');
  testGameboard.receiveAttack(0,1);
  expect(testGameboard.board[0][0].ship.getHits()).toStrictEqual(['hit','hit',null,null,null])
});
