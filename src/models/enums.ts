export const enum Colors {
  light = 'white',
  grey = '#a1a1a1',
  dark = '#442132',
  brown = '#795548',
  green = '#8bc34a',
  sun = '#F28C38',
}

export abstract class Config {
  public static readonly CHARACTERS = 'src/assets/characters.png'
  public static readonly TILES = 'src/assets/tiles.png'
  public static readonly WORLD = 'src/assets/world.json'
  public static readonly FONT = '1rem Calibri'
  public static readonly WORLD_WIDTH = 448 // 14
  public static readonly WORLD_HEIGHT = 384 // 12
  public static readonly PLAYER_START_X = Config.WORLD_WIDTH / 2
  public static readonly PLAYER_START_Y = Config.WORLD_HEIGHT / 2
}

export const enum Sides {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export const Primitives = ['rect', 'circle'] as const
