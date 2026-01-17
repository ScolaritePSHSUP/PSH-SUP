self.addEventListener('install', () => {
  self.skipWaiting();
});


self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});
