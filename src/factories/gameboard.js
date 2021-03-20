export const gameboard = (letter) => {
  
  const createBoard = () => {
    let board = Array(10).fill(0).map(row => new Array(10).fill(false));
    return board[0];
  }
    
  return createBoard();

}

