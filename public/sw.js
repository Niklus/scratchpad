const cacheName = "cache-v1";

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
