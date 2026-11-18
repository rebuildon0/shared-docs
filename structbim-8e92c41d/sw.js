// Network-first: online users always get the newest app; offline falls back to the last cached copy.
const CACHE = "sbim-20261118085943";
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  e.respondWith((async () => {
    try {
      const res = await fetch(e.request, { cache: "no-cache" });
      if (res.ok) (await caches.open(CACHE)).put(e.request, res.clone());
      return res;
    } catch { return (await caches.match(e.request)) || Response.error(); }
  })());
});
