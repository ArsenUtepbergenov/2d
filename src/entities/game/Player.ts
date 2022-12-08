import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import PlayerTrait from '../traits/PlayerTrait'
import Compositor from './Compositor'
import SpriteSheet from './SpriteSheet'
import { createSpriteLayer } from './layers'
import { loadPlayerSprites } from './sprites'

export default class Player {
  public x = 32
  public y = 64
  public size = { w: 0, h: 0 }
  public bounds: BoundingBox
  public velocity: Vector2
  private traits: Map<string, PlayerTrait> = new Map()
  private sprite: SpriteSheet | null = null
  private compositor: Compositor

  constructor(compositor: Compositor) {
    this.velocity = new Vector2(2, 2)
    this.bounds = this.getBounds()
    this.compositor = compositor
  }

  public async load() {
    this.sprite = await loadPlayerSprites()
    this.compositor.layers.push(createSpriteLayer(this.sprite, this.x, this.y))
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.sprite?.draw(context, 'player', this.x, this.y)
  }

  private getBounds(): BoundingBox {
    const { w, h } = this.size
    return new BoundingBox({ x: this.x, y: this.y }, { w, h })
  }

  public update(): void {
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.traits.forEach(t => t.update(this))
  }

  public addTrait(trait: PlayerTrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
  }

  public hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  //TODO: what ?
  [key: string]: any
}
