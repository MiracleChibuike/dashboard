

const togglePassword = () => {
  const userPassword = document.getElementById("userPassword");
  if (userPassword.type == "password") {
    userPassword.type = "text";
  } else {
    userPassword.type = "password";
  }
};