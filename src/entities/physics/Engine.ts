import PhysicsTrait from './traits/PhysicsTrait'
import { v4 as uuidv4 } from 'uuid'

export default class Engine {
  private physicsTraits: Map<string, PhysicsTrait> = new Map()

  public getPhysicsTrait(): PhysicsTrait {
    const pt = new PhysicsTrait()
    const name = `${pt.name}-${uuidv4()}`
    this.physicsTraits.set(name, pt)
    return this.physicsTraits.get(name)!
  }

  public get numberPhysicsTraits(): number {
    return this.physicsTraits.size
  }
}
