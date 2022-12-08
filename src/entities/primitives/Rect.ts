import { IRect } from '@/models/types'

export default class Rect implements IRect {
  public w = 1
  public h = 1

  constructor(w = 1, h = 1) {
    this.w = w
    this.h = h
  }
}
