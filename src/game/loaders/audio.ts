import Config from '@/models/config'
import { Sounds } from '@/models/enums'
import AudioBoard from '../AudioBoard'

export async function loadPlayerAudioBoard(context: AudioContext) {
  const loadAudio = createAudioLoader(context)

  const buffer = await loadAudio(Config.AUDIO_FIREBALL)
  const audioBoard = new AudioBoard()
  audioBoard.add(Sounds.SHOT_FIREBALL, buffer)

  return audioBoard
}

export function createAudioLoader(context: AudioContext) {
  return async function loadAudio(url: string) {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()

    return context.decodeAudioData(buffer)
  }
}
