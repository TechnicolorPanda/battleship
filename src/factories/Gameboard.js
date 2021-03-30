import Ship from './Ship.js';

const Gameboard = () => {

  let board = [];

  const findX = (rowLetter) => {
    return rowLetter.charCodeAt(0) - 65;
  }

  const findY = (columnNumber) => {
    return columnNumber + 1;
  }

  const createBoard = () => {
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill(false));
    return newBoard;
  }

  const createRow = (row) => {
    const board = createBoard();
    return board[row];
  }

  const changeBoard = (row, column) => {
    if (board === []) {
      board = createBoard();
    } 
    let rowNumber = findX(row);
    let newRow = recordHit(row, column);
    board.splice(rowNumber, 1, newRow);
    return board;

  }

  const placeShip = (shipType, row, column) => {
    let shipCoordinates = [];
    const newShip = Ship();
    for (let i = 0; i < newShip.shipLength(shipType); i++) {
      shipCoordinates = shipCoordinates.concat([
        [findX(row),
         findY(column) + i
        ]
      ]);
    }
    return shipCoordinates; 
  }

  const receiveAttack = (shipCoordinates, row, column) => {
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (JSON.stringify(shipCoordinates[i]) === JSON.stringify([findX(row), findY(column)])) {
        return true;
      }
    }
    return false;
  }

  const recordHit = (row, column) => {
    let columnNumber = findY(column) - 1;
    let newBoard = createRow(findX(row));
    newBoard.splice(columnNumber, 1, true);
    return newBoard;
  }

  return {createRow, placeShip, receiveAttack, recordHit, changeBoard};
}

  export default Gameboard;