import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAnimal } from '../hooks/useAnimales'
import { useWikiImage } from '../hooks/useWikiImage'
import { getStatusInfo, getClassEmoji, getRegionInfo, CONSERVATION_STATUS } from '../utils/api'
import { WakeLoader, ErrorState } from '../components/LoadingStates'

function DetailImage({ nombre_cientifico, nombre_comun, clase }) {
  const imgUrl = useWikiImage(nombre_cientifico)
  const [imgError, setImgError] = useState(false)
  const emoji = getClassEmoji(clase)

  if (imgUrl === undefined) {
    return (
      <div className="w-full h-72 md:h-96 skeleton flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-acid-500/30 border-t-acid-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!imgUrl || imgError) {
    return (
      <div className="w-full h-72 md:h-96 bg-night-800 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <span className="text-8xl opacity-50 animate-float">{emoji}</span>
        <p className="font-body text-sm text-acid-500/30 italic text-center px-8">
          {nombre_cientifico}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-72 md:h-96 overflow-hidden">
      <img
        src={imgUrl}
        alt={nombre_comun}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function TaxoRow({ label, value }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-night-700/50">
      <span className="font-body text-xs text-slate-600 tracking-widest w-28 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <span className="font-display text-base text-slate-200 font-medium tracking-wide">
        {value || '—'}
      </span>
    </div>
  )
}

// Conservation status bar visualization
function ConservationBar({ status }) {
  const statuses = ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX']
  const idx = statuses.indexOf(status)
  const colors = {
    LC: '#00ff88', NT: '#7dff7d', VU: '#ffd000',
    EN: '#ffb800', CR: '#ff6b35', EW: '#ff5a6e', EX: '#ff3b5c',
  }

  return (
    <div className="mt-4">
      <div className="flex gap-1">
        {statuses.map((s, i) => (
          <div key={s} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="h-6 w-full rounded-sm transition-all duration-300"
              style={{
                backgroundColor: i <= idx ? (colors[s] || '#9ca3af') : '#162d44',
                opacity: s === status ? 1 : i < idx ? 0.4 : 0.15,
                boxShadow: s === status ? `0 0 8px ${colors[s]}80` : 'none',
              }}
            />
            <span
              className="font-body text-xs"
              style={{ color: s === status ? colors[s] : '#374151', fontSize: '0.6rem' }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnimalDetailPage() {
  const { id } = useParams()
  const { animal, loading, error, waking } = useAnimal(id)
  const status = animal ? getStatusInfo(animal.estado_conservacion) : null
  const region = animal ? getRegionInfo(animal.region) : null

  return (
    <div className="min-h-screen bg-night-950 pt-16">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-xs text-slate-500 hover:text-acid-500 tracking-widest transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO DATABASE
        </Link>
      </div>

      {loading && waking ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <WakeLoader message="Loading species data..." />
        </div>
      ) : loading ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-night-800 rounded-2xl overflow-hidden border border-night-700 animate-pulse">
            <div className="skeleton h-96 w-full" />
            <div className="p-8 space-y-4">
              <div className="skeleton h-8 w-1/2 rounded" />
              <div className="skeleton h-4 w-1/3 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-full rounded" />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ErrorState message={error} />
        </div>
      ) : animal ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 animate-slide-up">
          <div className="bg-night-800 rounded-2xl overflow-hidden border border-night-700">
            {/* Hero image */}
            <div className="relative">
              <DetailImage
                nombre_cientifico={animal.nombre_cientifico}
                nombre_comun={animal.nombre_comun}
                clase={animal.clase}
              />
              {/* Overlay with ID */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-800 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 font-body text-xs text-acid-500/60 bg-night-900/80 px-3 py-1.5 rounded backdrop-blur-sm">
                #{String(animal.id).padStart(4, '0')}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              {/* Name + status */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-wider">
                    {animal.nombre_comun}
                  </h1>
                  <p className="font-body text-sm text-slate-500 italic mt-1">
                    {animal.nombre_cientifico}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div
                    className={`status-${animal.estado_conservacion} font-display text-sm px-4 py-2 rounded border tracking-widest`}
                  >
                    {status?.label || animal.estado_conservacion}
                  </div>
                  <div className="flex items-center gap-1.5 font-body text-xs text-slate-500">
                    <span>{region?.emoji}</span>
                    <span>{region?.label || animal.region}</span>
                  </div>
                </div>
              </div>

              {/* Conservation spectrum */}
              <div className="mb-8 bg-night-900/50 rounded-xl p-4 border border-night-700">
                <p className="font-body text-xs text-slate-600 tracking-widest mb-3">CONSERVATION STATUS</p>
                <ConservationBar status={animal.estado_conservacion} />
              </div>

              {/* Taxonomy */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 bg-acid-500 rounded-full" />
                  <h2 className="font-display text-lg font-bold text-white tracking-wider">TAXONOMY</h2>
                </div>
                <div className="bg-night-900/40 rounded-xl px-4 border border-night-700/50">
                  <TaxoRow label="KINGDOM"  value={animal.reino} />
                  <TaxoRow label="PHYLUM"   value={animal.filo} />
                  <TaxoRow label="CLASS"    value={animal.clase} />
                  <TaxoRow label="ORDER"    value={animal.orden} />
                  <TaxoRow label="FAMILY"   value={animal.familia} />
                  <TaxoRow label="GENUS"    value={animal.genero} />
                  <TaxoRow label="SPECIES"  value={animal.nombre_cientifico} />
                </div>
              </div>

              {/* Wikipedia link */}
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(animal.nombre_cientifico)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-xs text-acid-500/70 hover:text-acid-500 border border-acid-500/20 hover:border-acid-500/50 px-4 py-2 rounded-lg tracking-widest transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                VIEW ON WIKIPEDIA
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
