//setting up firebase with our website

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCjz946COJObn13CppLSiGcn7cVX_cvwbU",
    authDomain: "auth-form-b5413.firebaseapp.com",
    projectId: "auth-form-b5413",
    storageBucket: "auth-form-b5413.appspot.com",
    messagingSenderId: "252237276692",
    appId: "1:252237276692:web:59adb97b5dbd90b9c62901"
 });
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

//sign up function

const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email,password)
    //firebase code
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in 
    document.write("You are Signed Up")
    console.log(result)
    // ...
  })
  .catch((error) => {
   console.log(error.code);
   console.log(error.message);
    // ..
    window.location.href='main.html'
  });
}

//sign in function

const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //firebase function
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in
    document.write("You are Signed In")
    console.log(result)
    // ...
    window.location.href='main.html'
  })

  .catch((error) => {
    console.log(error.code);
    console.log(error.message);
  });
}