import { System } from '@/models/system'

export class Point {
  public x
  public y

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

export default function getPoint(x = 0, y = 0, inCM = false) {
  return inCM ? System.convertToCM({ x, y }) : { x, y }
}
