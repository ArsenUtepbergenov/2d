import AreaLimiter from './AreaLimiter'
import Particle from './physics/Particle'
import PrimitiveRenderer from './PrimitiveRenderer'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import LockedInsideArea from './traits/LockedInsideArea'
import { System } from '@/utils'
import { Colors } from '@/models/enums'
import { CanvasParams } from '@/models'

export default class Scene {
  private element: HTMLCanvasElement
  private renderer: PrimitiveRenderer
  private particles: Particle[] = []
  private c2d: CanvasRenderingContext2D
  private areaLimiter: AreaLimiter
  private rafId: number = 0

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.element = ref
    this.element.focus()
    this.renderer = new PrimitiveRenderer(ref, params)
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
    const box = new Particle('rect', {
      x: 50,
      y: 10,
      w: System.CM,
      h: System.CM,
      speed: 3,
      mode: 'fill',
      alpha: 0.6,
    })
    box.addTrait(new LockedInsideArea())
    this.particles.push(box)
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
