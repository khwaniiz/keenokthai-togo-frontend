import firebase from "firebase/app";
import "firebase/auth";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXj2WAb8kgz4ZfzodNiFlgiV3bVW7AVQM",
    authDomain: "keenok-ecommerce-61f09.firebaseapp.com",
    databaseURL: "https://keenok-ecommerce-61f09.firebaseio.com",
    projectId: "keenok-ecommerce-61f09",
    storageBucket: "keenok-ecommerce-61f09.appspot.com",
    messagingSenderId: "408637670853",
    appId: "1:408637670853:web:ae57e27d68c192edaf77ac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // export Firebase
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
