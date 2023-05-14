import { GameContext } from '@/models/game'
import Level from '../Level'
import SpriteEntity from '../SpriteEntity'
import EntityTrait, { IUpdatable } from './EntityTrait'

export default class Killable extends EntityTrait implements IUpdatable {
  public name = 'killable'
  public isDead = false
  public deadTime = 0
  public removeAfter = 2

  public kill() {
    this.isDead = true
  }

  public revive() {
    this.isDead = false
    this.deadTime = 0
  }

  public update(entity: SpriteEntity, { dTime }: GameContext, level: Level): void {
    if (this.isDead) {
      this.deadTime += dTime
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity)
      }
    }
  }
}
