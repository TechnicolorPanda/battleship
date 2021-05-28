import React from "react";
import '../styles/gameboard.css';
import uniqid from 'uniqid';
/* eslint-disable react/prop-types */

const UserInterface = (props) => {
  const {
    playerText,
    computerText,
    changeAlignment,
    placeShips,
    shipsSunk,
    playerBoard,
    initiateAttack,
    computerSunk,
    computerBoard,
    placePlayerShips,
    resetGame,
  } = props;

  return (
    <div>
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

      <div>
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
    </div>
  )
}

export default UserInterface;