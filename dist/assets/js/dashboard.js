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

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const user = auth.currentUser;

// // Get docId from URL
// const params = new URLSearchParams(window.location.search);
// const userId = params.get("userId");
// // console.log(userId)

// let userName = document.querySelector(".userName");
// let userEmail = document.querySelector(".userEmail");
// let val_Container = document.querySelector(".validation_message");
// let val_Message_Success = document.querySelector(".validation_message_success");
// let loader = document.getElementById("loaderProfile");
// let userCard = document.getElementById("userCard");
// // check if user ID exists
// if (!userId) {
//     val_Container.classList.add("show");
//     val_Container.scrollIntoView({ behavior: "smooth" });
//     document.querySelector(".message_error").textContent = `${err}`;
//     setTimeout(() => {
//       val_Container.classList.remove("show");
//     }, 7000);
//     window.location.href = "sign_up.html";
// }
// const loadUserData = async () => {
//   onAuthStateChanged(auth, async (user) => {
//     try {
//           loader.style.display = "block";
//       const userDocRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(userDocRef);

//       if (docSnap.exists()) {
//         // console.log(docSnap.data());
//         const mainData = docSnap.data();
//         // console.log(mainData);
//         userName.innerHTML = mainData.user_Name;
//         userEmail.innerHTML = mainData.user_Email;
//       }else{
//             //   console.log(`error creating account: ${err}`);
//             val_Container.classList.add("show");
//             val_Container.scrollIntoView({ behavior: "smooth" });
//             document.querySelector(".message_error").textContent = `${err}`;
//             setTimeout(() => {
//               val_Container.classList.remove("show");
//             }, 7000);
//             window.location.href = "sign_up.html";
//       }
//     } catch (error) {
//       console.error(error);
//       val_Container.classList.add("show");
//       val_Container.scrollIntoView({ behavior: "smooth" });
//       document.querySelector(
//         ".message_error"
//       ).textContent = `Error: Invalid user ID provided`;
//       setTimeout(() => {
//         val_Container.classList.remove("show");
//       }, 4000);
//       window.location.href = "sign_up.html";
//     }finally{
//       loader.style.display = "none";
//       userCard.style.contentVisibility = "visible"
//     }
//   });
// };

// document.addEventListener("DOMContentLoaded", loadUserData)


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// UI elements
let userName = document.querySelector(".userName");
let userEmail = document.querySelector(".userEmail");
let val_Container = document.querySelector(".validation_message");
let signOutModall = document.querySelector(".validation_message_signOut");
let loader = document.getElementById("loaderProfile");
let userCard = document.getElementById("userCard");


// Checks for a valid user
const showErrorAndRedirect = (message) => {
  val_Container.classList.add("show");
  val_Container.scrollIntoView({ behavior: "smooth" });
  document.querySelector(".message_error").textContent = message;

  setTimeout(() => {
    val_Container.classList.remove("show");
    window.location.href = "sign_up.html";
  }, 4000);
};

const loadUserData = () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      showErrorAndRedirect("You must be signed in to access this page.");
      return;
    }

    loader.style.display = "block";

    try {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        // call the function
        showErrorAndRedirect("User record not found.");
        return;
      }

      const mainData = docSnap.data();

      // Populate UI
      userName.textContent = mainData.user_Name;
      userEmail.textContent = mainData.user_Email;

      userCard.style.contentVisibility = "visible";

    } catch (error) {
      console.error(error);
      showErrorAndRedirect(`Error loading user data: ${error}`);
    } finally {
      loader.style.display = "none";
    }
  });
};

document.addEventListener("DOMContentLoaded", loadUserData);

// Log Out
document.getElementById("logOut").addEventListener("click", () => {
  signOut(auth);
  alert("Sign Out Succesful");
        window.location.href = "index.html";
})

// Add an Event Listener to go back
let backNav = document.querySelector(".arrow-back");
backNav.addEventListener("click", () => {
  window.location.href = "sign_up.html";
});

// Navigate to Edit Profile
let editProfileNav = document.getElementById("editProfile");
editProfileNav.addEventListener("click", () => {
  window.location.href = 'edit_profile.html'
})

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 2) {
      header.classList.add("addShadow");
    } else {
      header.classList.remove("addShadow");
    }
  });
});



