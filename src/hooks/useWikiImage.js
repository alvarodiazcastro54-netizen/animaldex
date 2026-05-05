import { useState, useEffect } from 'react'
import { getWikiImage } from '../utils/api'


function limpiarNombreCientifico(nombre) {
  if (!nombre) return nombre
  return nombre.replace(/\s*\(.*\)$/, '').trim()
}

export function useWikiImage(nombre_cientifico) {
  const [imgUrl, setImgUrl] = useState(undefined) // undefined = loading

  useEffect(() => {
    if (!nombre_cientifico) {
      setImgUrl(null)
      return
    }

    const nombreLimpio = limpiarNombreCientifico(nombre_cientifico)

    getWikiImage(nombreLimpio).then(url => setImgUrl(url))
  }, [nombre_cientifico])

  return imgUrl
}