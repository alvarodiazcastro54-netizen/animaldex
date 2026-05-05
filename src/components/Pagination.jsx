import React from 'react'

export default function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null

  const pages = []
  const delta = 2
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <PageBtn onClick={() => onChange(page - 1)} disabled={page <= 1}>
        ← PREV
      </PageBtn>

      {pages[0] > 1 && (
        <>
          <PageBtn onClick={() => onChange(1)} active={page === 1}>1</PageBtn>
          {pages[0] > 2 && <span className="font-body text-xs text-slate-600 px-1">···</span>}
        </>
      )}

      {pages.map(p => (
        <PageBtn key={p} onClick={() => onChange(p)} active={p === page}>
          {p}
        </PageBtn>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="font-body text-xs text-slate-600 px-1">···</span>
          )}
          <PageBtn onClick={() => onChange(totalPages)} active={page === totalPages}>
            {totalPages}
          </PageBtn>
        </>
      )}

      <PageBtn onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
        NEXT →
      </PageBtn>
    </div>
  )
}

function PageBtn({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-body text-xs px-3 py-2 rounded border tracking-widest transition-all duration-200 ${
        active
          ? 'bg-acid-500 text-night-950 border-acid-500 font-medium'
          : disabled
          ? 'text-slate-700 border-night-700 cursor-not-allowed'
          : 'text-slate-400 border-night-600 hover:border-acid-500/40 hover:text-acid-500'
      }`}
    >
      {children}
    </button>
  )
}
