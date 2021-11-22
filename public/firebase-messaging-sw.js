importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
const config = {
  apiKey: "AIzaSyAnLhD6nwpXJT_zrVpD0Dux5Zmac6DiTio",
  authDomain: "istitch-admin.firebaseapp.com",
  projectId: "istitch-admin",
  storageBucket: "istitch-admin.appspot.com",
  messagingSenderId: "29765024023",
  appId: "1:29765024023:web:5e27b4eca7822877c15f52",
  measurementId: "G-3DCJCKR5VY"
};
const msg = firebase.initializeApp(config);

const messaging = msg.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/1.jpg",
    data: {
      url: "https://gi8d3.csb.app"
    }
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
