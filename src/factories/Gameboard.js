import Ship from './Ship.js';

const Gameboard = () => {

  const findX = (rowLetter) => {
    return rowLetter.charCodeAt(0) - 65;
  }

  const findY = (columnNumber) => {
    return columnNumber;
  }

  const createBoard = (row) => {
    let newBoard = Array(10).fill(0).map(row => new Array(10).fill(false));
    return newBoard[row];
  }

  const placeShip = (shipType, row, column) => {
    let shipCoordinates = [];
    const newShip = Ship();
    let lengthOfShip = newShip.shipLength();
    for (let i = 0; i < lengthOfShip(shipType); i++) {
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
    let newBoard = createBoard(findX(row));
    newBoard.splice(columnNumber, 1, true);
    return newBoard;
  }
  return {createBoard, placeShip, receiveAttack, recordHit};
}

  export default Gameboard;