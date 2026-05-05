import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api'

const FIELDS = [
  { key: 'nombre_comun',     label: 'Nombre Común',      required: true },
  { key: 'nombre_cientifico',label: 'Nombre Científico',  required: true },
  { key: 'descripcion',      label: 'Descripción',        textarea: true },
  { key: 'reino',            label: 'Reino',              placeholder: 'Animalia' },
  { key: 'filo',             label: 'Filo' },
  { key: 'clase',            label: 'Clase' },
  { key: 'orden',            label: 'Orden' },
  { key: 'familia',          label: 'Familia' },
  { key: 'genero',           label: 'Género' },
  { key: 'habitat',          label: 'Hábitat' },
  { key: 'dieta',            label: 'Dieta' },
  { key: 'region',           label: 'Región' },
  { key: 'estado_conservacion', label: 'Estado Conservación', placeholder: 'LC, VU, EN, CR...' },
  { key: 'peso_promedio',    label: 'Peso Promedio',      placeholder: 'e.g. 190 kg' },
  { key: 'imagen_url',       label: 'URL de Imagen' },
]

export default function AnimalForm({ initial = {}, animalId = null }) {
  const isEdit = !!animalId
  const [form, setForm] = useState({
    reino: 'Animalia',
    ...initial,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  function handleChange(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (isEdit) {
        await apiFetch(`/animales/${animalId}`, { method: 'PUT', body: JSON.stringify(form) })
        navigate(`/animal/${animalId}`)
      } else {
        const created = await apiFetch('/animales', { method: 'POST', body: JSON.stringify(form) })
        navigate(`/animal/${created.id}`)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-body text-xs px-4 py-3 rounded-lg">
          ⚠ {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(({ key, label, required, textarea, placeholder }) => (
          <div key={key} className={textarea ? 'sm:col-span-2' : ''}>
            <label className="font-body text-xs text-slate-500 tracking-widest block mb-1">
              {label.toUpperCase()} {required && <span className="text-acid-500">*</span>}
            </label>
            {textarea ? (
              <textarea
                value={form[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={placeholder || ''}
                rows={3}
                className="input-field w-full px-3 py-2 rounded-lg font-body text-sm resize-none"
              />
            ) : (
              <input
                type="text"
                required={required}
                value={form[key] || ''}
                onChange={e => handleChange(key, e.target.value)}
                placeholder={placeholder || ''}
                className="input-field w-full px-3 py-2 rounded-lg font-body text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="font-body text-xs bg-acid-500 text-night-950 px-6 py-2 rounded-lg font-medium tracking-widest hover:bg-acid-400 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {loading && <div className="w-3 h-3 border-2 border-night-950/30 border-t-night-950 rounded-full animate-spin" />}
          {isEdit ? 'GUARDAR CAMBIOS' : 'CREAR ANIMAL'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-body text-xs text-slate-500 border border-night-600 hover:border-slate-500 px-4 py-2 rounded-lg tracking-widest transition-colors"
        >
          CANCELAR
        </button>
      </div>
    </form>
  )
}