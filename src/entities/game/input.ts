import Player from './Player'
import KeyboardState from '../KeyboardState'

export function setupPlayerKeyboard(player: Player) {
  const input = new KeyboardState()

  input.addMapping(
    'ArrowLeft',
    keyState => (player.movePlayer.direction = keyState ? -1 : 0),
  )
  input.addMapping(
    'ArrowRight',
    keyState => (player.movePlayer.direction = keyState ? 1 : 0),
  )
  input.addMapping(
    'ArrowTop',
    keyState => (player.movePlayer.direction = keyState ? -2 : 0),
  )
  input.addMapping(
    'ArrowBottom',
    keyState => (player.movePlayer.direction = keyState ? 2 : 0),
  )

  return input
}
