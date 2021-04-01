import Gameboard from '../factories/Gameboard.js';

const board = Gameboard();

test ('creates empty gameboard', () => {
  expect(board.createBoard()).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
})

test('places ship on coordinates', () => {
  expect(board.placeShip('carrier', 'C', 4)).toContainEqual([2, 7]);
})

test('attacks ship at coordinates', () => {
  expect (board.receiveAttack([[2, 3], [2, 4], [2, 5]], 'C', 4)).toBeTruthy();
})

test('attack ship by coodinates', () => {
  expect (board.receiveAttack([[1, 2], [2, 2], [3, 2], [4, 2]], 'G', 8)).toBeFalsy();
})

test('records hit location', () => {
  expect (board.changeBoard('G', 8)).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, true, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
  expect (board.changeBoard('G', 5)).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, true, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
  expect (board.changeBoard('C', 1)).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true, false, false, true, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
})

test('places ship position in array', () => {
  expect (board.shipPlacement('submarine', 'A', 2)).toEqual(
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]}]
  )
  expect (board.shipPlacement('patrol boat', 'D', 4)).toEqual(
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]},
    {'ship': [{'coordinates': [[3, 4], [3, 5]], 'name': 'patrol boat'}]}],
  )
})

test('records hits to ships', () => {
  expect (board.shipSunk('D', 4)).toBeFalsy();
  expect (board.shipSunk('D', 5)).toBeTruthy();
})

// test('records when ship sunk', () => {
//   expect (board.allShipsSunk()).toBeFalsy();
// }) 




