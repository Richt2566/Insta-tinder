var firebase = require('firebase')

var email;
var pass;

try {
  const credentials = require("./credentials.json");
  email = credentials.email;
  pass = credentials.password;
  console.log("workds");
} catch (err) {
  email = "apiserver@notarealemail.com";
  pass = "PO)(IU*&po09iu87";
}

var config = {
    apiKey: "AIzaSyDJ_vFkzyjF9l69ODzxFrNX-MTbVXmsXC0",
    authDomain: "insta-tinder.firebaseapp.com",
    databaseURL: "https://insta-tinder.firebaseio.com",
    projectId: "insta-tinder",
    storageBucket: "insta-tinder.appspot.com",
    messagingSenderId: "678774773857"
};

let activeGameCodes = [];

firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword(email, pass)
.catch(e => {
    console.log(e);
})
.then((user, failure) =>{
    if(user){
        firebase.database().ref().child('games').on('child_added', snap => {
            activeGameCodes.push(snap.key);
        })

        firebase.database().ref().child('games').on('child_removed', snap => {
            let code = snap.key;
            let index = activeGameCodes.indexOf(code)

            activeGameCodes.splice(index, 1);
        })
    }
    if(failure){
        console.log("failure:", failure)
    }
});


module.exports = {
    firebase: firebase,
}