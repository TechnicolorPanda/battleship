import { createBoard, placeShip } from '../factories/gameboard.js';

test('creates empty gameboard', () => {
  expect (createBoard()).toStrictEqual([false, false, false, false, false, false, false, false, false, false]);
})

test('places ship on coordinates', () => {
  expect (placeShip('carrier', 'C', 4)).toContain(7);
})