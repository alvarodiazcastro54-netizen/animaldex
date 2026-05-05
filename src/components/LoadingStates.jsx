import React from 'react'

export function WakeLoader({ message = 'Initializing database...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      {/* Radar animation */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-2 border-acid-500/20 rounded-full" />
        <div className="absolute inset-2 border border-acid-500/30 rounded-full" />
        <div className="absolute inset-4 border border-acid-500/40 rounded-full" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 270deg, #00ff8820 360deg)',
            animation: 'spin 2s linear infinite',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-acid-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="text-center">
        <p className="font-body text-acid-500 text-sm tracking-widest uppercase mb-2 animate-pulse">
          {message}
        </p>
        <p className="font-body text-xs text-slate-600">
          Server may take 30-60 seconds to wake up from sleep mode
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-night-700 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-acid-500"
          style={{ animation: 'progressIndeterminate 2s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes progressIndeterminate {
          0% { left: -50%; width: 50%; }
          100% { left: 100%; width: 50%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-night-800 border border-night-700 rounded-xl overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-6 w-24 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <div className="relative">
        <div className="text-6xl grayscale opacity-40">⚠️</div>
      </div>
      <div className="text-center">
        <p className="font-display text-xl text-danger tracking-wider mb-2">CONNECTION FAILED</p>
        <p className="font-body text-sm text-slate-500 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="font-body text-xs border border-acid-500/40 text-acid-500 hover:bg-acid-500/10 px-6 py-2 rounded tracking-widest transition-all duration-200"
        >
          RETRY CONNECTION
        </button>
      )}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <span className="text-5xl opacity-30">🔍</span>
      <p className="font-display text-lg text-slate-500 tracking-wider">NO RECORDS FOUND</p>
      <p className="font-body text-sm text-slate-600">Try adjusting your search filters</p>
    </div>
  )
}
