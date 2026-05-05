export const API_BASE = 'https://animaldex-api-trl4.onrender.com/api/v1'
export const WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary'

// Conservation status labels and colors
export const CONSERVATION_STATUS = {
  EX:  { label: 'Extinct',              short: 'EX', color: '#ff3b5c' },
  EW:  { label: 'Extinct in the Wild',  short: 'EW', color: '#ff5a6e' },
  CR:  { label: 'Critically Endangered',short: 'CR', color: '#ff6b35' },
  EN:  { label: 'Endangered',           short: 'EN', color: '#ffb800' },
  VU:  { label: 'Vulnerable',           short: 'VU', color: '#ffd000' },
  NT:  { label: 'Near Threatened',      short: 'NT', color: '#7dff7d' },
  LC:  { label: 'Least Concern',        short: 'LC', color: '#00ff88' },
  DD:  { label: 'Data Deficient',       short: 'DD', color: '#6b7fff' },
  NE:  { label: 'Not Evaluated',        short: 'NE', color: '#9ca3af' },
}

// Region labels
export const REGIONS = {
  AF: { label: 'Africa',         emoji: '🌍' },
  AS: { label: 'Asia',           emoji: '🌏' },
  EU: { label: 'Europe',         emoji: '🌍' },
  NA: { label: 'North America',  emoji: '🌎' },
  SA: { label: 'South America',  emoji: '🌎' },
  OC: { label: 'Oceania',        emoji: '🌏' },
  AN: { label: 'Antarctica',     emoji: '❄️'  },
  GL: { label: 'Global',         emoji: '🌐' },
}

// Animal class emojis
export const CLASS_EMOJI = {
  // Vertebrados
  Mammalia:             '🦁',
  Aves:                 '🦅',
  Reptilia:             '🦎',
  Amphibia:             '🐸',
  Actinopterygii:       '🐟',
  Chondrichthyes:       '🦈',
  Cephalaspidomorphi:   '🐡', // Lampreas
 
  // Invertebrados marinos
  Malacostraca:         '🦀',
  Gastropoda:           '🐌',
  Bivalvia:             '🦪',
  Cephalopoda:          '🦑',
  Polychaeta:           '🪱', // Gusanos marinos
 
  // Artrópodos terrestres
  Insecta:              '🦋',
  Arachnida:            '🕷️',
  Diplopoda:            '🐛', // Milpiés
  Chilopoda:            '🐛', // Ciempiés
 
  // Otros invertebrados
  Clitellata:           '🪱', // Lombrices
  Echinoidea:           '🦔', // Erizos de mar
  Asteroidea:           '⭐', // Estrellas de mar
  Holothuroidea:        '🥒', // Pepinos de mar
  Hydrozoa:             '🪼', // Medusas
  Anthozoa:             '🪸', // Corales, anémonas
}
 

export function getClassEmoji(clase) {
  return CLASS_EMOJI[clase] || '🐾'
}

export function getStatusInfo(code) {
  return CONSERVATION_STATUS[code] || CONSERVATION_STATUS['NE']
}

export function getRegionInfo(code) {
  return REGIONS[code] || { label: code, emoji: '🌐' }
}

// Fetch with auth header
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('animaldex_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

// Wikipedia image cache
const wikiCache = new Map()

export async function getWikiImage(nombre_cientifico) {
  if (wikiCache.has(nombre_cientifico)) return wikiCache.get(nombre_cientifico)

  try {
    const encoded = encodeURIComponent(nombre_cientifico)
    const res = await fetch(`${WIKI_API}/${encoded}`)
    if (!res.ok) throw new Error('Not found')
    const data = await res.json()
    const url = data?.thumbnail?.source || null
    wikiCache.set(nombre_cientifico, url)
    return url
  } catch {
    wikiCache.set(nombre_cientifico, null)
    return null
  }
}
