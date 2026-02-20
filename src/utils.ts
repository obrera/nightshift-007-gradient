import type { GradientState, ColorStop } from './types'

export function generateCSS(state: GradientState): string {
  const stops = [...state.stops]
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(', ')

  switch (state.type) {
    case 'linear':
      return `linear-gradient(${state.angle}deg, ${stops})`
    case 'radial':
      return `radial-gradient(circle at ${state.radialPosition.x}% ${state.radialPosition.y}%, ${stops})`
    case 'conic':
      return `conic-gradient(from ${state.angle}deg, ${stops})`
  }
}

let _id = 0
export function newId(): string {
  return `stop-${++_id}-${Date.now()}`
}

export function newStop(color: string, position: number): ColorStop {
  return { id: newId(), color, position }
}
