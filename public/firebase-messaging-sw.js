importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBBLF_gafrkZj4g48plkDPf5qQXdIBHJic",
  authDomain: "toon-tracker-7db76.firebaseapp.com",
  projectId: "toon-tracker-7db76",
  messagingSenderId: "520010817645",
  appId: "1:520010817645:web:63692ef8c585f8b2559f64",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/book-heart.svg",
  });
});
