const cacheName = 'app-shell-demo.v1.0.0';
const fileToCacheList = [
  '/mdl.css',
  '/style.css',
  'index.html',
  '/'
];

const addCache = (event) => {
  console.log('SW Insalled');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Cached App');
      return cache.addAll(fileToCacheList);
    })
  );
};

const removeOldCache =  (event) => {
  console.log('SW Activated');
  const cacheWhiteList = [cacheName];
  event.waitUntil(
      caches.keys().then((cachedkeys) => {
          return Promise.all(
            cachedkeys.map((key) => {
                  if (cacheWhiteList.indexOf(key) === -1) {
                      return caches.delete(key);
                  }
              })
          );
      })
  );
};

const returnCacheIfExist = (event) => {
  console.log('SW fetching');
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((res) => {
      return res || fetch(event.request);
    })
  );
};

self.addEventListener('install', addCache);
self.addEventListener('activate',removeOldCache);
self.addEventListener('fetch', returnCacheIfExist);