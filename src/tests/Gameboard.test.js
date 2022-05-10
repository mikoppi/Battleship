import {Gameboard} from "../factories/Gameboard.js"
import { Ship } from "../factories/Ship";

test("creates a gameboard of 10x10", () => {
    let g = Gameboard();
    expect(g.board.length && g.board[0].length).toBe(10);
  });

  test("returns false if there's already a ship", () => {
    let g = Gameboard();
    g.placeShip(0, 0, 2);
    expect(g.placeShip(0, 1, 3)).toBe(false);
  });