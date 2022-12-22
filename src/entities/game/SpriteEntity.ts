import { Sides } from '@/models/enums'
import { C2D, GameContext, TileByIndex } from '@/models/game'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import AudioBoard from './AudioBoard'
import Level from './Level'
import EntityTrait from './entity-traits/EntityTrait'

export default abstract class SpriteEntity {
  public audio: AudioBoard | null = null
  public offset = { x: 0, y: 0 }
  public position = { x: 0, y: 0 }
  public velocity = new Vector2(0, 0)
  public size = { w: 0, h: 0 }
  public bounds = new BoundingBox(this.position, this.size, this.offset)
  protected traits: any[] = []

  public abstract draw(context: C2D): void

  public update(gameContext: GameContext, level?: Level): void {
    for (const t of this.traits) {
      if (!('update' in t)) continue
      t.update(this, gameContext, level)
    }
  }

  public collides(candidate: SpriteEntity) {
    for (const t of this.traits) {
      if (!('collides' in t)) continue
      t.collides(this, candidate)
    }
  }

  public obstruct(side: Sides, match: TileByIndex) {
    for (const t of this.traits) {
      if (!('obstruct' in t)) continue
      t.obstruct(this, side, match)
    }
  }

  public addTrait(trait: EntityTrait): void {
    this.traits.push(trait)
    this[trait.name] = trait
  }

  [key: string]: any
}
