import { Primitives } from '@/models/enums'
import { EntityFormType } from '@/models/types'

export default abstract class Entities {
  public static isPrimitive(form: EntityFormType): boolean {
    return Primitives.includes(form)
  }
}
