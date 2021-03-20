import { shipLength, isHit, isSunk } from '../factories/Ship.js';

test('ship with length of 5', () => {
    expect(shipLength('carrier')).toBe(5);
})

test('ship with length of 3', () => {
  expect(shipLength('destroyer')).toBe(3);
})

test('hits remaining on patrol boat that has been hit 1 time', () => {
  expect(isHit('patrol boat', 1)).toBe(1);
})

test('hits remaining on carrier that has been hit 2 times', () => {
  expect(isHit('carrier', 2)).toBe(3);
})

test('destroyer has not been sunk', () => {
  expect(isSunk('destroyer', 2)).toBe(false);
})

test('battleship has not been sunk', () => {
  expect(isSunk('battleship', 4)).toBe(true);
})

