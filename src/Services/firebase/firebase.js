import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyAnLhD6nwpXJT_zrVpD0Dux5Zmac6DiTio",
  authDomain: "istitch-admin.firebaseapp.com",
  projectId: "istitch-admin",
  storageBucket: "istitch-admin.appspot.com",
  messagingSenderId: "29765024023",
  appId: "1:29765024023:web:5e27b4eca7822877c15f52",
  measurementId: "G-3DCJCKR5VY"
};

const tailorApp = firebase.initializeApp(config);
const messaging = tailorApp.messaging();
const publicKey =
  "BOsxw5cAkKUoUPC0JKAsoPSISGC3BjU3OhkJnuekkzTMAhXM_xayRKhvbfTdI8F76gwjrqkxxHGRwPjM__nLIpk";

export const getToken = async (setTokenFound) => {
  let currentToken = "";
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    console.log("Current Token", currentToken);
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token.", error);
  }
  return currentToken;
};

// getToken();

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export default firebase;
