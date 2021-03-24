import React, { useState, useEffect } from 'react';
import shipLength from './Ship.js';

const Gameboard = () => {
  const [shipCoordinates, setShipCoordinates] = useState('');
  const [newBoard, setNewBoard] = useState([]);

  const findX = (rowLetter) => {
    return rowLetter.charCodeAt(0) - 65;
  }

  const findY = (columnNumber) => {
    return columnNumber;
  }

  useEffect(() => {
    setNewBoard(Array(10).fill(0).map(row => new Array(10).fill(false)));
  },[])

  const placeShip = (shipType, row, column) => {
    for (let i = 0; i < shipLength(shipType); i++) {
      setShipCoordinates(shipCoordinates => (shipCoordinates.concat([
        [findX(row), findY(column) + i]
      ])));
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

  const createNewRow = (row) => {
    return (Array(10).fill(0).map(row => new Array(10).fill(false)));
  }

  const recordHit = (row, column) => {
    let columnNumber = findY(column) - 1;
    let newRow = createNewRow(findX(row));
    newRow.splice(columnNumber, 1, true);
    return newRow;
  }

  const createGameboard = (shipType, row, column) => {
    placeShip(shipType, row, column);
    receiveAttack(shipCoordinates, row, column);
    recordHit(row, column);
  }

  console.log(newBoard);

  return (
    <div className={`game-board`}>
      {createGameboard}
    </div>
  )
}

export default Gameboard;