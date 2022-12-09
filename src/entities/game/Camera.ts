import Config from '@/models/config'
import Vector2 from '../math/Vector2'

export default class Camera {
  public position = new Vector2(0, 0)
  public size = { w: Config.WORLD_WIDTH - 32, h: Config.WORLD_HEIGHT - 32 }
}
