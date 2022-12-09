import { C2D, LayerCallback } from '@/models/game'

export default class Compositor {
  public layers: LayerCallback[]

  constructor() {
    this.layers = []
  }

  public draw(context: C2D) {
    this.layers.forEach(layer => layer(context))
  }
}
