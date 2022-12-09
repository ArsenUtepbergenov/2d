import { C2D } from '@/models/game'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'
import { loadPlayerSprites } from './sprites'

export default class Player extends SpriteEntity {
  public size = { w: 0, h: 0 }
  public bounds: BoundingBox
  private sprite: SpriteSheet | null = null

  constructor() {
    super()
    this.x = 32
    this.y = 64
    this.velocity = new Vector2(100, 0)
    this.bounds = this.getBounds()
  }

  public async load() {
    this.sprite = await loadPlayerSprites()
  }

  public draw(context: C2D): void {
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
