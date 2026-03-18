const CACHE_NAME = 'mitrava-v1'

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
]

// Install — cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
  // Skip non-GET and browser-extension requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache a copy of fresh responses
        const copy = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
        return response
      })
      .catch(() => caches.match(event.request))
  )
})
