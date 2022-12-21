import { Sides } from '@/models/enums'
import { TileByIndex } from '@/models/game'
import Level from '../Level'
import SpriteEntity from '../SpriteEntity'

export interface ICollidable {
  collides(us: SpriteEntity, them: SpriteEntity): void
}

export interface IObstructable {
  obstruct(entity: SpriteEntity, side: Sides, match?: TileByIndex): void
}

export interface IUpdatable {
  update(entity: SpriteEntity, dTime: number, level?: Level): void
}

export default abstract class EntityTrait {
  public abstract name: string
}
