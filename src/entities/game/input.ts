import KeyboardState from '../KeyboardState'
import Player from './Player'

export function setupPlayerKeyboard(player: Player) {
  const input = new KeyboardState()

  input.addMapping(
    'KeyA',
    keyState => (player.move.direction = keyState ? -1 : 0),
  )
  input.addMapping(
    'KeyD',
    keyState => (player.move.direction = keyState ? 1 : 0),
  )
  input.addMapping(
    'KeyW',
    keyState => (player.move.direction = keyState ? -2 : 0),
  )
  input.addMapping(
    'KeyS',
    keyState => (player.move.direction = keyState ? 2 : 0),
  )

  return input
}
