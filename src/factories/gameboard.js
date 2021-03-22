import shipLength from './Ship.js';
 
  export const createBoard = () => {
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill(false));
    return newBoard[0];
  }

  export const placeShip = (shipType, row, column) => {
    let shipCoordinates = [];
    for (let i = 0; i < shipLength(shipType); i++) {
      shipCoordinates = shipCoordinates.concat([(row.charCodeAt(0) - 65), (column - 1 + i)]);
    }
    return shipCoordinates; 
  }

   

