const Player = () => {

  const createUser = (userName, userBoard, userStatus) => ({ userName, userBoard, userStatus });
  
  const selectUser = (turn) => {
    if (turn % 2 === 0 ) {
    return createUser('human', 'playerBoard', 'playerShipStatus');
    } else {
    return createUser('computer', 'computerBoard', 'computerShipStatus');
    }
  }

  const randomCoordinate = () => {
    return Math.floor(Math.random() * 10);
  }
  
  const randomAlignment = () => {
    let randomNumber = Math.floor(Math.random() * 2);
    return (randomNumber === 0) ? 'horizontal': 'vertical';
  }

  const hitAgain = (row, column) => {
    let hitOptions = [[row, (column - 1)], [row, (column + 1)], [(row - 1), column], [(row + 1), column]];
    return hitOptions;
  }

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