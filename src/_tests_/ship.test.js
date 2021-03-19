import { shipLength, shipHits, shipSunk } from '../factories/Ship.js';

test('ship with length of 5', () => {
    expect(shipLength('carrier')).toBe(5);
})

test('ship with length of 3', () => {
  expect(shipLength('destroyer')).toBe(3);
})

test('hits remaining on patrol boat that has been hit 1 time', () => {
  expect(shipHits('patrol boat', 1)).toBe(1);
})

test('hits remaining on carrier that has been hit 2 times', () => {
  expect(shipHits('carrier', 2)).toBe(3);
})

test('destroyer has not been sunk', () => {
  expect(shipSunk('destroyer', 2)).toBe(false);
})

test('battleship has not been sunk', () => {
  expect(shipSunk('battleship', 4)).toBe(true);
})

