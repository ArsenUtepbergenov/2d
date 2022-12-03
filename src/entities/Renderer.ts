import Drawer from './drawers/Drawer'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import Particle from './physics/Particles'

export default class Renderer {
  private drawers: Map<string, Drawer> = new Map()

  public applyDrawer(drawer: Drawer): void {
    this.drawers.set(drawer.constructor.name, drawer)
  }

  public drawParticle(particle: Particle): void {
    const drawer = this.drawers.get('PrimitivesDrawer') as PrimitivesDrawer
    drawer.strokeCircle(particle.position, { radius: 50 })
  }
}
