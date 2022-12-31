import Config from '@/models/config'
import Vector2 from '../entities/math/Vector2'

export default class Camera {
  public position = new Vector2(0, 0)
  public size = {
    w: Config.WORLD_WIDTH - Config.TILE_SIZE,
    h: Config.WORLD_HEIGHT - Config.TILE_SIZE,
  }
}
