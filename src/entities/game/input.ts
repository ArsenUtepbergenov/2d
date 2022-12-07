import Player from './Player'
import KeyboardState from '../KeyboardState'

export function setupPlayerKeyboard(player: Player) {
  const input = new KeyboardState()

  input.addMapping(
    'ArrowLeft',
    keyState => (player.move.direction = keyState ? -1 : 0),
  )
  input.addMapping(
    'ArrowRight',
    keyState => (player.move.direction = keyState ? 1 : 0),
  )

  return input
}
