import Ship from './Ship.js';

const Gameboard = () => {

  let board = [];
  let shipLocations = [];

  const findX = (rowLetter) => {
    return rowLetter.charCodeAt(0) - 65;
  }

  const findY = (columnNumber) => {
    return columnNumber;
  }

  const createBoard = () => {
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill(false));
    return newBoard;
  }

  const createRow = (row, board) => {
    return board[row];
  }

  const changeBoard = (row, column) => {
    if (board.length === 0) {
      board = createBoard();
    }
    let rowNumber = findX(row);
    let newRow = recordHit(row, column, board);
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

  const recordHit = (row, column, board) => {
    let columnNumber = findY(column) - 1;
    let newBoard = createRow(findX(row), board);
    newBoard.splice(columnNumber, 1, true);
    return newBoard;
  }

  const shipPlacement = (shipType, row, column) => {
    let placedShip = placeShip(shipType, row, column);
    const newShip = {
      ship: [
        {name: shipType, coordinates: placedShip}
      ]
    }
    shipLocations = shipLocations.concat(newShip);
    return shipLocations;
  }

  const allShipsSunk = () => {
    let sunk = true;
    return sunk
  }

  return {createBoard, placeShip, receiveAttack, recordHit, changeBoard, allShipsSunk, shipPlacement};
}

  export default Gameboard;