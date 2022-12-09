import { C2D, LayerCallback } from '@/models/game'
import Camera from './Camera'

export default class Compositor {
  public layers: LayerCallback[]

  constructor() {
    this.layers = []
  }

  public draw(context: C2D, camera: Camera) {
    this.layers.forEach(layer => layer(context, camera))
  }
}
