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
  expect(board.placeShip('carrier', 'C', 4, 'horizontal')).toContainEqual([2, 7]);
  expect(board.placeShip('destroyer', 'E', 6, 'vertical')).toContainEqual([6, 6]);
})

test('checks validity of ship coordinates', () => {
  expect(board.checkValidity('submarine', 'J', 9, 'horizontal')).toBeFalsy();
  expect(board.checkValidity('battleship', 'I', 1, 'vertical')).toBeFalsy();
  expect(board.checkValidity('patrol boat', 'C', 3, 'vertical')).toBeTruthy();
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
  expect (board.shipPlacement('submarine', 'A', 2, 'horizontal')).toEqual(
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]}]
  )
  expect (board.shipPlacement('patrol boat', 'D', 4, 'horizontal')).toEqual(
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]},
    {'ship': [{'coordinates': [[3, 4], [3, 5]], 'name': 'patrol boat'}]}],
  )
})

test('records hits to ships', () => {
  expect (board.shipHit('A', 3)).toBe('submarine');
  expect (board.shipHit('D', 4)).toBe('patrol boat');
})

test('records when all ships not sunk', () => {
  expect (board.allShipsSunk()).toBeFalsy();
}) 

test ('ensure ships are not overlapping', () => {
  expect (board.checkOverlappingShips('battleship', 'A', 2, 'vertical')).toBeTruthy();
  expect (board.checkOverlappingShips('carrier', 'G', 4, 'horizontal')).toBeFalsy();
})

