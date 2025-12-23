

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
//   TODO: Add SDKs for Firebase products that you want to use
  import {
    getFirestore,
    addDoc,
    collection,
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


  let docId = null;
// Validate Sign In Form
const formSignUp = document.getElementById("signUpForm");
let val_Container = document.querySelector(".validation_message");
let val_Message_Success = document.querySelector(".validation_message_success");
// console.log(val_Message_Success)
formSignUp.addEventListener("submit", async(e) => {
    e.preventDefault();
    try {
     const submitBtn = document.getElementById("signButton");
    submitBtn.disabled = true;
    submitBtn.textContent = "Signing up....";
    submitBtn.style.opacity = ".5"    
      const userData = new FormData(formSignUp);
      // console.log(userData.get('user_Email'));
      const data = userData.forEach((value, key) => {
        userData[key] = value;
      });
      // Create a db with name 'users' and store the object in firebase
      const usersRef = await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: serverTimestamp(),
      });
      // console.log(userData);

      // Store doc Id for later redirect to dashboard
       docId = usersRef.id;

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
      submitBtn.style.opacity = "1"
    }
  
});
