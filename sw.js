/* PA Deck service worker */
var CACHE = "padeck-v4";
var CORE = ["./", "./index.html", "./manifest.json"];
var ICONS = ["./icon-192.png", "./icon-512.png", "./icon-512-maskable.png", "./apple-touch-icon-180.png", "./favicon.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Core must succeed; icons are user-provided and cached best-effort so a
      // missing icon never blocks install.
      return c.addAll(CORE).then(function () {
        return Promise.all(ICONS.map(function (u) {
          return c.add(u).catch(function () {});
        }));
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  // Leave cross-origin requests (Open-Meteo weather + geocoding) to the browser:
  // never cache them, always live, and they simply fail gracefully when offline.
  if (new URL(req.url).origin !== self.location.origin) return;

  // Page navigations: network-first so a redeploy shows up on reload; fall back to cache offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put("./index.html", copy); });
        return res;
      }).catch(function () {
        return caches.match("./index.html").then(function (r) { return r || caches.match("./"); });
      })
    );
    return;
  }

  // Other assets: cache-first, then network (and cache the result).
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () { return hit; });
    })
  );
});
