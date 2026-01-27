/* sw-public.js — PSH SUP PUBLIC */

const CACHE_NAME = "psh-public-v1";

self.addEventListener("install", event => {
  console.log("✅ SW public installé");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("🚀 SW public activé");
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

/* Network only */
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

/* PUSH */
self.addEventListener("push", event => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || "PSH SUP";
  const options = {
    body: data.body || "",
    icon: "/PSH-SUP/public/icons/icon-192.png",
    badge: "/PSH-SUP/public/icons/icon-192.png",
    data: { url: "/PSH-SUP/public/index.html" }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "/PSH-SUP/public/index.html";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes(url)) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});
