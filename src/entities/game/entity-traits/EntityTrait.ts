import { Sides } from '@/models/enums'
import Level from '../Level'
import SpriteEntity from '../SpriteEntity'

export interface ICollidable {
  collides(us: SpriteEntity, them: SpriteEntity): void
}

export interface IObstructable {
  obstruct(side: Sides): void
}

export interface IUpdatable {
  update(entity: SpriteEntity, dTime: number, level?: Level): void
}

export default abstract class EntityTrait {
  public abstract name: string
}
