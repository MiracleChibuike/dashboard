// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

//   TODO: Add SDKs for Firebase products that you want to use
import {
  getFirestore,
  doc,
  serverTimestamp,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
// Firebase Storage for Images
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH4WUAFh_lFzr-1EbT7q6O3E1YdA3J9Pc",
  authDomain: "zapapp-20e61.firebaseapp.com",
  projectId: "zapapp-20e61",
  storageBucket: "zapapp-20e61.appspot.com",
  messagingSenderId: "224834702964",
  appId: "1:224834702964:web:a4f370dfe8e38336b44b21",
  measurementId: "G-9M34RWPZ11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
let currentUser = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    // console.log("Auth ready:", user.uid);
  } else {
    console.log("No user logged in");
  }
});

// Load Home - Dashboard
let homeButton = document.getElementById("homeBase");
homeButton.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

// Make a simple fetch call
let countrySelect = document.getElementById("countrySelect");
const fetchCountries = async () => {
  try {
    const response = await fetch(`https://api.first.org/data/v1/countries`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    // Catch success
    const result = await response.json();
    const value = result.data;
    // console.log(value);
    // Convert to an Object
    Object.entries(value).forEach(([code, data]) => {
      countrySelect.innerHTML += `
            <option value="${data.country}">${data.country}</option>
            `;
    });
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener("DOMContentLoaded", fetchCountries);

// Fetch Country Codes
let userPhoneSelect = document.getElementById("phoneNumberSelect");
const fetchCountryCodes = async () => {
  try {
    const apiURL = `https://apihut.in/api/country/phone-codes`;
    const apiKey = `8a8c10d9-f78c-4595-93ab-55795d85274e`;
    const res = await fetch(`${apiURL}`, {
      headers: {
        "x-avatar-key": apiKey,
      },
    });
    if (!res.ok) {
      throw new Error(`Error fetching: ${res.status} - ${res.statusText}`);
    }
    const result = await res.json();
    const view = result.data;
    // console.log(view);
    // console.log(typeof view);
    // console.log(view.length);
    if (view.length === 1) {
      userPhoneSelect.innerHTML = `
        <option> Error fetching country phone codes </option>
        `;
    } else {
      view.forEach((item) => {
        userPhoneSelect.innerHTML += `
        <option value=${item.callingCode}> ${item.callingCode} </option>
        `;
        //   console.log(item.callingCode);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

fetchCountryCodes();

const togglePassword = () => {
  const userPassword = document.getElementById("userPassword");
  if (userPassword.type == "password") {
    userPassword.type = "text";
  } else {
    userPassword.type = "password";
  }
};

// document.getElementById("showEdit").addEventListener("click", togglePassword);

// Add Edit Status
let editLoader = document.getElementById("updateLoader");
let val_Container = document.querySelector(".validation_message");
let val_Message_Success = document.querySelector(".validation_message_success");
let userImg = document.getElementById("userImg");
let fileInput = document.getElementById("file_input");
const cameraIcon = document.getElementById("camera-lap");
let updateIcon = document.getElementById("updateProfile");
let user_UpdateName = document.getElementById("userName");
let user_UpdateEmail = document.getElementById("userEmail");
let user_UpdateUserName = document.getElementById("userUsername");
// let user_UpdatePassword = document.getElementById("userPassword");
let user_countrySelect = document.getElementById("countrySelect");
// let userCountryCode = document.getElementById("phoneNumberSelect");
let userPhone = document.getElementById("phoneNumberInput");
const getInputs = () => [
  user_UpdateName.value.trim(),
  user_UpdateEmail.value.trim(),
  user_UpdateUserName.value.trim(),
  // user_UpdatePassword.value.trim(),
  user_countrySelect.value.trim(),
  // userCountryCode.value.trim(),
  userPhone.value.trim(),
];

// Add the image URL if user has already uploaded an image before
  const getUserImage = localStorage.getItem("userProfile");
     const userImageFromEdit = localStorage.getItem("userProfileUrl");
      if (userImageFromEdit) {
        userImg.src = userImageFromEdit;
      }else if (getUserImage) {
        userImg.src = getUserImage
      }else{
        userImg.src = ""
      }
// Check for users and pre-fill their info

fileInput.addEventListener("change", async (event) => {
  // Accept only one image selection at a time
  const files = event.target.files[0];
  if (files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageURL = e.target.result;
      localStorage.setItem("userProfileUrl", imageURL);
      // console.log({
      //   imageURL,
      // });
      // Chnage the image src to the user's image selection
      userImg.src = e.target.result;
    };
    reader.readAsDataURL(files);
  }
});

// Call function when Icon is clicked
cameraIcon.addEventListener("click", () => {
  fileInput.click();
});

// Run the code
let isUploading = false;

updateIcon.addEventListener("click", async (event) => {
  const allInputs = getInputs();
  const hasEmptyFields = allInputs.some((value) => value === "");
  if (hasEmptyFields) {
   val_Container.classList.add("show");
   val_Container.scrollIntoView({ behavior: "smooth" });
   document.querySelector(".message_error").textContent = `Please fill all fields they are mandatory`;
   setTimeout(() => {
     val_Container.classList.remove("show");
   }, 7000);
    return;
  }
  console.log(allInputs);
  if (isUploading) return; // 🚨 prevents stack overflow
  isUploading = true;
  editLoader.style.visibility = "visible"
  try {
    const imageURL = localStorage.getItem("userProfileUrl");

    await updateDoc(doc(db, "users", currentUser.uid), {
      user_Name: user_UpdateName.value.trim() || "",
      user_Email: user_UpdateEmail.value.trim() || "",
      user_Name_Update: user_UpdateUserName.value.trim() || "",
      user_Country: user_countrySelect.value.trim() || "",
      // user_Country_Code: userCountryCode.value.trim() || "",
      user_Phone: userPhone.value.trim() || "",
      photoURL: imageURL,
      updatedAt: serverTimestamp(),
    });

    console.log("Upload successful");
    // Show Pop up
    val_Message_Success.classList.add("showMessage");
    val_Message_Success.scrollIntoView({ behavior: "smooth" });
    document.querySelector(
      ".message_success"
    ).textContent = `Profile updated successfully`;
    setTimeout(() => {
      val_Message_Success.classList.remove("showMessage");
      window.location.href = `dashboard.html`;
    }, 4000);
  } catch (err) {
    console.error("Upload failed:", err);
       val_Container.classList.add("show");
       val_Container.scrollIntoView({ behavior: "smooth" });
       document.querySelector(".message_error").textContent = `${err}`;
       setTimeout(() => {
         val_Container.classList.remove("show");
       }, 7000);
  } finally {
        editLoader.style.visibility = "hidden";
    isUploading = false;
    fileInput.value = ""; // ⭐ IMPORTANT
  }
});
