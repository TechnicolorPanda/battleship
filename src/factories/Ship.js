
const shipType = {
  ship: [
    {name: 'carrier', hits: [0, 0, 0, 0, 0],},
    {name: 'battleship', hits: [0, 0, 0, 0],}, 
    {name: 'destroyer', hits: [0, 0, 0],},  
    {name: 'submarine', hits: [0, 0, 0],},    
    {name: 'patrol boat', hits: [0, 0],},
  ]
}

const shipLength = (newShip) => {
    let matchingShip = shipType.ship.find((element) => {
        return (element.name === newShip);
      })
    return matchingShip.hits.length;
}

// const sunk = (shipType) => {
//   for (let i = 0; i < shipType.length; i++) {
//     if (shipType[i] === 0) {
//       return false;
//     } else {
//       return true;
//     }
//   }
// }


export default shipLength;