import {Gameboard} from "../factories/Gameboard.js"
import { Ship } from "../factories/Ship";

const testGameboard=Gameboard();

test('gameboard setup', () => {
  expect(testGameboard.board[7][5]).toBe(null);
});

test('can place horiz edge', () => {
  expect(testGameboard.validHorizontal(5, 5, 6)).toBe(true);
}); 