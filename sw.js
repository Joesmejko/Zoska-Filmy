self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/Styles/style.css',
        '/Styles/style2.css',
        '/Styles/style3.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.type === 'color-changed') {
    var newColor = event.data.color;
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        caches.open(cacheName).then(function(cache) {
          cache.matchAll().then(function(matches) {
            matches.forEach(function(match) {
              if (match.url.includes('/Styles/') && match.url.endsWith('.css')) {
                match.text().then(function(text) {
                  var newText = text.replace(/var\(--blue\)/g, newColor);
                  var newResponse = new Response(newText, {
                    headers: { 'Content-Type': 'text/css' }
                  });
                  cache.put(match.url, newResponse);
                });
              }
            });
          });
        });
      });
    });
  }
});
