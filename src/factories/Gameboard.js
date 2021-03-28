import React, { useState, useEffect } from 'react';
import shipLength from './Ship.js';
import '../styles/gameboard.css';
import uniqid from 'uniqid';

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
    console.log(newRow);
  }

  const createGameboard = (shipType, row, column) => {
    placeShip(shipType, row, column);
    receiveAttack(shipCoordinates, row, column);
    recordHit(row, column);
  }

  const initiateAttack = (event, index) => {
    event.target.className = 'background-red'; 
    let coordinates = 'B2';
    // let coordinates = event.target.value;
    let row = coordinates.charAt(0);
    let column = coordinates.charAt(1);
    recordHit(row, column);
  }

  return (
    <div className={`game-board`}>
      <div>Battleship</div>
      <div>
        <table className = 'center'>
        {newBoard.slice(1, newBoard.length).map((column, index) => {
            return (
              <tbody key = {uniqid()}>
              <tr>
                <td 
                  key = {uniqid()}
                  className = {column[0] ? 'background-red': 'background-blue'}
                  value = {'A' + index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[1] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[2] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[3] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[4] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td                   
                  key = {uniqid()}
                  className = {column[5] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[6] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = 
                  {column[7] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[8] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
                <td 
                  key = {uniqid()}
                  className = {column[9] ? 'background-red': 'background-blue'}
                  value = {index}
                  onClick = {initiateAttack}
                ></td>
              </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  )
}

export default Gameboard;