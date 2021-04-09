import React, { useEffect, useState } from 'react';
import Gameboard from '../factories/Gameboard.js'
import uniqid from 'uniqid';
import '../styles/gameboard.css';

const GameLoop = () => {
  const [newBoard, setNewBoard] = useState([]);
  const [computerBoard, setComputerBoard] = useState([]);

  // TODO: render gameboard from local storage

  useEffect(() => {
    Gameboard().testLocalStorage();
    setNewBoard(Gameboard().createBoard());
    setComputerBoard(Gameboard().createBoard());
  },[])

  // save board to local storage

  const initiateAttack = (event) => {
    let coordinates = event.target.getAttribute('value');
    let column = parseFloat(coordinates.charAt(1)) + parseFloat(1);
    let row = coordinates.charAt(0);
    setNewBoard (Gameboard().changeBoard(row, column));
  }

  return (
    <div className={`game-board`}>
      <h1>Battleship</h1>
        <div>
          <h2>Player</h2>
          <table className = 'player'>
            {newBoard.slice(1, newBoard.length).map((column, index) => {
              return (
                <tbody key = {uniqid()}>
                  <tr>
                    <td 
                      key = {uniqid()}
                      className = {column[0] ? 'background-red': 'background-blue'}
                      value = {'0' + (index)}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[1] ? 'background-red': 'background-blue'}
                      value = {'1' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[2] ? 'background-red': 'background-blue'}
                      value = {'2' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[3] ? 'background-red': 'background-blue'}
                      value = {'3' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[4] ? 'background-red': 'background-blue'}
                      value = {'4' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td                   
                      key = {uniqid()}
                      className = {column[5] ? 'background-red': 'background-blue'}
                      value = {'5' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[6] ? 'background-red': 'background-blue'}
                      value = {'6' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[7] ? 'background-red': 'background-blue'}
                      value = {'7' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[8] ? 'background-red': 'background-blue'}
                      value = {'8' + index}
                      onClick = {initiateAttack}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[9] ? 'background-red': 'background-blue'}
                      value = {'9' + index}
                      onClick = {initiateAttack}
                    ></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
      </div>
      <div>
        <h2>Computer</h2>
          <table className = 'computer'>
            {computerBoard.slice(1, computerBoard.length).map((column, index) => {
              return (
                <tbody key = {uniqid()}>
                  <tr>
                    <td 
                      key = {uniqid()}
                      className = {column[0] ? 'background-red': 'background-blue'}
                      value = {'0' + (index)}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[1] ? 'background-red': 'background-blue'}
                      value = {'1' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[2] ? 'background-red': 'background-blue'}
                      value = {'2' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[3] ? 'background-red': 'background-blue'}
                      value = {'3' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[4] ? 'background-red': 'background-blue'}
                      value = {'4' + index}
                    ></td>
                    <td                   
                      key = {uniqid()}
                      className = {column[5] ? 'background-red': 'background-blue'}
                      value = {'5' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[6] ? 'background-red': 'background-blue'}
                      value = {'6' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[7] ? 'background-red': 'background-blue'}
                      value = {'7' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[8] ? 'background-red': 'background-blue'}
                      value = {'8' + index}
                    ></td>
                    <td 
                      key = {uniqid()}
                      className = {column[9] ? 'background-red': 'background-blue'}
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