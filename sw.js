const cacheName = 'golf-sim-v2'; // Change this to v3, v4, etc. to force an update
const assets = [
  'index.html',
  'manifest.json',
  'icon-png.png'
];

// 1. INSTALL: Save the files into the "Vault" (Cache)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return Promise.all(
        assets.map(url => cache.add(url).catch(err => console.log('Failed to cache:', url, err)))
      );
    })
  );
});

// 2. ACTIVATE: Housekeeping - Delete old versions of the cache
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('Cleaning up old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. FETCH: Serve from the "Vault" if offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

