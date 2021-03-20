import { gameboard } from '../factories/gameboard.js';

test('creates empty gameboard', () => {
  expect (gameboard()).toStrictEqual([false, false, false, false, false, false, false, false, false, false]);
})