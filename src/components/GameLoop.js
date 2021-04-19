import React, { useEffect, useState } from 'react';
import Gameboard from '../factories/Gameboard.js'
import uniqid from 'uniqid';
import '../styles/gameboard.css';
import Ship from '../factories/Ship.js';
import Player from '../factories/Player.js';

const GameLoop = () => {
  const [computerBoard, setComputerBoard] = useState(
    JSON.parse(localStorage.getItem('savedComputerBoard')) || []);
  const [playerBoard, setPlayerBoard] = useState(
    JSON.parse(localStorage.getItem('savedPlayerBoard')) || []
  );
  const [shipLocations, setShipLocations] = useState(    
    [{'ship': [{'coordinates': [[0, 2], [0, 3], [0, 4]], 'name': 'submarine'}]},
    {'ship': [{'coordinates': [[3, 4], [3, 5]], 'name': 'patrol boat'}]},
    {'ship': [{'coordinates': [[3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], 'name': 'carrier'}]},
    {'ship': [{'coordinates': [[4, 8], [5, 8], [6, 8], [7, 8]], 'name': 'battleship'}]},
    {'ship': [{'coordinates': [[8, 2], [8, 3], [8, 4]], 'name': 'destroyer'}]},
    ]);
  const [turn, setTurn] = useState(0);
  const [text, setText] = useState('');
  const [shipStatus, setShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedShipStatus')) || []
  );

  useEffect(() => {
    setPlayerBoard(Gameboard().createBoard());
    setComputerBoard(Gameboard().createBoard());
    setShipStatus(Ship().shipDescriptions());
  }, [shipLocations])

  // TODO: place ships on board

  useEffect(() => {
    localStorage.setItem('savedPlayerBoard', JSON.stringify(playerBoard));
  }, [playerBoard])

  useEffect(() => {
    localStorage.setItem('savedComputerBoard', JSON.stringify(computerBoard));
  }, [computerBoard])

  useEffect(() => {
    localStorage.setItem('savedShipStatus', JSON.stringify(shipStatus));
  }, [shipStatus])

  // TODO: prevent duplicate attacks

  // TODO: determine when ship is sunk

  // TODO: declare a winner

  const initiateAttack = (event) => {
    event.preventDefault();
    let coordinates = event.target.getAttribute('value');
    let board = JSON.parse(localStorage.getItem('savedPlayerBoard'));
    const column = parseInt(coordinates.charAt(0));
    const row = parseInt(coordinates.charAt(1));
    let isHit = (Gameboard().receiveAttack(shipLocations, row, column));
    if (isHit) {
        const getShipHit = Gameboard().shipHit(row, column, shipLocations);
        setPlayerBoard(Gameboard().changeBoard(column, row, board, true));
        setText(' Your attack hit a ship!  ');
        const shipHit = Ship().isHit(getShipHit, shipStatus);
        setShipStatus(shipHit);
        if (Ship().isSunk(getShipHit, shipStatus)) {
          setText(getShipHit + ' is sunk!')};
      } else {
        setPlayerBoard (Gameboard().changeBoard(column, row, board, false));
        setText(' Your attack missed. ');
      }
    setTurn(turn => (turn + 1));
  }

  useEffect(() => {
    if (Player().selectUser(turn).userName === 'computer') {
      let column = Player().randomCoordinate();
      let row = Player().randomCoordinate();
      let board = JSON.parse(localStorage.getItem('savedComputerBoard'));
      setComputerBoard(Gameboard().changeBoard(column, row, board));
      let isHit = (Gameboard().receiveAttack(shipLocations, row, column));
      if (isHit) {
        const getShipHit = Gameboard().shipHit(row, column, shipLocations);
        setComputerBoard(Gameboard().changeBoard(column, row, board, true));
        setText(text + ' Your ship was hit! ')
        Ship().isHit(getShipHit);
      } else {
        setComputerBoard (Gameboard().changeBoard(column, row, board, false));
        setText(text + ' Computer attack missed. ');
      }
      setTurn(turn => turn + 1);
    };
  }, [turn])

  return (
    <div className={`game-board`}>
      <h1>Battleship</h1>

      <div className = 'dialogue'>
       {text}
      </div>

        <div className = 'player'>
          <h2>Player</h2>
          <table>
            {playerBoard.slice(0, 10).map((column, index) => {
              return (
                <tbody key = {uniqid()}>
                  <tr>
                    <td 
                      key = {uniqid()}
                      className = {column[0]}
                      value = {'0' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[1]}
                      value = {'1' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[2]}
                      value = {'2' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[3]}
                      value = {'3' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[4]}
                      value = {'4' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td                   
                      key = {uniqid()}
                      className = {column[5]}
                      value = {'5' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[6]}
                      value = {'6' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[7]}
                      value = {'7' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[8]}
                      value = {'8' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[9]}
                      value = {'9' + index}
                      onClick = {initiateAttack}
                    ></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
      </div>

      <div className = 'computer'>
        <h2>Computer</h2>
          <table>
            {computerBoard.slice(0, 10).map((column, index) => {
              return (
                <tbody key = {uniqid()}>
                  <tr>
                    <td 
                      key = {uniqid()}
                      className = {column[0]}
                      value = {'0' + (index)}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[1]}
                      value = {'1' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[2]}
                      value = {'2' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[3]}
                      value = {'3' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[4]}
                      value = {'4' + index}
                    ></td>
                    <td                   
                      key = {uniqid()}
                      className = {column[5]}
                      value = {'5' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[6]}
                      value = {'6' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[7]}
                      value = {'7' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[8]}
                      value = {'8' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[9]}
                      value = {'9' + index}
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

export default GameLoop;