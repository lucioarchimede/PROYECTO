import app from "firebase/app"
import firebase from "firebase";




const firebaseConfig = {
    apiKey: "AIzaSyAa9mSP0Oh8hjrS5_QZyUgxnI9-_Qr4AsA",
    authDomain: "proyecto-50a5e.firebaseapp.com",
    projectId: "proyecto-50a5e",
    storageBucket: "proyecto-50a5e.appspot.com",
    messagingSenderId: "374000419627",
    appId: "1:374000419627:web:d488d1e1acbfb254093b6e"
  };
  
  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()


