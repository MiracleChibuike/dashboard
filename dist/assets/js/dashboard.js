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

//   TODO: Add SDKs for Firebase products that you want to use
import {
  getFirestore,
  doc,
  getDoc,
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
  measurementId: "G-9M34RWPZ11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const user = auth.currentUser;

// Get docId from URL
const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
console.log(userId)


let val_Container = document.querySelector(".validation_message");
let val_Message_Success = document.querySelector(".validation_message_success");
if (!userId) {
  //   console.log(`error creating account: ${err}`);
  val_Container.classList.add("show");
  val_Container.scrollIntoView({ behavior: "smooth" });
  document.querySelector(".message_error").textContent = `${err}`;
  setTimeout(() => {
    val_Container.classList.remove("show");
  }, 7000);
  window.location.href = "sign_up.html"
}
const loadUserData = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
      }
    } catch (error) {
      console.error(error);
    }
  });
};

document.addEventListener("DOMContentLoaded", loadUserData)
