const CACHE_NAME = 'kepler-v1';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      '/',
      '/IMG',
      '/script.js',
      '/estilo.css',
      '/gps.js'
       // Agregado '/' para que sea una ruta absoluta
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        // Verificar si la solicitud es para un video
        if (event.request.url.endsWith('.mp4')) {
          

          // Intentar obtener el video desde la caché
          const videoCacheResponse = await cache.match('IMG/videoplayback.mp4');

          if (videoCacheResponse) {
            
            return videoCacheResponse;
          }
        }

        if (event.request.url.includes('maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik')) {
          // Intentar obtener la API desde la caché
          const apiCacheResponse = await cache.match(event.request.url);

          if (apiCacheResponse) {
            return apiCacheResponse;
          }
        }
      
        const fetchResponse = await fetch(event.request);

        if (event.request.url.includes('maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik')) {
          cache.put(event.request.url, fetchResponse.clone());
        } else {
          cache.put(event.request, fetchResponse.clone());
        }
        
        //cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
        
      } catch (e) {
        // La red falló
        // Puedes manejar el error de alguna manera
      }
    }
  })());
});