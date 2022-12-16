export default abstract class Config {
  public static readonly FONT = '1rem Calibri'
  public static readonly TILES = 'src/assets/tiles.png'
  public static readonly WORLD = 'src/assets/world.json'
  public static readonly WORLD_SPRITES = 'src/assets/world-sprites.json'
  public static readonly ENEMY = 'src/assets/enemy.json'
  public static readonly PLAYER = 'src/assets/player.json'
  public static readonly CHARACTERS = 'src/assets/characters.png'
  public static readonly TILE_SIZE = 32 as const
  public static readonly WORLD_WIDTH = Config.TILE_SIZE * 14 // 448
  public static readonly WORLD_HEIGHT = Config.TILE_SIZE * 12 // 384
  public static readonly PLAYER_START_POSITION = { x: 64, y: 64 }
  public static readonly PLAYER_OFFSET = { x: 0, y: 0 }
  public static readonly PLAYER_SIZE = {
    w: 28,
    h: Config.TILE_SIZE,
  } as const
}
