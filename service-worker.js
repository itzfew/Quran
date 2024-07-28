// service-worker.js

const CACHE_NAME = 'quran-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/singleSurah.html',
    '/css/style.css',
    '/img/Logo@192x192.ico',
    '/js/single.js',
    '/js/darkMode.js',
    '/js/scrollEfect.js',
    'https://api.alquran.cloud/v1/surah', // Cache API endpoint
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    // Return cached response if available
                    return response;
                }
                // Fetch from the network if not in cache
                return fetch(event.request)
                    .then((networkResponse) => {
                        if (event.request.url.includes('https://api.alquran.cloud/v1/surah')) {
                            // Cache the API response
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        }
                        return networkResponse;
                    });
            })
            .catch(() => {
                // Provide a fallback if both cache and network fail
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Delete outdated caches
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
