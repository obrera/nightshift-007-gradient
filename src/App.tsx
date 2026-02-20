import { useState, useCallback } from 'react'
import type { GradientState, GradientType, ColorStop } from './types'
import { generateCSS, newStop } from './utils'
import { presets } from './presets'

const defaultState: GradientState = {
  type: 'linear',
  angle: 90,
  radialPosition: { x: 50, y: 50 },
  stops: [newStop('#6366f1', 0), newStop('#ec4899', 100)],
}

function App() {
  const [state, setState] = useState<GradientState>(defaultState)
  const [copied, setCopied] = useState(false)

  const css = generateCSS(state)
  const fullCSS = `background: ${css};`

  const setType = (type: GradientType) => setState((s: GradientState) => ({ ...s, type }))
  const setAngle = (angle: number) => setState((s: GradientState) => ({ ...s, angle }))

  const updateStop = useCallback((id: string, updates: Partial<ColorStop>) => {
    setState((s: GradientState) => ({
      ...s,
      stops: s.stops.map((st: ColorStop) => (st.id === id ? { ...st, ...updates } : st)),
    }))
  }, [])

  const addStop = () => {
    const pos = Math.round(Math.random() * 100)
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
    const color = colors[Math.floor(Math.random() * colors.length)]
    setState((s: GradientState) => ({ ...s, stops: [...s.stops, newStop(color, pos)] }))
  }

  const removeStop = (id: string) => {
    setState((s: GradientState) => {
      if (s.stops.length <= 2) return s
      return { ...s, stops: s.stops.filter((st: ColorStop) => st.id !== id) }
    })
  }

  const copyCSS = async () => {
    await navigator.clipboard.writeText(fullCSS)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const loadPreset = (index: number) => {
    const p = presets[index]
    setState({
      ...p.state,
      stops: p.state.stops.map((s) => newStop(s.color, s.position)),
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            CSS Gradient Generator
          </span>
        </h1>
      </header>

      <div className="mx-auto max-w-7xl p-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Preview */}
        <div className="space-y-4">
          <div
            className="w-full aspect-[16/10] rounded-2xl border border-neutral-800 shadow-2xl"
            style={{ background: css }}
          />

          {/* CSS Output */}
          <div className="relative">
            <pre className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 pr-24 text-sm font-mono text-neutral-300 overflow-x-auto whitespace-pre-wrap break-all">
              {fullCSS}
            </pre>
            <button
              onClick={copyCSS}
              className="absolute top-3 right-3 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Presets */}
          <div>
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Presets</h3>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => loadPreset(i)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-sm transition-colors cursor-pointer"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-neutral-700 shrink-0"
                    style={{ background: generateCSS(p.state) }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Type */}
          <div>
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Type</h3>
            <div className="flex gap-1 bg-neutral-900 rounded-xl p-1 border border-neutral-800">
              {(['linear', 'radial', 'conic'] as GradientType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer ${
                    state.type === t
                      ? 'bg-indigo-600 text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Angle (linear & conic) */}
          {(state.type === 'linear' || state.type === 'conic') && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">Angle</span>
                <span className="text-neutral-300 font-mono">{state.angle}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={state.angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          )}

          {/* Radial position */}
          {state.type === 'radial' && (
            <div>
              <h3 className="text-sm font-medium text-neutral-400 mb-2">
                Position ({state.radialPosition.x}%, {state.radialPosition.y}%)
              </h3>
              <div
                className="relative w-full aspect-square bg-neutral-900 border border-neutral-800 rounded-xl cursor-crosshair max-w-[200px]"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
                  const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)
                  setState((s: GradientState) => ({ ...s, radialPosition: { x, y } }))
                }}
              >
                <div
                  className="absolute w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-indigo-500 shadow-lg"
                  style={{
                    left: `${state.radialPosition.x}%`,
                    top: `${state.radialPosition.y}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Color Stops */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-400">Color Stops</h3>
              <button
                onClick={addStop}
                className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-300 transition-colors cursor-pointer"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {[...state.stops]
                .sort((a: ColorStop, b: ColorStop) => a.position - b.position)
                .map((stop: ColorStop) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2"
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={stop.position}
                      onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                      className="flex-1 accent-indigo-500"
                    />
                    <span className="text-xs font-mono text-neutral-500 w-8 text-right">
                      {stop.position}%
                    </span>
                    {state.stops.length > 2 && (
                      <button
                        onClick={() => removeStop(stop.id)}
                        className="text-neutral-600 hover:text-red-400 transition-colors text-lg leading-none cursor-pointer"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-6 py-4 mt-8 text-center text-xs text-neutral-600">
        Built by Obrera · Nightshift #007
      </footer>
    </div>
  )
}

export default App
