import { Matrix } from '../math/Matrix'
import Compositor from './Compositor'
import SpriteEntity from './SpriteEntity'

export default class Level {
  public compositor = new Compositor()
  public entities = new Set<SpriteEntity>()
  public tiles = new Matrix()

  constructor() {}

  public update(dTime: number) {
    this.entities.forEach(entity => entity.update(dTime))
  }
}
