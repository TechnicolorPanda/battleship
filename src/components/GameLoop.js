import React, { useEffect, useState } from 'react';
import Gameboard from '../factories/Gameboard.js'
import uniqid from 'uniqid';
import '../styles/gameboard.css';
import Ship from '../factories/Ship.js';
import Player from '../factories/Player.js';

const GameLoop = () => {

  // sets React states

  const [computerBoard, setComputerBoard] = useState(
    JSON.parse(localStorage.getItem('savedComputerBoard')) || []);
  const [playerBoard, setPlayerBoard] = useState(
    JSON.parse(localStorage.getItem('savedPlayerBoard')) || []);
  const [playerShipStatus, setPlayerShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedPlayerShipStatus')) || []
  );
  const [computerShipStatus, setComputerShipStatus] = useState(
    JSON.parse(localStorage.getItem('savedComputerShipStatus')) || []
  );
  const [computerShipLocations, setComputerShipLocations] = useState([]);
  const [playerShipLocations, setPlayerShipLocations] = useState([]);
  const [turn, setTurn] = useState(0);
  const [playerText, setPlayerText] = useState('');
  const [computerText, setComputerText] = useState('');
  const [placeShips, setPlaceShips] = useState(true);
  const [shipNumber, setShipNumber] = useState(0);
  const [alignment, setAlignment] = useState('horizontal');
  const [shipsSunk, setShipsSunk] = useState('0');
  const [computerSunk, setComputerSunk] = useState('0');
  const [useAI, setUseAI] = useState(false);
  const [attackOptions, setAttackOptions] = useState([]);

  // defines destructuring assignment

  const board = Gameboard();
  const ships = Ship();
  const player = Player();

  // establishes starting states

  const startGame = () => {
    setPlayerBoard(board.createBoard());
    setComputerBoard(board.createBoard());
    setPlayerShipStatus(ships.shipDescriptions());
    setComputerShipStatus(ships.shipDescriptions());
    placeComputerShips();
    setPlayerText('Click square to place carrier on the board.')
  }

  useEffect(() => {
    startGame();
  }, [])

  // stores saved arrays in local storage

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

  // resets game upon pressing button

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

  //changes ship alignment

  const changeAlignment = () => {
    setAlignment(ships.changeAlignment(alignment));
  }

  // places computer ships on board
 
  const placeComputerShips = () => {
    let shipLocations = [];
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'];
    for (let i = 0; i < 5; i++) {
      const row = parseInt(player.randomCoordinate());
      const column = parseInt(player.randomCoordinate());
      const computerAlignment = player.randomAlignment();
      const newShipLocations = ([]);
      if (!board.checkOverlappingShips(shipTypes[i], row, column, computerAlignment, shipLocations)
        && board.checkValidity(shipTypes[i], row, column, computerAlignment)
        ) {
          let newShip = board.shipPlacement(shipTypes[i], row, column, computerAlignment, newShipLocations);
          shipLocations = shipLocations.concat(newShip);
        } else {
          i--;
        }
      setComputerShipLocations(shipLocations);
    }
  }

  // places player's ships on board

  const placeShip = (newShip) => {
    const newShipLength = newShip[0].ship[0].coordinates.length;
    const newBoard = JSON.parse(localStorage.getItem('savedComputerBoard'));
    for (let i = 0; i < newShipLength; i++) {
      const row  = newShip[0].ship[0].coordinates[i][0];
      const column = newShip[0].ship[0].coordinates[i][1];
      setComputerBoard(board.changeShipBoard(column, row, newBoard));
    }
  }

  const placePlayerShips = (event) => {
    event.preventDefault();
    const coordinates = event.target.getAttribute('value');
    const shipTypes = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol boat'];
    const column = parseInt(coordinates.charAt(0));
    const row = parseInt(coordinates.charAt(1));
    const newShipLocations = ([]);
    if (!board.checkOverlappingShips(shipTypes[shipNumber], row, column, alignment, playerShipLocations)
      && board.checkValidity(shipTypes[shipNumber], row, column, alignment)
      ) {
        const newShip = board.shipPlacement(shipTypes[shipNumber], row, column, alignment, newShipLocations);
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

  // player's attack is recorded

  const attackResult = (getShipHit, playerShipStatus) => {
    const newShipStatus = Ship().isHit(getShipHit, playerShipStatus);
    setPlayerShipStatus(newShipStatus);
    if (ships.isSunk(getShipHit, newShipStatus)) {
      if (board.allShipsSunk(shipsSunk)) {
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

  const initiateAttack = (event) => {
    event.preventDefault();
    let coordinates = event.target.getAttribute('value');
    let newBoard = JSON.parse(localStorage.getItem('savedPlayerBoard'));
    const column = parseInt(coordinates.charAt(0));
    const row = parseInt(coordinates.charAt(1));
    if (board.checkHitValidity(row, column, newBoard)) {
      let isShipHit = (board.receiveAttack(computerShipLocations, row, column));
      if (isShipHit) {
          const getShipHit = board.shipHit(row, column, computerShipLocations);
          setPlayerBoard(board.changeBoard(column, row, newBoard, true));
          const displayResult = attackResult(getShipHit, playerShipStatus);
          setPlayerText(displayResult);
      } else {
        setPlayerBoard (board.changeBoard(column, row, newBoard, false));
        setPlayerText(' Your attack missed. ');
      }
      setTurn(turn => (turn + 1));
    } else {
      setPlayerText('Coordinate has already been hit. Try again.')
    }
  }

  // computer's attack is recorded

  const computerResult = (getShipHit, computerShipStatus) => {
    const newShipStatus = ships.isHit(getShipHit, computerShipStatus);
    setComputerShipStatus(newShipStatus);
    if (ships.isSunk(getShipHit, newShipStatus)) {
      if (board.allShipsSunk(computerSunk)) {
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

  const computerPlay = (column, row) => {
    let newBoard = JSON.parse(localStorage.getItem('savedComputerBoard'));

      // determines validity of coordinate to attack

    if (board.checkHitValidity(row, column, newBoard)) {
      setComputerBoard(board.changeBoard(column, row, newBoard));

      // determines if attack hits a ship

      let isHit = (board.receiveAttack(playerShipLocations, row, column));
      if (isHit) {
        setComputerBoard(board.changeBoard(column, row, newBoard, true));
        const getShipHit = board.shipHit(row, column, playerShipLocations);
        setComputerText(computerResult(getShipHit, computerShipStatus));
        setAttackOptions(player.hitAgain(row, column));
        setUseAI(true);
      } else {
        setComputerBoard (board.changeBoard(column, row, newBoard, false));
        setComputerText('Computer attack missed. ');
      }

      // allows player to play next turn or attempts to return a valid hit

      setTurn(turn => turn + 1);
    } else {
      setTurn(turn => turn + 2);
    }
  }

  // computer plays turn

  useEffect(() => {
    if (Player().selectUser(turn).userName === 'computer') {
      if (useAI) {
        let coordinates = Player().selectTarget(attackOptions);
        let row = coordinates[0];
        let column = coordinates[1];
        computerPlay(column, row);
        setUseAI(false);
      } else {
        let column = Player().randomCoordinate();
        let row = Player().randomCoordinate();
        computerPlay(column, row);
      }
  }
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
          <h2>Opponent</h2>
          <h3>Sunk: {shipsSunk}/5</h3>
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
        <h3>sunk: {computerSunk}/5</h3>
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