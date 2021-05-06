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
    JSON.parse(localStorage.getItem('savedPlayerBoard')) || []);
  const [computerShipLocations, setComputerShipLocations] = useState([]);
  const [playerShipLocations, setPlayerShipLocations] = useState([]);
  const [turn, setTurn] = useState(0);
  const [playerText, setPlayerText] = useState('');
  const [computerText, setComputerText] = useState('');
  const [playerShipStatus, setPlayerShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedPlayerShipStatus')) || []
  );
  const [computerShipStatus, setComputerShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedComputerShipStatus')) || []
  );
  const [placeShips, setPlaceShips] = useState(true);
  const [shipNumber, setShipNumber] = useState(0);
  const [alignment, setAlignment] = useState('horizontal');
  const [shipsSunk, setShipsSunk] = useState('0');
  const [computerSunk, setComputerSunk] = useState('0');

  const startGame = () => {
    setPlayerBoard(Gameboard().createBoard());
    setComputerBoard(Gameboard().createBoard());
    setPlayerShipStatus(Ship().shipDescriptions());
    setComputerShipStatus(Ship().shipDescriptions());
    placeComputerShips();
    setPlayerText('Click square to place carrier on the board.')
  }

  useEffect(() => {
    startGame();
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

  useEffect(() => {
    localStorage.setItem('savedComputerShipStatus', JSON.stringify(computerShipStatus));
  }, [computerShipStatus])

  const changeAlignment = () => {
    setAlignment(Ship().changeAlignment(alignment));
  }

  const resetGame = (event) => {
    event.preventDefault();
    setComputerBoard([]);
    setComputerText('');
    setComputerShipLocations([]);
    setPlayerShipLocations([]);
    setTurn(0);
    setPlaceShips(true);
    setShipNumber(0);
    setAlignment('horizontal');
    setShipsSunk('0');
    setComputerSunk('0');
    startGame();
  }

  const placeShip = (newShip) => {
    const newShipLength = newShip[0].ship[0].coordinates.length;
    let board = JSON.parse(localStorage.getItem('savedComputerBoard'));
    for (let i = 0; i < newShipLength; i++) {
      let row  = newShip[0].ship[0].coordinates[i][0];
      let column = newShip[0].ship[0].coordinates[i][1];
      setComputerBoard(Gameboard().changeShipBoard(column, row, board));
    }
  }
 
  const placeComputerShips = () => {
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'];
    for (let i = 0; i < 5; i++) {
      const column = parseInt(Player().randomCoordinate());
      const row = parseInt(Player().randomCoordinate());
      const computerAlignment = Player().randomAlignment();
      const newShipLocations = ([]);
      if (!Gameboard().checkOverlappingShips(shipTypes[i], row, column, computerAlignment, computerShipLocations)
        && Gameboard().checkValidity(shipTypes[i], row, column, computerAlignment)
        ) {
          let newShip = Gameboard().shipPlacement(shipTypes[i], column, row, computerAlignment, newShipLocations);
          setComputerShipLocations(computerShipLocations => computerShipLocations.concat(newShip));
          console.log(newShip);
        } else {
          console.log(i);
          i--;
      }
    }
  }

  const placePlayerShips = (event) => {
    event.preventDefault();
    let coordinates = event.target.getAttribute('value');
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'];
    const column = parseInt(coordinates.charAt(0));
    const row = parseInt(coordinates.charAt(1));
    const newShipLocations = ([]);
    if (!Gameboard().checkOverlappingShips(shipTypes[shipNumber], row, column, alignment, playerShipLocations)
      && Gameboard().checkValidity(shipTypes[shipNumber], row, column, alignment)
      ) {
        const newShip = Gameboard().shipPlacement(shipTypes[shipNumber], row, column, alignment, newShipLocations);
        placeShip(newShip);
        setPlayerShipLocations(playerShipLocations => playerShipLocations.concat(newShip));
        if (shipNumber < 4) {
          setPlayerText('Click square to place ' + shipTypes[shipNumber + 1] + ' on the board.')
          setShipNumber(shipNumber => shipNumber + 1);
        } else {
          setPlayerText('The battle begins! Attack your opponents board.')
          setPlaceShips(false);
        }
    } else {
      setPlayerText('Ships may not overlap and must be on the board. Place ' + shipTypes[shipNumber + 1] + ' again.');
    }
  }

  const attackResult = (getShipHit, playerShipStatus) => {
    const newShipStatus = Ship().isHit(getShipHit, playerShipStatus);
    setPlayerShipStatus(newShipStatus);
    if (Ship().isSunk(getShipHit, newShipStatus)) {
      if (Gameboard().allShipsSunk(newShipStatus)) {
        setComputerText('');
        return('All ships have been sunk. You win!')
      } else {
        setShipsSunk(shipsSunk => parseInt(shipsSunk + 1));
        return('Computer\'s ' + getShipHit + ' is sunk!');
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
        setPlayerText('');
        return ('All ships have been sunk. Computer wins!')
      } else {
        setComputerSunk(computerSunk => parseInt(computerSunk + 1));
        return ('Your ' + getShipHit + ' is sunk!');
      }
    } else {
      return (' Computer\'s attack hit a ship!  ');
    }
  }

  // player's attack is recorded

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
          setPlayerText(displayResult);
      } else {
        setPlayerBoard (Gameboard().changeBoard(column, row, board, false));
        setPlayerText(' Your attack missed. ');
      }
      setTurn(turn => (turn + 1));
    } else {
      setPlayerText('Coordinate has already been hit. Try again.')
    }
  }

  // computer plays turn

  useEffect(() => {
    if (Player().selectUser(turn).userName === 'computer') {
      let column = Player().randomCoordinate();
      let row = Player().randomCoordinate();
      let board = JSON.parse(localStorage.getItem('savedComputerBoard'));

      // determines validity of coordinate to attack

      if (Gameboard().checkHitValidity(row, column, board)) {
        setComputerBoard(Gameboard().changeBoard(column, row, board));

        // determines if attack hits a ship

        let isHit = (Gameboard().receiveAttack(playerShipLocations, row, column));
        if (isHit) {
          setComputerBoard(Gameboard().changeBoard(column, row, board, true));
          const getShipHit = Gameboard().shipHit(row, column, playerShipLocations);
          setComputerText(computerResult(getShipHit, computerShipStatus));
        } else {
          setComputerBoard (Gameboard().changeBoard(column, row, board, false));
          setComputerText('Computer attack missed. ');
        }

        // allows player to play next turn or attempts to return a valid hit

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
        <ul>
          <li>{playerText}</li>
          <li>{computerText}</li>
            {placeShips ?
            <li><div className = 'toggle'>
              horizontal
              <label className = 'switch' id = 'toggle'>
                <input 
                  type = 'checkbox' 
                  id = 'check'
                  onClick = {changeAlignment}/>
                  <span className = 'slider round'></span>
              </label>
                vertical
            </div></li>
            : null
            }
        </ul>

      </div>
      {placeShips ? null:
        <div className = 'player'>
          <h2>Computer</h2>
          <table>
            {playerBoard.slice(0, 10).map((column, index) => {
              return (
                <tbody key = {uniqid()}>
                  <tr>
                    <td 
                      key = {uniqid()}
                      className = {column[0]}
                      value = {'0' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[1]}
                      value = {'1' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[2]}
                      value = {'2' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[3]}
                      value = {'3' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[4]}
                      value = {'4' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td                   
                      key = {uniqid()}
                      className = {column[5]}
                      value = {'5' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[6]}
                      value = {'6' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[7]}
                      value = {'7' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[8]}
                      value = {'8' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[9]}
                      value = {'9' + index}
                      onClick = {placeShips ? null: initiateAttack}
                    ></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
      </div>
    }

      <div className = 'computer'>
        <h2>Player</h2>
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

      <div>
            {placeShips ?
              null
              : <div className = 'score'><h3>Ships sunk</h3>
              <br></br>
              opponent: {shipsSunk} 
              <br></br>
              yours: {computerSunk} </div>
            }
      </div>
      <div>
        <button 
          className = 'reset'
          onClick = {resetGame}
        >
          Start New Game          
        </button>
      </div>
    </div>
  )
}

export default GameLoop;