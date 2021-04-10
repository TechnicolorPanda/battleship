import Ship from './Ship.js';

const Gameboard = () => {

  let shipLocations = [];

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

  const checkValidity = (shipType, column, row, alignment) => {
    let shipCoordinates = placeShip(shipType, column, row, alignment);
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (testCoordinateValidity(shipCoordinates[i][0], shipCoordinates[i][1]) === false) {
        return false;
      };
    }
    return true;
  }

  const checkOverlappingShips = (shipType, column, row, alignment) => {
    let shipCoordinates = placeShip(shipType, column, row, alignment);
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

  const changeBoard = (row, column, board) => {
    if (board.length === 0) {
      board = createBoard();
    }
    let newColumn = recordHit(column, row, board);
    board.splice(column, 1, newColumn);
    localStorage.setItem('mySavedBoard', JSON.stringify(board));
    return board;
  }

  const horizontalShip = (shipType, column, row) => {
    let shipCoordinates = [];
    for (let i = 0; i < Ship().shipLength(shipType); i++) {
      shipCoordinates = shipCoordinates.concat([
        [column,
         row + i
        ]
      ]);
    }
    return shipCoordinates;
  }

  const verticalShip = (shipType, column, row) => {
    let shipCoordinates = [];
    for (let i = 0; i < Ship().shipLength(shipType); i++) {
      shipCoordinates = shipCoordinates.concat([
        [column + i,
         row
        ]
      ]);
    }
    return shipCoordinates;
  }

  const placeShip = (shipType, column, row, alignment) => {
    if (alignment === 'horizontal') {
      return horizontalShip(shipType, column, row);
    } else {
      return verticalShip(shipType, column, row);
    }
  }

  const receiveAttack = (shipCoordinates, column, row) => {
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (JSON.stringify(shipCoordinates[i]) === JSON.stringify([column, row])) {
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

  const checkHitValidity = (column, row, board) => {
    return board[column][row];
  }

  const recordHit = (column, row, board) => {
    let newBoard = createRow(column, board);
    newBoard.splice(row, 1, true);
    return newBoard;
  }

  const shipPlacement = (shipType, column, row, alignment) => {
    let placedShip = placeShip(shipType, column, row, alignment);
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

  const shipHit = (column, row) => {
    let newCoordinates = [column, row];
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