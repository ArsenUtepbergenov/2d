import SpriteEntity from './SpriteEntity'

export default class EntityCollider {
  private entities

  constructor(entities: Set<SpriteEntity>) {
    this.entities = entities
  }

  public check(subject: SpriteEntity) {
    // console.log(subject)
  }
}
