self.addEventListener("install", event => {
  console.log("✅ Service Worker installé");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("🚀 Service Worker activé");
  event.waitUntil(self.clients.claim());
});

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
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
