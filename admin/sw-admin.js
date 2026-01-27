/* sw-admin.js — PSH SUP ADMIN */

const CACHE_NAME = "psh-admin-v1";

self.addEventListener("install", (event) => {
  console.log("✅ SW ADMIN installé");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("🚀 SW ADMIN activé");
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

/* ===== PUSH ADMIN ===== */
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try { data = event.data.json(); }
    catch { data = { body: event.data.text() }; }
  }

  const title = data.title || "PSH SUP – Admin";
  const url = data.url || "/PSH-SUP/admin/admin.html";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/PSH-SUP/icons/admin/icon-192.png",
      badge: "/PSH-SUP/icons/admin/icon-192.png",
      data: { url }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(list => {
        for (const client of list) {
          if (client.url.includes(url)) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(url);
      })
  );
});
