const PRESSED = 1
const RELEASED = 0

type KeyState = 1 | 0

export default class KeyboardState {
  private states: Map<string, KeyState>
  private keys: Map<string, (keyState: KeyState) => void>

  constructor() {
    this.states = new Map()
    this.keys = new Map()
  }

  public addMapping(code: string, handler: (keyState: KeyState) => void) {
    this.keys.set(code, handler)
  }

  public handleEvent(event: KeyboardEvent) {
    const { code } = event
    const handler = this.keys.get(code)
    const isHandler = this.keys.has(code) && handler !== undefined

    if (!isHandler) return

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    if (this.states.get(code) === keyState) return

    this.states.set(code, keyState)

    handler(keyState)
  }

  public listenTo(element: Window | HTMLElement = window) {
    ;['keydown', 'keyup'].forEach(eventName => {
      element.addEventListener(eventName, event => {
        this.handleEvent(event as KeyboardEvent)
      })
    })
  }
}
