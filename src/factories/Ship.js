
const shipType = {
  ship: [
    {name: 'carrier', length: 5},
    {name: 'battleship', length: 4}, 
    {name: 'destroyer', length: 3},  
    {name: 'submarine', length: 3},    
    {name: 'patrol boat', length: 2},
  ]
}
export const shipLength = (newShip) => {
  let matchingShip = shipType.ship.find((element) => {
    return (element.name === newShip);
    })
  return matchingShip.length;
};

export const shipHits = (newShip, hits) => {
  return shipLength(newShip) - hits;
}

export const shipSunk = (newShip, hits) => {
  return (shipLength(newShip) === hits) ? true: false;
}

