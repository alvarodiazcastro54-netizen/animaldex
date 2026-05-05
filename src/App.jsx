import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AnimalDetailPage from './pages/AnimalDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CreateAnimalPage from './pages/CreateAnimalPage'
import EditAnimalPage from './pages/EditAnimalPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"                element={<HomePage />} />
          <Route path="/animal/new"      element={<CreateAnimalPage />} />
          <Route path="/animal/:id"      element={<AnimalDetailPage />} />
          <Route path="/animal/:id/edit" element={<EditAnimalPage />} />
          <Route path="/login"           element={<LoginPage />} />
          <Route path="/register"        element={<RegisterPage />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-night-950 flex flex-col items-center justify-center gap-6 px-4">
      <span className="text-6xl opacity-30">404</span>
      <p className="font-display text-2xl text-slate-500 tracking-widest">RECORD NOT FOUND</p>
      <a href="/" className="font-body text-xs text-acid-500 border border-acid-500/30 px-6 py-2 rounded tracking-widest hover:bg-acid-500/10 transition-colors">
        RETURN TO DATABASE
      </a>
    </div>
  )
}