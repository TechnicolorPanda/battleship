import Ship from './Ship.js';

const Gameboard = () => {

  let board = [];
  let shipLocations = [];

  const findX = (rowLetter) => {
    let coordinateNumber = rowLetter.charCodeAt(0) - 65;
    if ( coordinateNumber <= 9 && coordinateNumber >= 0) {
      return coordinateNumber;
    } else {
      throw new Error ('off the board');;
    }
  }

  const findY = (columnNumber) => {
    if ( columnNumber <= 9 && columnNumber >= 0) {
      return columnNumber;
    } else {
      throw new Error ('off the board');
    }
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

  const horizontalShip = (shipType, row, column) => {
    let shipCoordinates = [];
    for (let i = 0; i < Ship().shipLength(shipType); i++) {
      shipCoordinates = shipCoordinates.concat([
        [findX(row),
         findY(column) + i
        ]
      ]);
    }
    return shipCoordinates;
  }

  const verticalShip = (shipType, row, column) => {
    let shipCoordinates = [];
    for (let i = 0; i < Ship().shipLength(shipType); i++) {
      shipCoordinates = shipCoordinates.concat([
        [findX(row) + i,
         findY(column)
        ]
      ]);
    }
    return shipCoordinates;
  }

  const placeShip = (shipType, row, column, alignment) => {
    if (alignment === 'horizontal') {
      return horizontalShip(shipType, row, column);
    } else {
      return verticalShip(shipType, row, column);
    }
  }

  const receiveAttack = (shipCoordinates, row, column) => {
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (JSON.stringify(shipCoordinates[i]) === JSON.stringify([findX(row), findY(column)])) {
        return true;
      }
    }
    return false;
  }

  const deductHitPoints = (shipCoordinates, row, column) => {
    if (receiveAttack(shipCoordinates, row, column)) {
      let remaining = Ship().isHit(shipType);
      return remaining;
    }
  }

  const recordHit = (row, column) => {
    let columnNumber = findY(column) - 1;
    let newBoard = createRow(findX(row), board);
    newBoard.splice(columnNumber, 1, true);
    return newBoard;
  }

  const shipPlacement = (shipType, row, column, alignment) => {
    let placedShip = placeShip(shipType, row, column, alignment);
    const newShip = {
      ship: [
        {name: shipType, coordinates: placedShip}
      ]
    }
    shipLocations = shipLocations.concat(newShip);
    return shipLocations;
  }

  const areCoordinatesEqual = (shipCoordinates, newCoordinates) => {
    return (JSON.stringify(shipCoordinates) === JSON.stringify(newCoordinates));
  }

  const shipHit = (row, column) => {
    let newCoordinates = [findX(row), findY(column)];
    for (let i = 0; i < shipLocations.length; i++) {
      let shipCoordinates = shipLocations[i].ship[0].coordinates;
      for (let j = 0; j < shipCoordinates.length; j++) {
        if (areCoordinatesEqual(shipCoordinates[j], newCoordinates)) {
          return shipLocations[i].ship[0].name;
        }
      }
    }
  }
  
  const allShipsSunk = () => {
    return (Ship('carrier').isSunk && 
    Ship('battleship').isSunk && 
    Ship('destroyer').isSunk && 
    Ship('submarine').isSunk && 
    Ship('patrol boat').inSunk 
    ? true: false);
  }

  return {createBoard, placeShip, receiveAttack, recordHit, changeBoard, allShipsSunk, shipPlacement, shipHit};
}

  export default Gameboard;