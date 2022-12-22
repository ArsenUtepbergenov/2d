import { Sounds } from '@/models/enums'
import { GameContext } from '@/models/game'
import SpriteEntity from '../SpriteEntity'
import EntityTrait, { IUpdatable } from './EntityTrait'

export default class Shot extends EntityTrait implements IUpdatable {
  public name = 'shot'
  public fireball = 0
  private fireballDuration = 1.73
  private ready = 0

  public update(_: SpriteEntity, { dTime }: GameContext): void {
    this.ready += dTime

    if (this.ready > this.fireballDuration) {
      if (this.fireball > 0) {
        this.sounds.add(Sounds.SHOT_FIREBALL)
        this.ready = 0
      }
    }
  }
}
