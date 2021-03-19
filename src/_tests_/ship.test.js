import shipLength from '../factories/Ship.js';

test('ship with length of 5', () => {
    expect(shipLength('carrier')).toBe(5);
})

test('ship with length of 3', () => {
  expect(shipLength('destroyer')).toBe(3);
})

// test('carrier has been hit in positions 3 and 4', () => {
//   expect(shipHits('carrier', 3, 4)).toBe(3, 4);
// })

// test('patrol boat has been hit in position 1', () => {
//   expect(shipHits('patrol boat', 1)).toBe(1);
// })

// test('destroyer has not been sunk', () => {
//   expect(shipSunk('destroyer', sunk)).toBe(false);
// })

// test('battleship has not been sunk', () => {
//   expect(shipSunk('battleship', sunk)).toBe(true);
// })

