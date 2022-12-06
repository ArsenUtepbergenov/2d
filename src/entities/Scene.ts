import Renderer from './Renderer'
import AreaLimiter from './AreaLimiter'
import Particle from './physics/Particles'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import LockedInsideArea from './physics/traits/LockedInsideArea'
import { CS } from '@/utils'
import { Colors } from '@/models/enums'
import { CanvasParams } from '@/models'

export default class Scene {
  private renderer: Renderer
  private particles: Particle[] = []
  private c2d: CanvasRenderingContext2D
  private areaLimiter: AreaLimiter
  private rafId: number = 0

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.renderer = new Renderer(ref, params)
    this.c2d = this.renderer.c2d
    this.areaLimiter = new AreaLimiter(this.renderer.rect)
    this.init()
  }

  public init(): void {
    this.renderer.applyDrawer(
      new PrimitivesDrawer(this.c2d, {
        isCartesian: false,
        fillStyle: Colors.green,
      }),
    )

    const planet = new Particle({
      x: CS.cX + 170,
      y: CS.cY,
      radius: 5,
      speed: 5,
      direction: -Math.PI / 2,
      mode: 'fill',
      style: Colors.dark,
    })
    const sun = new Particle({
      x: CS.cX,
      y: CS.cY,
      radius: 20,
      mass: 5000,
      mode: 'fill',
      style: Colors.sun,
    })
    planet.addTrait(new LockedInsideArea())

    this.particles.push(planet)
    this.particles.push(sun)
  }

  public freeze(): void {
    cancelAnimationFrame(this.rafId)
  }

  public unfreeze(): void {
    this.update()
  }

  private update = () => {
    cancelAnimationFrame(this.rafId)

    const that = this

    function loop() {
      that.renderer.clear()

      that.particles[0].gravitateTo(that.particles[1])
      that.updateParticles()
      that.renderParticles()

      that.rafId = requestAnimationFrame(loop)
    }

    loop()
  }

  public show(): void {
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
    this.areaLimiter.setRectArea(this.renderer.rect)
  }
}
