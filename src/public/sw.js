const cacheName = "cache-v3";

const precacheResources = [
  "./",
  "index.html",
  "assets/index.js",
  "assets/index.css",
  "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css",
  "https://cdn.jsdelivr.net/gh/WebCoder49/code-input@1.2/code-input.min.js",
  "https://cdn.jsdelivr.net/gh/WebCoder49/code-input@1.2/code-input.min.css",
  "https://cdn.jsdelivr.net/gh/WebCoder49/code-input@1.2/plugins/prism-line-numbers.min.css",
  "https://cdn.jsdelivr.net/gh/WebCoder49/code-input@1.2/plugins/indent.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js",
  "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.css",
  "manifest.json",
  "clear.svg",
  "run.svg",
  "copy.svg",
  "icons/icon-72x72.png",
  "icons/icon-96x96.png",
  "icons/icon-128x128.png",
  "icons/icon-144x144.png",
  "icons/icon-152x152.png",
  "icons/icon-192x192.png",
  "icons/icon-384x384.png",
  "icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  // console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", (event) => {
  // console.log("Service worker activate event!");

  let cacheKeeplist = [cacheName];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
