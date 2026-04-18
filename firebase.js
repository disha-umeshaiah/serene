const firebaseConfig = {
  apiKey: "AIzaSyDqacIc-S_goPPlDt0H5HSE4Lc5PNjrJaU",
  authDomain: "serene-492c5.firebaseapp.com",
  projectId: "serene-492c5",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp(){
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(()=>alert("Signed up"))
    .catch(e=>alert(e.message));
}

function login(){
  auth.signInWithEmailAndPassword(email.value, password.value)
    .then(()=>{
      alert("Logged in");
      document.getElementById("authBox").classList.add("hidden");
    })
    .catch(e=>alert(e.message));
}



