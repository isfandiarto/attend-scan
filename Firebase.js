import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAbsT5A0qALnYsF2OTUd3eDWzJuzkXLSfU",
    authDomain: "reactnativedb-9b64e.firebaseapp.com",
    databaseURL: "https://reactnativedb-9b64e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactnativedb-9b64e",
    storageBucket: "reactnativedb-9b64e.appspot.com",
    messagingSenderId: "449224205519",
    appId: "1:449224205519:web:ce0163e74cfe13c23803ba",
    measurementId: "G-25SCHHCWJX"
  };
  // Initialize Firebase

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app();
}

export default firebase;