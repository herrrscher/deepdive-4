const CACHE_NAME = "deepdive-cache-v1";
const urlsToCache = [
  "/",                     
  "/index.html",           
  "/signup.html",          
  "/blackjack.html",       
  "/coinflip.html",        

  // JS
  "/script.js",
  "/sign.js",
  "/blackjack.js",
  "/coinflip.js",

  // CSS
  "/style.css",
  "/blackjack.css",
  "/coin.css",

  // Audio
  "/win.mp3",
  "/lose.mp3",
  "/gameover.mp3",
  "/sound1.mp3",

  // Images
  "/card_background.png",
  "/images/icon-192.png",
  "/images/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
