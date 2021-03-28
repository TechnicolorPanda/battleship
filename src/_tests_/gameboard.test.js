import { createBoard, placeShip, receiveAttack, recordHit } from '../factories/Gameboard.js';

// const board = Gameboard();

test('creates empty gameboard', () => {
  expect (createBoard(0)).toStrictEqual([false, false, false, false, false, false, false, false, false, false]);
})

test('places ship on coordinates', () => {
  expect(placeShip('carrier', 'C', 4)).toContainEqual([2, 7]);
})

test('attacks ship at coordinates', () => {
  expect (receiveAttack([[2, 3], [2, 4], [2, 5]], 'C', 4)).toBeTruthy();
})

test('attack ship by coodinates', () => {
  expect (receiveAttack([[1, 2], [2, 2], [3, 2], [4, 2]], 'G', 8)).toBeFalsy();
})

test('records hit location', () => {
  expect (recordHit('G', 8)).toEqual([false, false, false, false, false, false, false, true, false, false]);
})

test('records next hit location', () => {
  expect (recordHit('B', 2)).toStrictEqual([false, true, false, false, false, false, false, false, false, false])
})

