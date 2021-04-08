import Player from '../factories/Player.js';

const newPlayer = Player();

test('places carrier in position', () => {
  expect (newPlayer.placeCarrier(6, 2, 'horizontal')).toEqual(
  [{'ship': [{'coordinates': [[6, 2], [6, 3], [6, 4], [6, 5], [6, 6]], 'name': 'carrier'}]}]
  )
})