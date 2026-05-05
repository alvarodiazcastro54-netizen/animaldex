import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('animaldex_token'))

  useEffect(() => {
    if (token) {
      // Decode JWT payload (no verify, just read)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser(payload)
      } catch {
        logout()
      }
    }
  }, [token])

  function login(newToken) {
    localStorage.setItem('animaldex_token', newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem('animaldex_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
