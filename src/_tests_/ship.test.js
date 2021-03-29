import Ship from '../factories/Ship.js';

const newShip = Ship();

test('ship with length of 5', () => {
    expect(newShip.shipLength('carrier')).toBe(5);
})

test('ship with length of 3', () => {
  expect(newShip.shipLength('destroyer')).toBe(3);
})

test('hits remaining on patrol boat that has been hit 1 time', () => {
  expect(newShip.isHit('patrol boat', 1)).toBe(1);
})

test('hits remaining on carrier that has been hit 2 times', () => {
  expect(newShip.isHit('carrier', 2)).toBe(3);
})

test('destroyer has not been sunk', () => {
  expect(newShip.isSunk('destroyer', 2)).toBe(false);
})

test('battleship has not been sunk', () => {
  expect(newShip.isSunk('battleship', 4)).toBe(true);
})

