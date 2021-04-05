import Gameboard from './Gameboard.js';

const Player = () => {

    const randomRow = () => {
        let rowCoordinate = Math.floor(Math.random() * 10) + 65;
        return String.fromCharCode(rowCoordinate);
      }
  
      const randomColumn = () => {
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

    // TODO: ensure that boat is only placed on empty spaces

    const computerPlacesBoat = () => {
      placeCarrier(randomRow(), randomColumn(), randomAlignment());
    }

    const enterPlay = (row, column) => {
      Gameboard().recordHit(row, column);
      if (Gameboard().shipHit(row, column)) {
        Gameboard().deductHitPoints(row, column)
      }   
    }

    // TODO: ensure that computer play hits space marked false;

    const computerPlay = () => {
      enterPlay(randomRow(), randomColumn());
    }

    return { placeCarrier, enterPlay };
}

export default Player;