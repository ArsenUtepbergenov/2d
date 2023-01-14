import { CS } from '@/models/cs'
import { C2D } from '@/models/game'
import { Rectangle } from '@/models/types'
import Entity from './physics/Entity'
import Rect from './primitives/Rect'

export class QuadTree {
  private boundary: Rectangle
  private capacity: number
  private entities: Entity[] = []
  private northWest: QuadTree | null = null
  private northEast: QuadTree | null = null
  private southWest: QuadTree | null = null
  private southEast: QuadTree | null = null
  private divided = false

  constructor(boundary: Rectangle, capacity: number) {
    this.boundary = boundary
    this.capacity = capacity
  }

  public subdivide(): void {
    const { x, y, w, h } = this.boundary

    this.northEast = new QuadTree(
      new Rect(x + w / 2, y - h / 2, w / 2, h / 2),
      this.capacity,
    )
    this.northWest = new QuadTree(
      new Rect(x - w / 2, y - h / 2, w / 2, h / 2),
      this.capacity,
    )
    this.southEast = new QuadTree(
      new Rect(x + w / 2, y + h / 2, w / 2, h / 2),
      this.capacity,
    )
    this.southWest = new QuadTree(
      new Rect(x - w / 2, y + h / 2, w / 2, h / 2),
      this.capacity,
    )

    this.divided = true
  }

  public insert(entity: Entity): void {
    if (!this.contains(entity)) return

    if (this.entities.length < this.capacity) {
      this.entities.push(entity)
    } else {
      if (!this.divided) {
        this.subdivide()
      }

      this.northEast?.insert(entity)
      this.northWest?.insert(entity)
      this.southEast?.insert(entity)
      this.southWest?.insert(entity)
    }
  }

  public show(ctx: C2D): void {
    const { x, y, w, h } = this.boundary

    // ctx.translate(CS.cX / 2, CS.cY / 2)
    ctx.strokeStyle = 'red'
    ctx.strokeRect(x, y, w, h)

    if (this.divided) {
      this.northEast?.show(ctx)
      this.northWest?.show(ctx)
      this.southEast?.show(ctx)
      this.southWest?.show(ctx)
    }
  }

  private contains(entity: Entity): boolean {
    const { x, y, w, h } = this.boundary

    return (
      entity.bounds.left > x &&
      entity.bounds.right < x + w &&
      entity.bounds.top > y &&
      entity.bounds.bottom < y + h
    )
  }
}
