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
  const [playerShips, setPlayerShips] = useState([]);
  const [computerShipLocations, setComputerShipLocations] = useState([]);
  const [playerShipLocations, setPlayerShipLocations] = useState([]);
  const [turn, setTurn] = useState(0);
  const [text, setText] = useState('');
  const [playerShipStatus, setPlayerShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedPlayerShipStatus')) || []
  );
  const [computerShipStatus, setComputerShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedComputerShipStatus')) || []
  );
  const [placeShips, setPlaceShips] = useState(true);
  const [shipNumber, setShipNumber] = useState(0);

  useEffect(() => {
    setPlayerBoard(Gameboard().createBoard());
    setComputerBoard(Gameboard().createBoard());
    setPlayerShipStatus(Ship().shipDescriptions());
    setComputerShipStatus(Ship().shipDescriptions());
    placeComputerShips();
    setText('Click square to place carrier on the board.')
  }, [])

  useEffect(() => {
    localStorage.setItem('savedPlayerBoard', JSON.stringify(playerBoard));
  }, [playerBoard])

  useEffect(() => {
    localStorage.setItem('savedComputerBoard', JSON.stringify(computerBoard));
  }, [computerBoard])

  useEffect(() => {
    localStorage.setItem('savedPlayerShipStatus', JSON.stringify(playerShipStatus));
  }, [playerShipStatus])
 
  const placeComputerShips = () => {
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'];
    const column = parseInt(Player().randomCoordinate());
    const row = parseInt(Player().randomCoordinate());
    const alignment = 'horizontal';
    let newShipLocations = ([]);
    for (let i = 0; i < 5; i++) {
      let newShip = Gameboard().shipPlacement(shipTypes[i], column, row, alignment, newShipLocations);
      setComputerShipLocations(computerShipLocations => computerShipLocations.concat(newShip));
    }
  }

  // TODO: correct computer ship locations array

  console.log(computerShipLocations);

  const placePlayerShips = (event) => {
    event.preventDefault();
    let coordinates = event.target.getAttribute('value');
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'];
    const column = parseInt(coordinates.charAt(0));
    const row = parseInt(coordinates.charAt(1));
    const alignment = 'horizontal';
    const newShipLocations = ([]);
    const newShip = Gameboard().shipPlacement(shipTypes[shipNumber], column, row, alignment, newShipLocations);
    setPlayerShipLocations(playerShipLocations => playerShipLocations.concat(newShip));
    if (shipNumber < 4) {
      setText('Click square to place ' + shipTypes[shipNumber + 1] + ' on the board.')
      setShipNumber(shipNumber => shipNumber + 1);
    } else {
      setText('The battle begins! Attack your opponents board.')
      setPlaceShips(false);
    }
  }

  console.log(playerShipLocations);

  const attackResult = (getShipHit, playerShipStatus) => {
    const newShipStatus = Ship().isHit(getShipHit, playerShipStatus);
    setPlayerShipStatus(newShipStatus);
    if (Ship().isSunk(getShipHit, newShipStatus)) {
      if (Gameboard().allShipsSunk(newShipStatus)) {
        return ('All ships have been sunk. You win!')
      } else {
        return ('Computer\'s ' + getShipHit + ' is sunk!');
      }
    } else {
      return (' Your attack hit a ship!  ');
    }
  }

  const computerResult = (getShipHit, computerShipStatus) => {
    const newShipStatus = Ship().isHit(getShipHit, computerShipStatus);
    setComputerShipStatus(newShipStatus);
    if (Ship().isSunk(getShipHit, newShipStatus)) {
      if (Gameboard().allShipsSunk(newShipStatus)) {
        return ('All ships have been sunk. Computer wins!')
      } else {
        return ('Your ' + getShipHit + ' is sunk!');
      }
    } else {
      return (' Computer\'s attack hit a ship!  ');
    }
  }

  const initiateAttack = (event) => {
    event.preventDefault();
    let coordinates = event.target.getAttribute('value');
    let board = JSON.parse(localStorage.getItem('savedPlayerBoard'));
    const column = parseInt(coordinates.charAt(0));
    const row = parseInt(coordinates.charAt(1));
    if (Gameboard().checkHitValidity(row, column, board)) {
      let isShipHit = (Gameboard().receiveAttack(computerShipLocations, row, column));
      if (isShipHit) {
          const getShipHit = Gameboard().shipHit(row, column, computerShipLocations);
          setPlayerBoard(Gameboard().changeBoard(column, row, board, true));
          const displayResult = attackResult(getShipHit, playerShipStatus);
          setText(displayResult);
      } else {
        setPlayerBoard (Gameboard().changeBoard(column, row, board, false));
        setText(' Your attack missed. ');
      }
      setTurn(turn => (turn + 1));
    } else {
      setText('Coordinate has already been hit. Try again.')
    }
  }

  useEffect(() => {
    if (Player().selectUser(turn).userName === 'computer') {
      let column = Player().randomCoordinate();
      let row = Player().randomCoordinate();
      let board = JSON.parse(localStorage.getItem('savedComputerBoard'));
      if (Gameboard().checkHitValidity(row, column, board)) {
        setComputerBoard(Gameboard().changeBoard(column, row, board));
        let isHit = (Gameboard().receiveAttack(playerShipLocations, row, column));
        if (isHit) {
          const getShipHit = Gameboard().shipHit(row, column, playerShipLocations);
          setComputerBoard(Gameboard().changeBoard(column, row, board, true));
          const displayResult = computerResult(getShipHit, computerShipStatus);
          setText(displayResult);
        } else {
          setComputerBoard (Gameboard().changeBoard(column, row, board, false));
          setText(text + ' Computer attack missed. ');
        }
        setTurn(turn => turn + 1);
      } else {
        setTurn(turn => turn + 2);
      }
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
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[1]}
                      value = {'1' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[2]}
                      value = {'2' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[3]}
                      value = {'3' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[4]}
                      value = {'4' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td                   
                      key = {uniqid()}
                      className = {column[5]}
                      value = {'5' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[6]}
                      value = {'6' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[7]}
                      value = {'7' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[8]}
                      value = {'8' + index}
                      onClick = {placeShips ? placePlayerShips: null}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[9]}
                      value = {'9' + index}
                      onClick = {placeShips ? placePlayerShips: null}
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