const cacheName = 'app-shell-demo';
const fileToCacheList = [
  '/mdl.css',
  '/style.css',
  '/'
];

self.addEventListener('install', (e) => {
  console.log('SW Insalled');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Cached App');
      return cache.addAll(fileToCacheList);
    })
  );
});