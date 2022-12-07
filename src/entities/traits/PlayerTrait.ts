import Player from '../Player'

export default abstract class PlayerTrait {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  public abstract update(player: Player): void
}
