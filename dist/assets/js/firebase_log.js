// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

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

const formLogIn = document.getElementById("signInForm");
let val_Container = document.querySelector(".validation_message");
let val_Message_Success = document.querySelector(".validation_message_success");

formLogIn.addEventListener("submit", async(e) => {
    e.preventDefault()
    const userObject = new FormData(formLogIn);
    const userEmail = userObject.get("user_Email");
    const userPassword = userObject.get("user_Password")
    // const data = Object.fromEntries(userObject);
    try {
          const submitBtn = document.getElementById("logInButton");
          submitBtn.disabled = true;
          submitBtn.textContent = "Signing in....";
          submitBtn.style.cursor = "not-allowed";
          submitBtn.style.opacity = ".5";  
      const userDetails = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      const user = userDetails.user;
    //   console.log(user);
      const userId = user.uid;

      // Show Pop up
      val_Message_Success.classList.add("showMessage");
      val_Message_Success.scrollIntoView({ behavior: "smooth" });
      document.querySelector(
        ".message_success"
      ).textContent = `Sign in successful`;
      setTimeout(() => {
        val_Message_Success.classList.remove("showMessage");
        window.location.href = `dashboard.html?userId=${encodeURIComponent(
          userId
        )}`;
      }, 4000);
    } catch (err) {
        //   console.log(`error creating account: ${err}`);
          val_Container.classList.add("show");
          val_Container.scrollIntoView({ behavior: "smooth" });
          document.querySelector(".message_error").textContent = `${err}`;
          setTimeout(() => {
            val_Container.classList.remove("show");
          }, 7000);
    }finally{
        const submitBtn = document.getElementById("logInButton");
        submitBtn.disabled = false;
      submitBtn.textContent = "Sign In";
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    }
})