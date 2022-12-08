import Vector2 from '../math/Vector2'
import BoundingBox from '../BoundingBox'
import PlayerTrait from '../traits/PlayerTrait'
import { Point } from '../math/Point'
import { ISize } from '@/models/types'
import { loadPlayerSprites } from './sprites'
import SpriteSheet from './SpriteSheet'
import Compositor from './Compositor'
import { createSpriteLayer } from './layers'

export default class Player {
  public size: ISize
  public position: Point
  public bounds: BoundingBox
  public velocity: Vector2
  private traits: Map<string, PlayerTrait> = new Map()
  private sprite: SpriteSheet | null = null
  private compositor: Compositor

  constructor(compositor: Compositor) {
    this.size = { w: 0, h: 0 }
    this.position = new Point(32, 64)
    this.velocity = new Vector2(0, 0)
    this.bounds = this.getBounds()
    this.compositor = compositor
  }

  public async load() {
    this.sprite = await loadPlayerSprites()
    this.compositor.layers.push(createSpriteLayer(this.sprite, this.position))
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.sprite?.draw(context, 'player', this.position.x, this.position.y)
  }

  private getBounds(): BoundingBox {
    const { w, h } = this.size
    return new BoundingBox(this.position, { w, h })
  }

  public update(): void {
    this.position.x += 2
    this.traits.forEach(t => t.update(this))
  }

  public addTrait(trait: PlayerTrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
    this[trait.name] = trait
  }

  public hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  [key: string]: any
}
