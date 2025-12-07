const CACHE_NAME = "laksh-portfolio-v2"; // Increment this manually when you deploy!
const urlsToCache = ["/", "/index.html", "/favicon.png", "/manifest.json"];

// 1. INSTALL: Cache critical assets and force activation
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Forces this SW to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. ACTIVATE: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of open clients immediately
});

// 3. FETCH: Smart Strategy
self.addEventListener("fetch", (event) => {
  // Ignore API calls or non-GET requests
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  // STRATEGY: Network First for HTML (Navigation)
  // This ensures the user ALWAYS gets the latest index.html with new JS hashes
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update cache with the new page
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // If offline, return cached index.html
          return caches.match('/index.html');
        })
    );
    return;
  }

  // STRATEGY: Cache First for Assets (JS, CSS, Images)
  // Vite assets are hashed, so if they exist in cache, they are valid.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});