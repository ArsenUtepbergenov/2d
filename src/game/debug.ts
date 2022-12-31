import Vector2 from '../entities/math/Vector2'
import Camera from './Camera'
import SpriteEntity from './SpriteEntity'

export function setupMouseControl(
  canvas: HTMLCanvasElement,
  entity: SpriteEntity,
  camera: Camera,
) {
  let lastEvent: any
  ;['mousedown', 'mousemove'].forEach(eventName => {
    canvas.addEventListener(eventName, (event: any) => {
      if (event.buttons === 1) {
        entity.velocity = new Vector2(0, 0)
        entity.position.x = event.offsetX + camera.position.x
        entity.position.y = event.offsetY + camera.position.y
      } else if (
        event.buttons === 2 &&
        lastEvent?.buttons === 2 &&
        lastEvent?.type === 'mousemove'
      ) {
        camera.position.x -= event.offsetX - lastEvent.offsetX
      }
      lastEvent = event
    })
  })

  canvas.addEventListener('contextmenu', event => {
    event.preventDefault()
  })
}
