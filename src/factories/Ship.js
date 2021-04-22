import Gameboard from "./Gameboard";

const Ship = () => {

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

  const shipLength = (newShip) => {
    let matchingShip = shipType.ship.find((element) => {
      return (element.name === newShip);
    })
    return matchingShip.length;
  };

  const isHit = (shipName, shipStatus) => {
    for (let i = 0; i < 5; i++) {
      if (shipStatus.ship[i].name === shipName) {
        let size = shipStatus.ship[i].length;
        size = size - 1;
        console.log(size);
        shipStatus.ship[i].length = size;
      }
    }
    console.log(shipStatus);
    return shipStatus;
  }

  const isSunk = (shipName, shipStatus) => {
    for (let i = 0; i < 5; i++) {
      if (shipStatus.ship[i].name === shipName) {
        return (shipStatus.ship[i].length === 0) ? true: false;
      }
    }
  }

  const attackResult = (getShipHit, shipStatus) => {
    const newShipStatus = isHit(getShipHit, shipStatus);
    if (isSunk(getShipHit, newShipStatus)) {
      if (Gameboard().allShipsSunk()) {
        return ('All ships have been sunk. You win!')
      } else {
        return (getShipHit + ' is sunk!');
      }
    } else {
      return (' Your attack hit a ship!  ');
    }
  }

  return { shipLength, isHit, isSunk, shipDescriptions, attackResult };

}

export default Ship;

