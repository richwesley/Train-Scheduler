// JavaScript Document
 var config = {
    apiKey: "AIzaSyBYMFihUe17TqCtwMlnfrW92_MzMBnYNI8",
    authDomain: "embarcadero-station.firebaseapp.com",
    databaseURL: "https://embarcadero-station.firebaseio.com",
    projectId: "embarcadero-station",
    storageBucket: "embarcadero-station.appspot.com",
    messagingSenderId: "379550893268"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var provider = new firebase.auth.GithubAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});