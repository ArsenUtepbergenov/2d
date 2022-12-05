import Renderer from './Renderer'
import Vector from './math/Vector'
import Particle from './physics/Particles'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import { CS, System } from '@/utils'
import { Colors } from '@/models/enums'
import { CanvasParams } from '@/models'
import Utils from '@/utils/general'
import LockedInsideArea from './physics/traits/LockedInsideArea'
import AreaLimiter from './AreaLimiter'

export default class Scene {
  private renderer: Renderer
  private drawerParams = {
    isCartesian: false,
    strokeStyle: Colors.green,
  }
  private particleParams = {
    x: CS.cX,
    y: CS.cY,
    w: System.CM,
    h: System.CM,
    radius: System.HCM,
    velocity: new Vector(3, 3),
  }
  private particles: Particle[] = []
  private c2d: CanvasRenderingContext2D
  private areaLimiter: AreaLimiter

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.renderer = new Renderer(ref, params)
    this.c2d = this.renderer.c2d
    this.areaLimiter = new AreaLimiter({
      x: 0,
      y: 0,
      w: params.w,
      h: params.h,
    })
  }

  private update = () => {
    this.updateParticles()

    this.renderer.clear()
    this.renderParticles()

    requestAnimationFrame(this.update)
  }

  public show(): void {
    this.renderer.applyDrawer(new PrimitivesDrawer(this.c2d, this.drawerParams))
    const { x, y } = Utils.getRandomPositionInsideArea(
      { w: System.CM, h: System.CM },
      this.renderer.rect,
    )
    this.particleParams.x = x
    this.particleParams.y = y
    const particle = new Particle(this.particleParams)
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
