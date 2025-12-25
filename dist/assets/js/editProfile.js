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
            <option value="${code}">${data.country}</option>
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
        `
    }else{
          view.forEach((item) => {
            userPhoneSelect.innerHTML += `
        <option value=${item}> ${item.callingCode} </option>
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

document.getElementById("showEdit").addEventListener("click", togglePassword);
