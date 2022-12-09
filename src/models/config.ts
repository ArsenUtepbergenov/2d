export default abstract class Config {
  public static readonly FONT = '1rem Calibri'
  public static readonly TILES = 'src/assets/tiles.png'
  public static readonly WORLD = 'src/assets/world.json'
  public static readonly CHARACTERS = 'src/assets/characters.png'
  public static readonly TILE_SIZE = 32 as const
  public static readonly WORLD_WIDTH = Config.TILE_SIZE * 14 // 448
  public static readonly WORLD_HEIGHT = Config.TILE_SIZE * 12 // 384
  public static readonly PLAYER_START_X = Config.WORLD_WIDTH / 2
  public static readonly PLAYER_START_Y = Config.WORLD_HEIGHT / 2
  public static readonly PLAYER_SIZE = {
    w: Config.TILE_SIZE,
    h: Config.TILE_SIZE,
  } as const
}
