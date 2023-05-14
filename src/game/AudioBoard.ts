export default class AudioBoard {
  public buffers = new Map<string, AudioBuffer>()

  public add(name: string, buffer: AudioBuffer): void {
    this.buffers.set(name, buffer)
  }

  public play(name: string, context: AudioContext): void {
    const source = context.createBufferSource()
    source.connect(context.destination)
    source.buffer = this.getSourceBuffer(name)
    source.start(0)
  }

  private getSourceBuffer(name: string) {
    const sourceBuffer = this.buffers.get(name)
    if (sourceBuffer && this.buffers.has(name)) return sourceBuffer
    return null
  }
}
