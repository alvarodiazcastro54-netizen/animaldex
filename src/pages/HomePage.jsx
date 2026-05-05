import React, { useState } from 'react'
import AnimalCard from '../components/AnimalCard'
import SearchFilters from '../components/SearchFilters'
import Pagination from '../components/Pagination'
import { WakeLoader, SkeletonCard, ErrorState, EmptyState } from '../components/LoadingStates'
import { useAnimales } from '../hooks/useAnimales'

export default function HomePage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    nombre: '',
    clase: '',
    familia: '',
  })

  const { data, loading, error, waking, refetch } = useAnimales(filters)

  function handleSearch(newFilters) {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  function handlePageChange(page) {
    setFilters(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const animals = data?.datos || []
  const total = data?.total || 0
  const totalPages = data?.total_paginas || 1

  return (
    <div className="min-h-screen bg-grid bg-night-950 pt-24 pb-20">
      {/* Radial glow bg */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-acid-500/3 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-acid-500/30" />
            <span className="font-body text-xs text-acid-500/50 tracking-[0.3em]">SPECIES DATABASE</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-acid-500/30" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-wider text-center">
            ANIMAL
            <span className="text-acid-500"> DEX</span>
          </h1>
          <p className="text-center font-body text-sm text-slate-500 mt-2">
            {total > 0 ? (
              <span>
                <span className="text-acid-500 font-medium">{total.toLocaleString()}</span> species catalogued
              </span>
            ) : 'Real-world species encyclopedia'}
          </p>
        </div>

        {/* Filters */}
        <SearchFilters onSearch={handleSearch} />

        {/* States */}
        {loading && waking ? (
          <WakeLoader message="Waking up database server..." />
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : animals.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Results info */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-xs text-slate-600 tracking-wider">
                PAGE {filters.page} OF {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-acid-500 rounded-full" />
                <span className="font-body text-xs text-slate-600 tracking-wider">
                  {animals.length} RECORDS
                </span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
              {animals.map((animal, i) => (
                <div
                  key={animal.id}
                  style={{ animationDelay: `${i * 30}ms`, opacity: 0, animation: `fadeIn 0.4s ease ${i * 30}ms forwards` }}
                >
                  <AnimalCard animal={animal} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  )
}
