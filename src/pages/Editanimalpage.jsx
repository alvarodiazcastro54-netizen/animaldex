import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAnimal } from '../hooks/useAnimales'
import AnimalForm from '../components/AnimalForm'
import { WakeLoader, ErrorState } from '../components/LoadingStates'

export default function EditAnimalPage() {
  const { id } = useParams()
  const { animal, loading, error, waking } = useAnimal(id)

  return (
    <div className="min-h-screen bg-night-950 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to={`/animal/${id}`} className="inline-flex items-center gap-2 font-body text-xs text-slate-500 hover:text-acid-500 tracking-widest transition-colors group mb-6 block">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          VOLVER AL DETALLE
        </Link>

        <div className="bg-night-800 border border-night-700 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-acid-500 rounded-full" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wider">EDITAR ANIMAL</h1>
          </div>

          {loading && waking ? (
            <WakeLoader message="Cargando datos..." />
          ) : loading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-10 rounded-lg" />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} />
          ) : animal ? (
            <AnimalForm initial={animal} animalId={id} />
          ) : null}
        </div>
      </div>
    </div>
  )
}