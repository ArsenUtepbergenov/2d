import Level from '../Level'
import SpriteEntity from '../SpriteEntity'
import EntityTrait from './EntityTrait'

export default class Killable extends EntityTrait {
  public name = 'killable'
  public isDead = false
  public deadTime = 0
  public removeAfter = 2

  public kill() {
    this.isDead = true
  }

  public update(entity: SpriteEntity, dTime: number, level: Level): void {
    if (this.isDead) {
      console.log('isDead')
      this.deadTime += dTime
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity)
      }
    }
  }
}
