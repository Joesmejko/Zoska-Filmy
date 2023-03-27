const CACHE_NAME = 'my-website-cache-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/settings.html',
  '/Styles/style.css',
  '/Styles/style2.css',
  '/Styles/style3.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return response;
          });
      })
  );
});

function changeColor(color) {
  document.documentElement.style.setProperty('--blue', color);
  caches.open(CACHE_NAME).then(cache => {
    cache.keys().then(keys => {
      keys.forEach(key => {
        cache.match(key).then(res => {
          if (res && res.headers.get('content-type') === 'text/css') {
            res.text().then(cssText => {
              const updatedCssText = cssText.replace(/--blue:.*;/g, `--blue:${color};`);
              cache.put(key, new Response(updatedCssText, {
                headers: res.headers
              }));
            });
          }
        });
      });
    });
  });
}