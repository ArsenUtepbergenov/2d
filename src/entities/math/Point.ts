export class Point {
  public x
  public y

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

export default function getPoint(x: number = 0, y: number = 0): Point {
  return new Point(x, y)
}
