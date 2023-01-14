import { CanvasParams } from '@/models'
import { Collider } from '@/utils/collider'
import Utils from '@/utils/general'
import BallsLockedArea from './BallsLockedArea'
import PrimitiveRenderer from './PrimitiveRenderer'
import { QuadTree } from './QuadTree'
import { createBall } from './physics'
import Ball from './physics/Ball'
import Entity from './physics/Entity'
import Rect from './primitives/Rect'

export default class Scene {
  private canvas: HTMLCanvasElement
  private renderer: PrimitiveRenderer
  private entities: Entity[] = []
  private ballsLockedArea: BallsLockedArea
  private rafId: number = 0

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = ref
    this.canvas.focus()
    this.renderer = new PrimitiveRenderer(ref, params)
    this.ballsLockedArea = new BallsLockedArea(this.renderer.rect)
    this.init()
  }

  public init(): void {
    const qt = new QuadTree(new Rect(0, 0, 300, 300), 4)

    for (let b = 0; b < 20; b++) {
      const ball = createBall(
        Utils.getRandomIntByInterval(0, 300),
        Utils.getRandomIntByInterval(0, 300),
        10,
      )
      ball.velocity.length = 1
      ball.velocity.angle = Utils.getRandomRad()
      this.entities.push(ball)
      qt.insert(ball)
    }

    qt.show(this.renderer.c2d)

    console.log(qt)
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
      // that.renderer.clear()

      // that.updateEntities()
      that.renderEntities()

      that.rafId = requestAnimationFrame(loop)
    }

    loop()
  }

  public show(): void {
    this.update()
  }

  private checkBallsCollision(i: number): void {
    if (this.entities.length < 2) return

    const ball1 = this.entities[i] as Ball

    for (let j = i + 1; j < this.entities.length; j++) {
      const ball2 = this.entities[j] as Ball
      if (Collider.checkCircleToCircle(ball1, ball2)) {
        Collider.collideBalls(ball1, ball2)
      }
    }
  }

  private updateEntities(): void {
    this.entities.forEach((e, i) => {
      e.update()
      this.ballsLockedArea.lock(e as Ball)
      this.checkBallsCollision(i)
    })
  }

  private renderEntities(): void {
    this.entities.forEach(e => this.renderer.render(e))
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.renderer.setSize(w, h)
  }
}
