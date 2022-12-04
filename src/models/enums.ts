export const enum Colors {
  light = 'white',
  grey = '#a1a1a1',
  dark = '#442132',
  brown = '#795548',
  green = 'green',
}

export const enum Config {
  FONT = '1rem Calibri',
}

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
}

export const Primitives = ['rect', 'circle'] as const
