import Ship from '../factories/Ship.js';

const newShip = Ship();

test('ship with length of 5', () => {
    expect(newShip.shipLength('carrier')).toBe(5);
})

test('ship with length of 3', () => {
  expect(newShip.shipLength('destroyer')).toBe(3);
})

test('hits remaining on patrol boat that has been hit 1 time', () => {
  expect(newShip.isHit('patrol boat')).toBe(1);
  expect(newShip.isHit('patrol boat')).toBe(0);
  expect(newShip.isHit('carrier')).toBe(4);
})

test('destroyer has not been sunk', () => {
  expect(newShip.isSunk('carrier')).toBe(false);
})

test('battleship has not been sunk', () => {
  expect(newShip.isSunk('patrol boat')).toBe(true);
})

