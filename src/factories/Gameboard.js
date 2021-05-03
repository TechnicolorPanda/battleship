import Ship from './Ship.js';

const Gameboard = () => {

  const testCoordinateValidity = (x, y) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    } else {
      return true;
    }
  }

  const areCoordinatesEqual = (shipCoordinates, newCoordinates) => {
    return (JSON.stringify(shipCoordinates) === JSON.stringify(newCoordinates));
  }

  const compareCoordinates= (newCoordinates, shipLocations) => {
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

  const checkOverlappingShips = (shipType, column, row, alignment, shipLocations) => {
    let shipCoordinates = placeShip(shipType, column, row, alignment);
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (compareCoordinates(shipCoordinates[i], shipLocations)) {return true};
    }
    return false;
  }

  const createBoard = () => {
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill('water'));
    return newBoard;
  }

  const createRow = (column, board) => {
    return board[column];
  }

  const shipHit = (column, row, shipLocations) => {
    let newCoordinates = [column, row];
    return compareCoordinates(newCoordinates, shipLocations);
  }

  const recordHit = (column, row, board, shipHit) => {
    let newBoard = createRow(column, board);
    let marker = shipHit ? 'hit': 'miss';
    newBoard.splice(row, 1, marker);
    return newBoard;
  }

  const recordShip = (column, row, board) => {
    let newBoard = createRow(column, board);
    let marker = 'ship';
    newBoard.splice(row, 1, marker);
    return newBoard;
  }

  const changeBoard = (row, column, board, shipHit) => {
    board.splice(column, 1, recordHit(column, row, board, shipHit));
    return board;
  }

  const changeShipBoard = (row, column, board) => {
    board.splice(column, 1, recordShip(column, row, board));
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
      let eachShip = shipCoordinates[i].ship[0].coordinates;
      for (let j = 0; j < eachShip.length; j++) {
        if (JSON.stringify(eachShip[j]) === JSON.stringify([column, row])) {
          return true;
        }
      }
    }
    return false;
  }

  const checkHitValidity = (row, column, board) => {
    if (board[row][column] === 'water' || board[row][column] === 'ship') {
      return true;
    } else {
      return false;
    };
  }

  const shipPlacement = (shipType, column, row, alignment, shipLocations) => {
    let placedShip = placeShip(shipType, column, row, alignment);
    const newShip = {
      ship: [
        {name: shipType, coordinates: placedShip}
      ]
    }
    shipLocations = shipLocations.concat(newShip);
    return shipLocations;
  }

  const allShipsSunk = (shipStatus) => {
    return (Ship().isSunk('carrier', shipStatus) && 
    Ship().isSunk('battleship', shipStatus) && 
    Ship().isSunk('destroyer', shipStatus) && 
    Ship().isSunk('submarine', shipStatus) && 
    Ship().isSunk ('patrol boat', shipStatus)
    ? true: false);
  }

  return {
    checkHitValidity, 
    checkOverlappingShips, 
    createBoard, 
    placeShip, 
    receiveAttack, 
    recordHit, 
    changeBoard, 
    allShipsSunk, 
    shipPlacement, 
    shipHit, 
    checkValidity,
    changeShipBoard,
  };
}

  export default Gameboard;