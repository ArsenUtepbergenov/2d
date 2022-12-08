import Compositor from './Compositor'
import { createBackgroundLayer } from './layers'
import { loadJSON } from '@/entities/game/loaders'
import { loadBackgroundSprites } from './sprites'
import { Config } from '@/models/enums'

export default class GameWorld {
  private compositor = new Compositor()

  constructor() {}

  public draw(context: CanvasRenderingContext2D): void {
    Promise.all([loadBackgroundSprites(), loadJSON(Config.WORLD)]).then(
      ([backgroundSprites, level]) => {
        console.log('Level loader: ', level)

        this.compositor.layers.push(
          createBackgroundLayer(level.backgrounds, backgroundSprites),
        )

        this.compositor.draw(context)
      },
    )
  }
}
