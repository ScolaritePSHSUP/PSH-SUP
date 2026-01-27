/* sw.js — PSH SUP ADMIN
   - Pas de cache HTML/JS (toujours network)
   - Nettoyage des anciens caches
   - Push + click notification OK
*/

const CACHE_NAME = "psh-admin-v4"; // ⬅️ incrémente à chaque grosse modif

self.addEventListener("install", (event) => {
  console.log("✅ Service Worker installé");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activé");

  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
      await self.clients.claim();
    })()
  );
});

/* ✅ NETWORK ONLY : pas de cache pour HTML/JS/CSS */
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});

/* ===== PUSH ===== */
self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || "PSH SUP";
  const url =
    (data.url && typeof data.url === "string" && data.url) ||
    "/PSH-SUP/index.html";

  const options = {
    body: data.body || "",
    icon: "/PSH-SUP/icons/icon-192.png",
    badge: "/PSH-SUP/icons/icon-192.png",
    data: { url },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/* ✅ CLICK NOTIF : ouvre l’URL (ou focus si déjà ouverte) */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    (event.notification.data && event.notification.data.url) ||
    "/PSH-SUP/index.html";

  event.waitUntil(
    (async () => {
      const clientList = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of clientList) {
        // Si déjà ouvert, focus
        if ("focus" in client && client.url && client.url.includes(url)) {
          return client.focus();
        }
      }

      // Sinon ouvre une nouvelle fenêtre
      if (clients.openWindow) return clients.openWindow(url);
    })()
  );
});
