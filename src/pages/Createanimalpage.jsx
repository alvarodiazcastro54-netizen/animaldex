import React from 'react'
import { Link } from 'react-router-dom'
import AnimalForm from '../components/AnimalForm'

export default function CreateAnimalPage() {
  return (
    <div className="min-h-screen bg-night-950 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 font-body text-xs text-slate-500 hover:text-acid-500 tracking-widest transition-colors group mb-6 block">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          VOLVER
        </Link>

        <div className="bg-night-800 border border-night-700 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-acid-500 rounded-full" />
            <h1 className="font-display text-2xl font-bold text-white tracking-wider">NUEVO ANIMAL</h1>
          </div>
          <AnimalForm />
        </div>
      </div>
    </div>
  )
}