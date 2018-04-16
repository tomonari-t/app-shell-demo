const cacheName = 'app-shell-demo.v1.0.0';
const fileToCacheList = [
  '/mdl.css',
  '/style.css',
  'index.html',
  '/'
];

const addCache = (event) => {
  console.log('SW Insalled');
  event.waitUntil(async (() => {
    console.log('Cached App');
    const cache = await caches.open(cacheName)
    return cache.addAll(fileToCacheList);
  })());
};

const removeOldCache =  (event) => {
  console.log('SW Activated');
  const cacheWhiteList = [cacheName];
  event.waitUntil(async (() => {
    const keys = await cahces.keys();
    return Promise.all(
      keys.map((key) => {
        if (cacheWhiteList.indexOf(key) === -1) {
          return caches.delete(key);
        }
      })
    );
  })());
};

const returnCacheIfExist = (event) => {
  console.log('SW fetching');
  event.respondWith(async (() => {
    const matched = await caches.match(event.request, { ignoreSearch: true });
    return matched || fetch(event.request);
  })());  
};

self.addEventListener('install', addCache);
self.addEventListener('activate',removeOldCache);
self.addEventListener('fetch', returnCacheIfExist);