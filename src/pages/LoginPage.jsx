import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const token = data.token || data.access_token || data.jwt
      if (!token) throw new Error('No token received')
      login(token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="ACCESS CONTROL"
      subtitle="Connect to the AnimaldexAPI database"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger font-body text-xs px-4 py-3 rounded-lg tracking-wide">
            ⚠ {error}
          </div>
        )}

        <div>
          <label className="font-body text-xs text-slate-500 tracking-widest block mb-2">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="operator@domain.com"
            className="input-field w-full px-4 py-3 rounded-lg font-body text-sm"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="font-body text-xs text-slate-500 tracking-widest block mb-2">
            PASSWORD
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-field w-full px-4 py-3 rounded-lg font-body text-sm"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-acid-500 text-night-950 font-display font-bold text-sm tracking-widest py-3 rounded-lg hover:bg-acid-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-night-950/30 border-t-night-950 rounded-full animate-spin" />
              AUTHENTICATING...
            </>
          ) : (
            'CONNECT'
          )}
        </button>

        <p className="text-center font-body text-xs text-slate-600">
          No account?{' '}
          <Link to="/register" className="text-acid-500 hover:text-acid-400 transition-colors">
            Register here
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-night-950 bg-grid flex items-center justify-center px-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-acid-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <span className="text-4xl">🦎</span>
            <span
              className="font-display text-2xl font-bold text-acid-500 tracking-[0.2em]"
            >
              ANIMALDEX
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-night-800 border border-night-700 rounded-2xl p-8 scan-line relative overflow-hidden">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-acid-500/30 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-acid-500/30 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-acid-500/30 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-acid-500/30 rounded-br-2xl" />

          <h1 className="font-display text-xl font-bold text-white tracking-widest mb-1">{title}</h1>
          <p className="font-body text-xs text-slate-500 mb-6">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  )
}
