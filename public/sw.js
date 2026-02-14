self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "New update!", {
      body: data.body || "",
      icon: "/vercel.svg"
    })
  );
});

//Public Key: BEULt2VKV1NpA-W0HcI4r4HzE9r6Odz6-FA7Vzt2ZpJHuOm565zB6_5h6qK-9NDzRwD4h9xx5_NhcFKULsjBT8I

//Private Key: pTfCbLt8MLuTHaHmcg76kPwtfJ0jBMpaFZ6QJy6FHY4