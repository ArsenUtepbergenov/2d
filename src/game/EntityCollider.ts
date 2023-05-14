import SpriteEntity from './SpriteEntity'

export default class EntityCollider {
  private entities

  constructor(entities: Set<SpriteEntity>) {
    this.entities = entities
  }

  public check(subject: SpriteEntity) {
    this.entities.forEach(candidate => {
      if (subject === candidate) return

      if (subject.bounds.overlaps(candidate.bounds)) {
        subject.collides(candidate)
        candidate.collides(subject)
      }
    })
  }
}
