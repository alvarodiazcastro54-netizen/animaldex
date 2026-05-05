import React, { useState } from 'react'

const CLASSES = [
  'Mammalia', 'Aves', 'Reptilia', 'Amphibia',
  'Actinopterygii', 'Chondrichthyes', 'Insecta',
  'Arachnida', 'Malacostraca', 'Cephalopoda',
]

export default function SearchFilters({ onSearch }) {
  const [nombre, setNombre] = useState('')
  const [clase, setClase] = useState('')
  const [familia, setFamilia] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch({ nombre, clase, familia, page: 1 })
  }

  function handleReset() {
    setNombre('')
    setClase('')
    setFamilia('')
    onSearch({ nombre: '', clase: '', familia: '', page: 1 })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-night-800/60 backdrop-blur-sm border border-night-700 rounded-xl p-5 mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-acid-500 rounded-full animate-pulse" />
        <span className="font-body text-xs text-acid-500/70 tracking-widest">SEARCH PARAMETERS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {/* Name search */}
        <div>
          <label className="font-body text-xs text-slate-500 tracking-wider mb-2 block">
            NAME / SPECIES
          </label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="e.g. lion, panthera..."
            className="input-field w-full px-3 py-2 rounded-lg font-body text-sm"
          />
        </div>

        {/* Class filter */}
        <div>
          <label className="font-body text-xs text-slate-500 tracking-wider mb-2 block">
            CLASS
          </label>
          <select
            value={clase}
            onChange={e => setClase(e.target.value)}
            className="input-field w-full px-3 py-2 rounded-lg font-body text-sm"
          >
            <option value="">All classes</option>
            {CLASSES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Family filter */}
        <div>
          <label className="font-body text-xs text-slate-500 tracking-wider mb-2 block">
            FAMILY
          </label>
          <input
            type="text"
            value={familia}
            onChange={e => setFamilia(e.target.value)}
            placeholder="e.g. Felidae, Canidae..."
            className="input-field w-full px-3 py-2 rounded-lg font-body text-sm"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="font-body text-xs bg-acid-500 text-night-950 px-6 py-2 rounded-lg font-medium tracking-widest hover:bg-acid-400 transition-colors"
        >
          SCAN DATABASE
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="font-body text-xs text-slate-500 border border-night-600 hover:border-slate-500 px-4 py-2 rounded-lg tracking-widest transition-colors"
        >
          RESET
        </button>
      </div>
    </form>
  )
}
