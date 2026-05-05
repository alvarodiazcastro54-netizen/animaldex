import { useState, useEffect, useCallback } from 'react'
import { apiFetch } from '../utils/api'

export function useAnimales({ page = 1, limit = 20, clase = '', nombre = '', familia = '' } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [waking, setWaking] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({ page, limit })
    if (clase) params.set('clase', clase)
    if (nombre) params.set('search', nombre)
    if (familia) params.set('familia', familia)

    const wakeTimer = setTimeout(() => setWaking(true), 5000)

    try {
      const result = await apiFetch(`/animales?${params}`)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      clearTimeout(wakeTimer)
      setWaking(false)
      setLoading(false)
    }
  }, [page, limit, clase, nombre, familia])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, waking, refetch: fetchData }
}

export function useAnimal(id) {
  const [animal, setAnimal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [waking, setWaking] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    setAnimal(null)

    const wakeTimer = setTimeout(() => setWaking(true), 5000)

    apiFetch(`/animales/${id}`)
      .then(setAnimal)
      .catch(err => setError(err.message))
      .finally(() => {
        clearTimeout(wakeTimer)
        setWaking(false)
        setLoading(false)
      })
  }, [id])

  return { animal, loading, error, waking }
}