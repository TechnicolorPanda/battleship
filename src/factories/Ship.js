// import Player from './Player.js';

const Ship = () => {

  // designates player ships

  const shipType = {
    ship: [
      {name: 'carrier', length: 5},
      {name: 'battleship', length: 4}, 
      {name: 'destroyer', length: 3},  
      {name: 'submarine', length: 3},    
      {name: 'patrol boat', length: 2},
    ]
  }

  const shipDescriptions = () => {
    return shipType;
  }

  // designates computer ships

  const computerTypes = {
    ship: [
      {name: 'carrier', length: 5},
      {name: 'battleship', length: 4}, 
      {name: 'destroyer', length: 3},  
      {name: 'submarine', length: 3},    
      {name: 'patrol boat', length: 2},
    ]
  }

  const computerShips = () => {
    return computerTypes;
  }

  // determines length of specific ship

  const shipLength = (newShip) => {
    let matchingShip = shipType.ship.find((element) => {
      return (element.name === newShip);
    })
    return matchingShip.length;
  };

  // determines whether ship is hit

  const isHit = (shipName, shipStatus) => {
    for (let i = 0; i < 5; i++) {
      if (shipStatus.ship[i].name === shipName) {
        shipStatus.ship[i].length--;
      }
    }
    return shipStatus;
  }

  // determine if all coordinates on ship are hit thus sinking the ship
 
  const isSunk = (shipName, shipStatus) => {
    for (let i = 0; i < 5; i++) {
      if (shipStatus.ship[i].name === shipName) {
        return (shipStatus.ship[i].length === 0) ? true: false;
      }
    }
  }

  // changes the alignment of ship between vertical and horizontal

  const changeAlignment = (alignment) => {
    if(alignment === 'horizontal') {
      return 'vertical';
    } else {
      return 'horizontal';
    }
  }

  return { shipLength, computerShips, isHit, isSunk, shipDescriptions, changeAlignment }
}

export default Ship;

