import Ship from './Ship.js';

const Gameboard = () => {

  // determines if coordinate selected is on the gameboard

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

  // determine if coordinates are the same as a placed ship

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

  // determins whether a ship is placed on blank coordinates on the board

  const checkValidity = (shipType, column, row, alignment) => {
    let shipCoordinates = placeShip(shipType, column, row, alignment);
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (testCoordinateValidity(shipCoordinates[i][0], shipCoordinates[i][1]) === false) {
        return false;
      }
    }
    return true;
  }

  // determines if ship is being placed on top of existing ship

  const checkOverlappingShips = (shipType, column, row, alignment, shipLocations) => {
    let shipCoordinates = placeShip(shipType, column, row, alignment);
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (compareCoordinates(shipCoordinates[i], shipLocations)) {
        return true
      }
    }
    return false;
  }

  // create a blank board

  const createBoard = () => {
    // eslint-disable-next-line no-unused-vars
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill('water'));
    return newBoard;
  }

  // creates a new row

  const createRow = (column, board) => {
    return board[column];
  }

  // determines if a ship is hit

  const shipHit = (column, row, shipLocations) => {
    let newCoordinates = [column, row];
    return compareCoordinates(newCoordinates, shipLocations);
  }

  // records whether coordinate hits or misses opponents ship

  const recordHit = (column, row, board, shipHit) => {
    let newBoard = createRow(column, board);
    let marker = shipHit ? 'hit': 'miss';
    newBoard.splice(row, 1, marker);
    return newBoard;
  }

  // records placement of ship

  const recordShip = (column, row, board) => {
    let newBoard = createRow(column, board);
    let marker = 'ship';
    newBoard.splice(row, 1, marker);
    return newBoard;
  }

  // changes the board when hit occurs

  const changeBoard = (row, column, board, shipHit) => {
    board.splice(column, 1, recordHit(column, row, board, shipHit));
    return board;
  }

  // changes the board to reflect ship placement

  const changeShipBoard = (row, column, board) => {
    board.splice(column, 1, recordShip(column, row, board));
    return board;
  } 

  // places ship horizonally

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

  // places ship vertically

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

  // places ship on board

  const placeShip = (shipType, column, row, alignment) => {
    if (alignment === 'horizontal') {
      return horizontalShip(shipType, column, row);
    } else {
      return verticalShip(shipType, column, row);
    }
  }

  // receives an attack

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

  // determines if hit is valid

  const checkHitValidity = (row, column, board) => {
    if (board[row][column] === 'water' || board[row][column] === 'ship') {
      return true;
    } else {
      return false;
    }
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

  const allShipsSunk = (shipsSunk) => {
    console.log(shipsSunk);
    return (shipsSunk >= 5) ? true: false
  };
  
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