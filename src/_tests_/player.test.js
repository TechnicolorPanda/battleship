import Player from '../factories/Player.js';

const newPlayer = Player();

test('identifies coordinates to hit', () => {
  expect (newPlayer.hitAgain(6, 2)).toEqual(
    [[6, 1], [6, 3], [5, 2], [7, 2]]
  )
  expect (newPlayer.hitAgain(3, 4)).toEqual(
    [[3, 3], [3, 5], [2, 4], [4, 4]]
  )
})