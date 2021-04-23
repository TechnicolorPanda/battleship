import Ship from '../factories/Ship.js';

const newShip = Ship();

test('ship with length of 5', () => {
    expect(newShip.shipLength('carrier')).toBe(5);
})

test('ship with length of 3', () => {
  expect(newShip.shipLength('destroyer')).toBe(3);
})

test.only('hits remaining on patrol boat that has been hit 1 time', () => {
  const shipStatus = {
    ship: [
      {name: 'carrier', length: 5},
      {name: 'battleship', length: 4}, 
      {name: 'destroyer', length: 3},  
      {name: 'submarine', length: 3},    
      {name: 'patrol boat', length: 2},
    ]
  }
  expect(newShip.isHit('patrol boat', shipStatus)).toBe(1);
  expect(newShip.isHit('patrol boat', shipStatus)).toBe(0);
  expect(newShip.isHit('carrier', shipStatus)).toBe(4);
})

test('destroyer has not been sunk', () => {
  expect(newShip.isSunk('carrier')).toBe(false);
})

test('battleship has not been sunk', () => {
  expect(newShip.isSunk('patrol boat')).toBe(true);
})

