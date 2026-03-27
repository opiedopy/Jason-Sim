const cacheName = 'golf-sim-v2'; // Incremented version
const assets = [
  'index.html',
  'manifest.json',
  'icon-png.png' // Added your icon to the cache list
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // We add each asset individually to prevent one failure from breaking the whole cache
      return Promise.all(
        assets.map(url => cache.add(url).catch(err => console.log('Failed to cache:', url, err)))
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

