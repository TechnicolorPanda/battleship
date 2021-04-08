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

  const testCoordinateValidity = (x, y) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    } else {
      return true;
    }
  }

  const compareCoordinates= (newCoordinates) => {
    for (let i = 0; i < shipLocations.length; i++) {
      let shipCoordinates = shipLocations[i].ship[0].coordinates;
      for (let j = 0; j < shipCoordinates.length; j++) {
        if (areCoordinatesEqual(shipCoordinates[j], newCoordinates)) {
          return shipLocations[i].ship[0].name;
        }
      }
    }
  }

  const checkValidity = (shipType, row, column, alignment) => {
    let shipCoordinates = placeShip(shipType, row, column, alignment);
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (testCoordinateValidity(shipCoordinates[i][0], shipCoordinates[i][1]) === false) {
        return false;
      };
    }
    return true;
  }

  const checkOverlappingShips = (shipType, row, column, alignment) => {
    let shipCoordinates = placeShip(shipType, row, column, alignment);
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (compareCoordinates(shipCoordinates[i])) {return true};
    }
    return false;
  }

  const createBoard = () => {
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill(false));
    return newBoard;
  }

  const createRow = (column, board) => {
    return board[column];
  }

  const changeBoard = (row, column) => {
    if (board.length === 0) {
      board = createBoard();
    }
    let newColumn = recordHit(column, row, board);
    board.splice(column, 1, newColumn);
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

  // const deductHitPoints = (shipCoordinates, row, column) => {
  //   if (receiveAttack(shipCoordinates, row, column)) {
  //     let remaining = Ship().isHit(shipType);
  //     return remaining;
  //   }
  // }

  const checkHitValidity = (row, column) => {
    return board[findX(row)][findY(column - 1)];
  }

  const recordHit = (column, row, board) => {
    let newBoard = createRow(column, board);
    newBoard.splice(row, 1, true);
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
    return compareCoordinates(newCoordinates);
  }
  
  const allShipsSunk = () => {
    return (Ship('carrier').isSunk && 
    Ship('battleship').isSunk && 
    Ship('destroyer').isSunk && 
    Ship('submarine').isSunk && 
    Ship('patrol boat').inSunk 
    ? true: false);
  }

  return {checkHitValidity, checkOverlappingShips, createBoard, placeShip, receiveAttack, recordHit, changeBoard, allShipsSunk, shipPlacement, shipHit, checkValidity};
}

  export default Gameboard;