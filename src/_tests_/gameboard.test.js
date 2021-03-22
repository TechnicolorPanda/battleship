import { createBoard, placeShip, receiveAttack } from '../factories/gameboard.js';

test('creates empty gameboard', () => {
  expect (createBoard()).toStrictEqual([false, false, false, false, false, false, false, false, false, false]);
})

test('places ship on coordinates', () => {
  expect (placeShip('carrier', 'C', 4)).toContainEqual([2, 7]);
})

test('attacks ship at coordinates', () => {
  expect (receiveAttack([[2, 3], [2, 4], [2, 5]], 'C', 4)).toBeTruthy();
})

test('attack ship by coodinates', () => {
  expect (receiveAttack([[1, 2], [2, 2], [3, 2], [4, 2]], 'G', 8)).toBeFalsy();
})