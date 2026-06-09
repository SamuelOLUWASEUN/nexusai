// Nexus AI Service Worker
// Handles caching, offline support and push notifications

const CACHE_NAME = "nexusai-v1";
const STATIC_CACHE = "nexusai-static-v1";

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/dashboard",
  "/offline",
  "/manifest.json",
];

// ── Install ────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn("Precache failed for some assets:", err);
      });
    })
  );
  self.skipWaiting();
});

// ── Activate ───────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch Strategy ─────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and API routes
  if (request.method !== "GET") return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/")) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      // Return cached version if available
      if (cached) return cached;

      // Otherwise fetch from network
      return fetch(request)
        .then((response) => {
          // Cache successful responses for static assets
          if (
            response.ok &&
            (url.pathname.startsWith("/_next/static/") ||
              url.pathname.endsWith(".png") ||
              url.pathname.endsWith(".jpg") ||
              url.pathname.endsWith(".svg") ||
              url.pathname.endsWith(".ico"))
          ) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/offline") || caches.match("/");
          }
        });
    })
  );
});

// ── Push Notifications ─────────────────────────────────────────────
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body:    data.body    || "You have a new notification from Nexus AI",
    icon:    "/icons/icon-192.png",
    badge:   "/icons/icon-72.png",
    tag:     data.tag     || "nexusai-notification",
    renotify: true,
    data:    { url: data.url || "/dashboard" },
    actions: [
      { action: "open",    title: "Open Nexus" },
      { action: "dismiss", title: "Dismiss"    },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Nexus AI", options)
  );
});

// ── Notification Click ─────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "dismiss") return;

  const url = event.notification.data?.url || "/dashboard";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if open
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// ── Background Sync ────────────────────────────────────────────────
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-messages") {
    event.waitUntil(syncPendingMessages());
  }
});

async function syncPendingMessages() {
  // Sync any messages queued while offline
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();
  return Promise.all(
    requests
      .filter((req) => req.url.includes("/api/"))
      .map((req) => fetch(req).then(() => cache.delete(req)))
  );
}
