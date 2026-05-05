import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuth, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-night-900/95 backdrop-blur-md border-b border-acid-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-acid-500/20 rounded-lg group-hover:bg-acid-500/30 transition-colors" />
            <span className="text-lg relative z-10">🦎</span>
          </div>
          <div>
            <span
              className="font-display text-xl font-bold tracking-widest text-acid-500 glitch"
              style={{ letterSpacing: '0.15em' }}
            >
              ANIMALDEX
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" active={location.pathname === '/'}>
            DATABASE
          </NavLink>
          {isAuth ? (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link
                  to="/animal/new"
                  className="font-body text-xs bg-acid-500/10 border border-acid-500/40 text-acid-500 hover:bg-acid-500/20 px-4 py-2 rounded transition-all duration-200 tracking-wider"
                >
                  + CREAR
                </Link>
              )}
              <span className="font-body text-xs text-acid-500/70">
                {user?.email || user?.username || 'OPERATOR'}
              </span>
              <button
                onClick={handleLogout}
                className="font-body text-xs text-night-600 border border-night-600 hover:border-danger hover:text-danger px-4 py-2 rounded transition-all duration-200 tracking-wider"
              >
                DISCONNECT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="font-body text-xs text-slate-400 hover:text-acid-500 transition-colors tracking-wider"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="font-body text-xs bg-acid-500 text-night-950 px-4 py-2 rounded hover:bg-acid-400 transition-colors font-medium tracking-wider"
              >
                REGISTER
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-acid-500 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-night-900/98 border-b border-acid-500/10 px-4 py-4 flex flex-col gap-4">
          <Link
            to="/"
            className="font-body text-sm text-slate-300 tracking-wider"
            onClick={() => setMenuOpen(false)}
          >
            DATABASE
          </Link>
          {isAuth ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false) }}
              className="text-left font-body text-sm text-danger tracking-wider"
            >
              DISCONNECT
            </button>
          ) : (
            <>
              <Link to="/login" className="font-body text-sm text-slate-300 tracking-wider" onClick={() => setMenuOpen(false)}>LOGIN</Link>
              <Link to="/register" className="font-body text-sm text-acid-500 tracking-wider" onClick={() => setMenuOpen(false)}>REGISTER</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`font-body text-xs tracking-widest transition-colors duration-200 ${
        active ? 'text-acid-500' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {children}
      {active && (
        <div className="h-px bg-acid-500 mt-1" />
      )}
    </Link>
  )
}