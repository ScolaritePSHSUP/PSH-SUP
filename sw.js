const CACHE_NAME = "psh-admin-v3";

self.addEventListener("install", event => {
  console.log("✅ Service Worker installé");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("🚀 Service Worker activé");

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      )
    )
  );

  self.clients.claim();
});

/* ⚠️ PAS DE CACHE POUR LE JS / HTML */
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

/* ===== PUSH ===== */
self.addEventListener("push", event => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || "PSH SUP";
  const options = {
    body: data.body || "",
    icon: "/PSH-SUP/icons/icon-192.png",
    badge: "/PSH-SUP/icons/icon-192.png",
    data: {
      url: data.url || "/PSH-SUP/index.html"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (const cli
	  
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
