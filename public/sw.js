self.skipWaiting();

self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "New update!", {
      body: data.body || "",
      icon: "/book-heart.svg"
    })
  );
});