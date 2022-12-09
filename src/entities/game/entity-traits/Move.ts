import SpriteEntity from '../SpriteEntity'
import EntityTrait from './EntityTrait'

export default class Move extends EntityTrait {
  public directionX = 0
  public directionY = 0
  public speed = 300

  constructor() {
    super('move')
  }

  public update(entity: SpriteEntity, dTime: number): void {
    entity.velocity.x = this.speed * this.directionX * dTime
    entity.velocity.y = this.speed * this.directionY * dTime
  }
}
