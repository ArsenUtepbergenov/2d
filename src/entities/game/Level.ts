import Compositor from './Compositor'
import SpriteEntity from './SpriteEntity'

export default class Level {
  public compositor = new Compositor()
  public entities = new Set<SpriteEntity>()

  constructor() {}

  public update(dTime: number) {
    this.entities.forEach(entity => entity.update(dTime))
  }
}
