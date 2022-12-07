import Entity from './physics/Entity'
import KeyboardState from './KeyboardState'

export function setupKeyboard(entity: Entity) {
  const input = new KeyboardState()

  input.addMapping(
    'ArrowLeft',
    keyState => (entity.move.direction = keyState ? -1 : 0),
  )
  input.addMapping(
    'ArrowRight',
    keyState => (entity.move.direction = keyState ? 1 : 0),
  )

  return input
}
