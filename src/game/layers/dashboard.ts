import { C2D } from '@/models/game'
import { Font } from '../loaders/font'

export function createDashboardLayer(font: Font) {
  return function drawDashboard(c2d: C2D) {
    font.print('RPG', c2d, 16, 8)
  }
}
