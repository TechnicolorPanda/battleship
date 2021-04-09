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
  expect(board.placeShip('carrier', 2, 4, 'horizontal')).toContainEqual([2, 7]);
  expect(board.placeShip('destroyer', 4, 6, 'vertical')).toContainEqual([6, 6]);
})

test('checks validity of ship coordinates', () => {
  expect(board.checkValidity('submarine', 9, 9, 'horizontal')).toBeFalsy();
  expect(board.checkValidity('battleship', 8, 1, 'vertical')).toBeFalsy();
  expect(board.checkValidity('patrol boat', 2, 3, 'vertical')).toBeTruthy();
})

test('attacks ship at coordinates', () => {
  expect (board.receiveAttack([[2, 3], [2, 4], [2, 5]], 2, 4)).toBeTruthy();
})

test('attack ship by coodinates', () => {
  expect (board.receiveAttack([[1, 2], [2, 2], [3, 2], [4, 2]], 6, 8)).toBeFalsy();
})

test('records hit location', () => {
  expect (board.changeBoard(6, 8)).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
  expect (board.changeBoard(6, 5)).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
  expect (board.changeBoard(2, 1)).toEqual([
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, true, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ]);
})

test('places ship position in array', () => {
  expect (board.shipPlacement('submarine', 0, 2, 'horizontal')).toEqual(
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]}]
  )
  expect (board.shipPlacement('patrol boat', 3, 4, 'horizontal')).toEqual(
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]},
    {'ship': [{'coordinates': [[3, 4], [3, 5]], 'name': 'patrol boat'}]}],
  )
})

test('records hits to ships', () => {
  expect (board.shipHit(0, 3)).toBe('submarine');
  expect (board.shipHit(3, 4)).toBe('patrol boat');
})

test('records when all ships not sunk', () => {
  expect (board.allShipsSunk()).toBeFalsy();
}) 

test ('ensure ships are not overlapping', () => {
  expect (board.checkOverlappingShips('battleship', 0, 2, 'vertical')).toBeTruthy();
  expect (board.checkOverlappingShips('carrier', 6, 4, 'horizontal')).toBeFalsy();
})

test ('makes sure hit occurs in new location', () => {
  expect (board.checkHitValidity(5, 6)).toBeTruthy();
  expect (board.checkHitValidity(1, 1)).toBeFalsy();
})

