
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

  const shipStatus = shipType;

  const shipLength = (newShip) => {
    let matchingShip = shipType.ship.find((element) => {
      return (element.name === newShip);
    })
    return matchingShip.length;
  };

  const isHit = (shipName) => {
    for (let i = 0; i < 5; i++) {
      if (shipStatus.ship[i].name === shipName) {
        shipStatus.ship[i].length--;
        return shipStatus.ship[i].length;
      }
    }
  }

  const isSunk = (shipName) => {
    for (let i = 0; i < 5; i++) {
      if (shipStatus.ship[i].name === shipName) {
        return (shipStatus.ship[i].length === 0) ? true: false;
      }
    }
  }

  return { shipLength, isHit, isSunk };

}

export default Ship;

