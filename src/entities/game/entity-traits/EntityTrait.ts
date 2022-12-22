import { Sides, Sounds } from '@/models/enums'
import { GameContext, TileByIndex } from '@/models/game'
import AudioBoard from '../AudioBoard'
import Level from '../Level'
import SpriteEntity from '../SpriteEntity'

export interface ICollidable {
  collides(us: SpriteEntity, them: SpriteEntity): void
}

export interface IObstructable {
  obstruct(entity: SpriteEntity, side: Sides, match?: TileByIndex): void
}

export interface IUpdatable {
  update(entity: SpriteEntity, gameContext: GameContext, level?: Level): void
}

export default abstract class EntityTrait {
  public abstract name: string
  public sounds = new Set<Sounds>()

  public playSounds(audioBoard: AudioBoard, context: AudioContext) {
    this.sounds.forEach(sound => audioBoard.play(sound, context))

    this.sounds.clear()
  }
}
