import KeyboardState from '../entities/KeyboardState'
import { Player } from './Player'

export function setupPlayerKeyboard(player: Player) {
  const input = new KeyboardState()

  input.addMapping('KeyA', keyState => (player.move.directionX += keyState ? -1 : 1))
  input.addMapping('KeyD', keyState => (player.move.directionX += keyState ? 1 : -1))
  input.addMapping('KeyW', keyState => (player.move.directionY += keyState ? -1 : 1))
  input.addMapping('KeyS', keyState => (player.move.directionY += keyState ? 1 : -1))
  input.addMapping('Space', keyState => (player.shot.fireball += keyState ? 1 : -1))

  return input
}
