import Gameboard from './Gameboard.js';

const Player = () => {

  const createUser = (userName, userBoard) => ({ userName, userBoard });
  
  const selectUser = (turn) => {
    if (turn % 2 === 0 ) {
    return createUser('human', 'playerBoard');
    } else {
    return createUser('computer', 'computerBoard');
    }
  }

  const randomCoordinate = () => {
    return Math.floor(Math.random() * 10);
  }
  
  const randomAlignment = () => {
    let randomNumber = Math.floor(Math.random() * 2);
    return (randomNumber === 0) ? 'horizontal': 'vertical';
  }

  const enterPlay = (row, column) => {
    Gameboard().recordHit(row, column);
    if (Gameboard().shipHit(row, column)) {
      Gameboard().deductHitPoints(row, column)
    }   
  }

  return { 
    enterPlay, 
    selectUser, 
    randomCoordinate, 
    randomAlignment 
  };
}

export default Player;