

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
          import {
            getAuth,
            signInWithEmailAndPassword,
            createUserWithEmailAndPassword,
            signOut,
            onAuthStateChanged,
            GithubAuthProvider,
            signInWithPopup,
          } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

//   TODO: Add SDKs for Firebase products that you want to use
  import {
    getFirestore,
    doc, 
    setDoc,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCH4WUAFh_lFzr-1EbT7q6O3E1YdA3J9Pc",
    authDomain: "zapapp-20e61.firebaseapp.com",
    projectId: "zapapp-20e61",
    storageBucket: "zapapp-20e61.firebasestorage.app",
    messagingSenderId: "224834702964",
    appId: "1:224834702964:web:a4f370dfe8e38336b44b21",
    measurementId: "G-9M34RWPZ11"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);


  let docId = null;
// Validate Sign In Form
const formSignUp = document.getElementById("signUpForm");
let val_Container = document.querySelector(".validation_message");
let val_Message_Success = document.querySelector(".validation_message_success");
// console.log(val_Message_Success)
formSignUp.addEventListener("submit", async(e) => {
    e.preventDefault();

      const userData = new FormData(formSignUp);
      const email = userData.get("user_Email");
      const password = userData.get("user_Password");

    try {
     const submitBtn = document.getElementById("signButton");
    submitBtn.disabled = true;
    submitBtn.textContent = "Signing up....";
    submitBtn.style.cursor = "not-allowed";
    submitBtn.style.opacity = ".5"    
      // console.log(userData.get('user_Email'));
      // const data = userData.forEach((value, key) => {
      //   userData[key] = value;
      // });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Create a db with name 'users' and store sensitive data in firebase
      const usersRef = await setDoc(doc(db, "users", user.uid), {
        user_Name: userData.get("user_Name"),
        user_Email: userData.get("user_Email"),
        createdAt: serverTimestamp(),
      });
      console.log(`User Created: ${user.uid}`);
      // console.log(user);

      // Store userId Id for later redirect to dashboard
       docId = user.uid;

      // Show Pop up
      val_Message_Success.classList.add("showMessage");
      val_Message_Success.scrollIntoView({behavior: "smooth"});
      document.querySelector(".message_success").textContent = `Sign up successful`
      setTimeout(() => {
          val_Message_Success.classList.remove("showMessage");
          window.location.href = `dashboard.html?userId=${encodeURIComponent(
            docId
          )}`
      }, 4000)
    } catch (error) {
        console.log(`error creating account: ${error}`);
        val_Container.classList.add("show");
        val_Container.scrollIntoView({ behavior: "smooth" });
        document.querySelector(".message_error").textContent = `${error}`;
        setTimeout(() => {
          val_Container.classList.remove("show")
        }, 7000)
    }finally{
      const submitBtn = document.getElementById("signButton");
      submitBtn.disabled = false;
      submitBtn.textContent = "Sign Up";
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    }
  
});

// Sign in with GitHub
// import { GithubAuthProvider } from "firebase/auth";

const provider = new GithubAuthProvider();
// import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

document.getElementById("apple").addEventListener("click", () => {
  // const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token)
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      console.log(email)
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      console.log(error)
    });
});
