import Config from '@/models/config'
import Level from '../Level'
import SpriteEntity from '../SpriteEntity'
import EntityTrait from './EntityTrait'

export default class PlayerController extends EntityTrait {
  public _player: SpriteEntity | null = null
  public name = 'playerController'

  public update(entity: SpriteEntity, dTime: number, level: Level): void {
    if (!level.entities.has(this._player as SpriteEntity)) {
      if (this._player !== null) {
        this._player.killable.revive()
        this._player.position = Config.PLAYER_START_POSITION
        level.entities.add(this._player)
      }
    }
  }

  public set player(entity: SpriteEntity) {
    this._player = entity
  }

  private hasPlayer(): boolean {
    return this._player !== null
  }
}
