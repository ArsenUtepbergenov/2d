import { Config } from '@/models/enums'
import { loadJSON } from '@/utils/loaders'
import Compositor from './Compositor'
import { createBackgroundLayer } from './layers'
import { loadBackgroundSprites } from './sprites'

export default class World {
  private compositor: Compositor

  constructor(compositor: Compositor) {
    this.compositor = compositor
  }

  public async load() {
    const [backgrounds, level] = await Promise.all([
      loadBackgroundSprites(),
      loadJSON(Config.WORLD),
    ])

    console.log('Level: ', level)

    this.compositor.layers.push(
      createBackgroundLayer(level.backgrounds, backgrounds),
    )
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.compositor.draw(context)
  }
}
