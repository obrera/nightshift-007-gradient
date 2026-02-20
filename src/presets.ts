import type { Preset } from './types'
import { newStop } from './utils'

export const presets: Preset[] = [
  {
    name: 'Sunset',
    state: {
      type: 'linear',
      angle: 135,
      radialPosition: { x: 50, y: 50 },
      stops: [newStop('#ff6b35', 0), newStop('#f7c59f', 50), newStop('#efefd0', 100)],
    },
  },
  {
    name: 'Ocean',
    state: {
      type: 'linear',
      angle: 180,
      radialPosition: { x: 50, y: 50 },
      stops: [newStop('#0077b6', 0), newStop('#00b4d8', 50), newStop('#90e0ef', 100)],
    },
  },
  {
    name: 'Aurora',
    state: {
      type: 'linear',
      angle: 45,
      radialPosition: { x: 50, y: 50 },
      stops: [newStop('#0d1b2a', 0), newStop('#1b4332', 30), newStop('#2d6a4f', 60), newStop('#52b788', 100)],
    },
  },
  {
    name: 'Neon',
    state: {
      type: 'linear',
      angle: 90,
      radialPosition: { x: 50, y: 50 },
      stops: [newStop('#ff006e', 0), newStop('#8338ec', 50), newStop('#3a86ff', 100)],
    },
  },
  {
    name: 'Fire',
    state: {
      type: 'radial',
      angle: 0,
      radialPosition: { x: 50, y: 50 },
      stops: [newStop('#ffbe0b', 0), newStop('#fb5607', 50), newStop('#ff006e', 100)],
    },
  },
  {
    name: 'Cosmic',
    state: {
      type: 'conic',
      angle: 0,
      radialPosition: { x: 50, y: 50 },
      stops: [newStop('#7400b8', 0), newStop('#6930c3', 25), newStop('#5390d9', 50), newStop('#48bfe3', 75), newStop('#7400b8', 100)],
    },
  },
]
