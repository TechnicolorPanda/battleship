const Player = () => {

  const createUser = (userName, userBoard, userStatus) => ({ userName, userBoard, userStatus });

  // alternates human and computer player
  
  const selectUser = (turn) => {
    if (turn % 2 === 0 ) {
    return createUser('human', 'playerBoard', 'playerShipStatus');
    } else {
    return createUser('computer', 'computerBoard', 'computerShipStatus');
    }
  }

  // finds a random coordinate on the board

  const randomCoordinate = () => {
    return Math.floor(Math.random() * 10);
  }

  // finds a random ship alignment
  
  const randomAlignment = () => {
    let randomNumber = Math.floor(Math.random() * 2);
    return (randomNumber === 0) ? 'horizontal': 'vertical';
  }

  // basic AI selects random square next to successful hit
  //TODO: continue to hit adjacent squares until ship is sunk

  const hitAgain = (row, column) => {
    let hitOptions = [[row, (column - 1)], [row, (column + 1)], [(row - 1), column], [(row + 1), column]];
    return hitOptions;
  }

  // select random target coordinate coordinate

  const selectTarget = (hitOptions) => {
    let selectRandomTarget = Math.floor(Math.random() * hitOptions.length);
    return hitOptions[selectRandomTarget];
  }

  return { 
    selectTarget,
    hitAgain,
    selectUser, 
    randomCoordinate, 
    randomAlignment 
  };
}

export default Player;