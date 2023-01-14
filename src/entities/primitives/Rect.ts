import { Rectangle } from '@/models/types'

export default class Rect implements Rectangle {
  public x = 0
  public y = 0
  public w = 1
  public h = 1

  constructor(x = 0, y = 0, w = 1, h = 1) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
}
