import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCongBXDDFtoqHaR8EsMtfp9iKjXp0B6xs",
  authDomain: "shuffle-site.firebaseapp.com",
  databaseURL: "https://shuffle-site.firebaseio.com",
  projectId: "shuffle-site",
  storageBucket: "shuffle-site.appspot.com",
  messagingSenderId: "569968582796",
  appId: "1:569968582796:web:682214e9c86e219e5adba9",
  measurementId: "G-YQ2XY25YQD"
};
var fire = firebase.initializeApp(config);
export default fire;
