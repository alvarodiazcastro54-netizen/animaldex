import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { AuthLayout } from './LoginPage'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      // Auto-login if token returned, otherwise redirect to login
      const token = data.token || data.access_token
      if (token) {
        login(token)
        navigate('/')
      } else {
        setSuccess(true)
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="NEW OPERATOR"
      subtitle="Create your AnimaldexAPI account"
    >
      {success ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-4">✓</div>
          <p className="font-display text-acid-500 tracking-wider">ACCOUNT CREATED</p>
          <p className="font-body text-xs text-slate-500 mt-2">Redirecting to login...</p>
        </div>
      ) : (
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
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="input-field w-full px-4 py-3 rounded-lg font-body text-sm"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="font-body text-xs text-slate-500 tracking-widest block mb-2">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Repeat password"
              className={`input-field w-full px-4 py-3 rounded-lg font-body text-sm ${
                confirm && confirm !== password ? 'border-danger/50' : ''
              }`}
              autoComplete="new-password"
            />
            {confirm && confirm !== password && (
              <p className="font-body text-xs text-danger mt-1">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || (!!confirm && confirm !== password)}
            className="w-full bg-acid-500 text-night-950 font-display font-bold text-sm tracking-widest py-3 rounded-lg hover:bg-acid-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-night-950/30 border-t-night-950 rounded-full animate-spin" />
                CREATING...
              </>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>

          <p className="text-center font-body text-xs text-slate-600">
            Already registered?{' '}
            <Link to="/login" className="text-acid-500 hover:text-acid-400 transition-colors">
              Login here
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
