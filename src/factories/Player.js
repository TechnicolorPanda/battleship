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

  const placeCarrier = (row, column, alignment) => {
    return Gameboard().shipPlacement('carrier', row, column, alignment);
  }

  const placeBattleship = (row, column, alignment) => {
    return Gameboard().shipPlacement('battleship', row, column, alignment);
  }

  const placeDestroyer = (row, column, alignment) => {
      return Gameboard().shipPlacement('destroyer', row, column, alignment);
  }

  const placeSubmarine = (row, column, alignment) => {
      return Gameboard().shipPlacement('submarine', row, column, alignment);
  }

  const placePatrolBoat = (row, column, alignment) => {
    return Gameboard().shipPlacement('patrol boat', row, column, alignment);
  }

  // const computerPlacesBoat = () => {
  //   placeCarrier(randomRow(), randomColumn(), randomAlignment());
  // }

  const enterPlay = (row, column) => {
    Gameboard().recordHit(row, column);
    if (Gameboard().shipHit(row, column)) {
      Gameboard().deductHitPoints(row, column)
    }   
  }

  // const computerPlay = () => {
  //   console.log(randomRow(), randomColumn());
  //   return enterPlay(randomRow(), randomColumn());
  // }

  return { placeCarrier, enterPlay, selectUser, randomCoordinate };
}

export default Player;