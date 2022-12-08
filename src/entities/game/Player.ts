import BoundingBox from '../BoundingBox'
import Compositor from './Compositor'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'
import { createSpriteLayer } from './layers'
import { loadPlayerSprites } from './sprites'

export default class Player extends SpriteEntity {
  public size = { w: 0, h: 0 }
  public bounds: BoundingBox
  private sprite: SpriteSheet | null = null
  private compositor: Compositor

  constructor(compositor: Compositor) {
    super()
    this.bounds = this.getBounds()
    this.compositor = compositor
  }

  public async load() {
    this.sprite = await loadPlayerSprites()
    this.compositor.layers.push(createSpriteLayer(this))
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.sprite?.draw(context, 'player', this.x, this.y)
  }

  private getBounds(): BoundingBox {
    const { w, h } = this.size
    return new BoundingBox({ x: this.x, y: this.y }, { w, h })
  }

  public update(dTime: number): void {
    super.update(dTime)
  }
}
