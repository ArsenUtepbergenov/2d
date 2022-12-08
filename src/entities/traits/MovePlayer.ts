import Player from '../game/Player.js'
import PlayerTrait from './PlayerTrait.js'

export default class MovePlayer extends PlayerTrait {
  public direction = 0

  constructor() {
    super('movePlayer')
  }

  public update(player: Player): void {
    if (this.direction !== 0) {
      player.velocity.x = player.speed * this.direction
    }
  }
}
