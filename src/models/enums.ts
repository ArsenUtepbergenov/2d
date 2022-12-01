export enum System {
  RESIZE_TIME = 500,
}

export abstract class CoordinateSystem {
  public static CM = 19 // One centimeter = ~19px

  public static getLines(dimension: number) {
    return Math.floor(dimension / CoordinateSystem.CM) / 2
  }

  public static getCenterOfAxis(lines: number) {
    return lines * CoordinateSystem.CM + CoordinateSystem.CM / 2
  }
}

export const enum Colors {
  lightGrey = '#eee',
  dark = '#2d2d2d',
  lightCoral = 'lightcoral',
}

export const enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export const enum ColorType {
  DEFAULT,
  ERROR,
  SUCCESS,
  INFO,
}
