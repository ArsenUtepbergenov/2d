import Renderer from './Renderer'
import Particle, { getRandomParticle } from './physics/Particles'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import { Colors } from '@/models/enums'
import { CanvasParams } from '@/models'
import LockedInsideArea from './physics/traits/LockedInsideArea'
import AreaLimiter from './AreaLimiter'

export default class Scene {
  private renderer: Renderer
  private particles: Particle[] = []
  private c2d: CanvasRenderingContext2D
  private areaLimiter: AreaLimiter

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.renderer = new Renderer(ref, params)
    this.c2d = this.renderer.c2d
    this.areaLimiter = new AreaLimiter(this.renderer.rect)
  }

  private update = () => {
    this.updateParticles()

    this.renderer.clear()
    this.renderParticles()

    requestAnimationFrame(this.update)
  }

  public show(): void {
    this.renderer.applyDrawer(
      new PrimitivesDrawer(this.c2d, {
        isCartesian: false,
        fillStyle: Colors.green,
      }),
    )
    const particle = getRandomParticle(this.renderer.rect)
    particle.addTrait(new LockedInsideArea())

    this.particles.push(particle)
    this.update()
  }

  private updateParticles(): void {
    this.particles.forEach(p => {
      this.areaLimiter.limit(p)

      p.update()
    })
  }

  private renderParticles(): void {
    this.particles.forEach(p => this.renderer.render(p))
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.renderer.setSize(w, h)
  }
}
