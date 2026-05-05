import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWikiImage } from '../hooks/useWikiImage'
import { getStatusInfo, getClassEmoji, getRegionInfo } from '../utils/api'

function AnimalImage({ nombre_cientifico, nombre_comun, clase }) {
  const imgUrl = useWikiImage(nombre_cientifico)
  const [imgError, setImgError] = useState(false)
  const emoji = getClassEmoji(clase)

  if (imgUrl === undefined) {
    // Loading
    return (
      <div className="w-full h-48 skeleton flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-acid-500/30 border-t-acid-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!imgUrl || imgError) {
    // Elegant placeholder
    return (
      <div className="w-full h-48 bg-night-800 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <span className="text-5xl opacity-60 animate-float">{emoji}</span>
        <p
          className="font-body text-xs text-acid-500/40 italic px-4 text-center leading-relaxed"
          style={{ letterSpacing: '0.05em' }}
        >
          {nombre_cientifico}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid-500/20 to-transparent" />
      </div>
    )
  }

  return (
    <div className="w-full h-48 overflow-hidden bg-night-800">
      <img
        src={imgUrl}
        alt={nombre_comun}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  )
}

export default function AnimalCard({ animal }) {
  const status = getStatusInfo(animal.estado_conservacion)
  const region = getRegionInfo(animal.region)

  return (
    <Link
      to={`/animal/${animal.id}`}
      className="group block bg-night-800 border border-night-700 rounded-xl overflow-hidden card-glow relative"
    >
      {/* Image area */}
      <div className="relative overflow-hidden">
        <AnimalImage
          nombre_cientifico={animal.nombre_cientifico}
          nombre_comun={animal.nombre_comun}
          clase={animal.clase}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-800/80 via-transparent to-transparent" />

        {/* ID badge */}
        <div className="absolute top-3 left-3 number-badge bg-night-900/80 text-acid-500/70 px-2 py-1 rounded backdrop-blur-sm">
          #{String(animal.id).padStart(4, '0')}
        </div>

        {/* Conservation status */}
        <div
          className={`absolute top-3 right-3 status-${animal.estado_conservacion} text-xs font-body px-2 py-1 rounded border backdrop-blur-sm`}
        >
          {animal.estado_conservacion}
        </div>

        {/* Region */}
        <div className="absolute bottom-3 right-3 text-sm opacity-60 group-hover:opacity-90 transition-opacity">
          {region.emoji}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-acid-500 transition-colors duration-200 leading-tight">
          {animal.nombre_comun}
        </h3>
        <p className="font-body text-xs text-slate-500 italic mt-0.5 mb-3 truncate">
          {animal.nombre_cientifico}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-xs bg-night-700 text-slate-400 px-2 py-1 rounded">
            {animal.clase}
          </span>
          <span className="font-body text-xs bg-night-700 text-slate-400 px-2 py-1 rounded truncate max-w-[8rem]">
            {animal.orden}
          </span>
        </div>

        {/* Hover line indicator */}
        <div className="mt-3 h-px bg-gradient-to-r from-acid-500/0 via-acid-500/0 to-acid-500/0 group-hover:via-acid-500/60 transition-all duration-500" />
      </div>
    </Link>
  )
}
