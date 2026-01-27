/* sw-public.js — PSH SUP PUBLIC */

const CACHE_NAME = "psh-public-v1";

self.addEventListener("install", (event) => {
  console.log("✅ SW PUBLIC installé");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("🚀 SW PUBLIC activé");
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
      await self.clients.claim();
    })()
  );
});

/* ✅ NETWORK ONLY (pas de cache HTML/JS) */
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});

/* ===== PUSH PUBLIC ===== */
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try { data = event.data.json(); }
    catch { data = { body: event.data.text() }; }
  }

  const title = data.title || "PSH SUP";
  const url = data.url || "/PSH-SUP/public/index.html";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/PSH-SUP/icons/icon-192.png",
      badge: "/PSH-SUP/icons/icon-192.png",
      data: { url }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data.url;

  eve
