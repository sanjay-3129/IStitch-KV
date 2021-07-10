import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAnLhD6nwpXJT_zrVpD0Dux5Zmac6DiTio",
  authDomain: "istitch-admin.firebaseapp.com",
  projectId: "istitch-admin",
  storageBucket: "istitch-admin.appspot.com",
  messagingSenderId: "29765024023",
  appId: "1:29765024023:web:5e27b4eca7822877c15f52",
  measurementId: "G-3DCJCKR5VY"
};

firebase.initializeApp(config);
export default firebase;
