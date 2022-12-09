import SpriteEntity from '../SpriteEntity'

export default abstract class EntityTrait {
  constructor(public name: string) {
    this.name = name
  }

  public abstract update(entity: SpriteEntity, dTime: number): void
}
