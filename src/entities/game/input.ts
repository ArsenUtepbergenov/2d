import KeyboardState from '../KeyboardState'
import Player from './Player'

export function setupPlayerKeyboard(player: Player) {
  const input = new KeyboardState()

  input.addMapping(
    'KeyA',
    keyState => (player.move.directionX = keyState ? -1 : 0),
  )
  input.addMapping(
    'KeyD',
    keyState => (player.move.directionX = keyState ? 1 : 0),
  )
  input.addMapping(
    'KeyW',
    keyState => (player.move.directionY = keyState ? -1 : 0),
  )
  input.addMapping(
    'KeyS',
    keyState => (player.move.directionY = keyState ? 1 : 0),
  )

  return input
}
