import { IPoint } from '@/models/types'
export default class Point implements IPoint {
  constructor(public x: number = 0, public y: number = 0) {
    this.x = x
    this.y = y
  }
}
