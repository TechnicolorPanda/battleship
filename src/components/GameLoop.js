import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';
import '../styles/gameboard.css';

const GameLoop = () => {
  const [newBoard, setNewBoard] = useState([]);

  useEffect(() => {
    setNewBoard(Array(10).fill(0).map(row => new Array(10).fill(false)));
  },[])

  const initiateAttack = () => {
    console.log('initiate attack');
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

export default GameLoop;