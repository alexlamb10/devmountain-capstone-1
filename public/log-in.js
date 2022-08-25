//Get elements for log in page

let nameInput = document.getElementById("name");
let usernameInput = document.getElementById("username");
let newPassword = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let submitNewProfile = document.getElementById("submit-profile");
let loginUsername = document.getElementById("log-in-username");
let loginPassword = document.getElementById("log-in-password");
let loginBtn = document.getElementById("log-in-btn");
let createAccTitle = document.getElementById("profile");
let createAccBox = document.getElementById("create-profile");
let logInTitle = document.getElementById("log");
let logInBox = document.getElementById("log-in");
let hasAccount = document.getElementById("has-account");
let createAccount = document.getElementById("create-account");

const baseURL = "";
// create user log in

function createUser() {
  let capital = false;

  for (let i = 0; i < newPassword.value.length; i++) {
    let char = newPassword.value[i];
    if (char === char.toUpperCase()) {
      capital = true;
    }
  }

  let body = {
    newUser: nameInput.value,
    username: usernameInput.value,
    password: newPassword.value,
  };
  //Check password to see if they match before sending user info to back end
  if (newPassword.value.length < 8 || newPassword.value.length > 20) {
    alert("Password must be between 8-20 characters");
  } else if (capital === false) {
    alert("Password must contain at least 1 capital!");
  } else {
    if (newPassword.value === confirmPassword.value) {
      axios.post(`${baseURL}/users`, body).then((res) => {
        alert(res.data);
        createAccBox?.classList.add("hide-menu");
        createAccTitle?.classList.add("hide-menu");
        hasAccount?.classList.add("hide-menu");
        logInBox?.classList.remove("hide-menu");
        logInTitle?.classList.remove("hide-menu");
        createAccount?.classList.remove("hide-menu");
      });
    } else {
      alert("Passwords must match");
    }
  }

  nameInput.value = "";
  usernameInput.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
}

function markHasAccount() {
  createAccBox?.classList.add("hide-menu");
  createAccTitle?.classList.add("hide-menu");
  hasAccount?.classList.add("hide-menu");
  logInBox?.classList.remove("hide-menu");
  logInTitle?.classList.remove("hide-menu");
  createAccount?.classList.remove("hide-menu");
}

function chooseToCreateAccount() {
  createAccBox?.classList.remove("hide-menu");
  createAccTitle?.classList.remove("hide-menu");
  hasAccount?.classList.remove("hide-menu");
  logInBox?.classList.add("hide-menu");
  logInTitle?.classList.add("hide-menu");
  createAccount?.classList.add("hide-menu");
}

function logIn() {
  //Get username/password to send to back end
  let username = loginUsername.value;
  body = {
    password: loginPassword.value,
  };
  axios
    .post(`${baseURL}/users/${username}`, body)
    .then((res) => {
      //alert user log in was successful then set id for
      alert(res.data.message);

      localStorage.setItem("userId", res.data.userId);

      window.location.href = "./home.html";
    })
    .catch((err) => {
      let error = err.message;
      if (error.includes("400")) {
        alert("Incorrect password, please try again");
      } else if (error.includes("500")) {
        alert("User not found");
      }
    });
  loginUsername.value = "";
  loginPassword.value = "";
  signIn = false;
}

submitNewProfile.addEventListener("click", createUser);
loginBtn.addEventListener("click", logIn);

let login = document.getElementById("create-profile");
let passwordRequirements = document.getElementById("password-req");
passwordRequirements.style.display = "none";

function passwordReq() {
  passwordRequirements.style.display = "block";
}

function removeReq() {
  passwordRequirements.style.display = "none";
}
newPassword.addEventListener("mouseover", passwordReq);
newPassword.addEventListener("mouseout", removeReq);
hasAccount?.addEventListener("click", markHasAccount);
createAccount?.addEventListener("click", chooseToCreateAccount);
