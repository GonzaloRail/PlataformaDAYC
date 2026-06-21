const CACHE_NAME = 'dayc2-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

const API_CACHE_NAME = 'dayc2-api-v1';
const API_CACHE_DURATION = 5 * 60 * 1000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== API_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});

async function handleApiRequest(request: Request): Promise<Response> {
  const cache = await caches.open(API_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    const cachedTime = cachedResponse.headers.get('x-cached-time');
    if (cachedTime && Date.now() - parseInt(cachedTime) < API_CACHE_DURATION) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      const headers = new Headers(responseClone.headers);
      headers.set('x-cached-time', Date.now().toString());
      
      const body = await responseClone.blob();
      const cachedResponse = new Response(body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers,
      });

      cache.put(request, cachedResponse);
    }

    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response(
      JSON.stringify({ error: 'Offline', message: 'No hay conexión a internet' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});