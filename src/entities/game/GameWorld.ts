import Compositor from './Compositor'
import { Config } from '@/models/enums'
import { createBackgroundLayer } from './layers'
import { loadBackgroundSprites } from './sprites'
import { loadJSON } from '@/entities/game/loaders'

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
