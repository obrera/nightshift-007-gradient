export type GradientType = 'linear' | 'radial' | 'conic'

export interface ColorStop {
  id: string
  color: string
  position: number // 0-100
}

export interface GradientState {
  type: GradientType
  angle: number // for linear/conic
  radialPosition: { x: number; y: number } // for radial (percentage)
  stops: ColorStop[]
}

export interface Preset {
  name: string
  state: GradientState
}
