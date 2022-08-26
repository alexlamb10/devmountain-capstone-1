const baseURL = "";

// Home.html, get users information for their trip and send to back to add to database
let cityInput = document.getElementById("city");
let stateInput = document.getElementById("state");
let countryInput = document.getElementById("country");
let daysInput = document.getElementById("num-of-days");
let actInput = document.getElementById("activities");
let costInput = document.getElementById("cost");
let submitTrip = document.getElementById("submit-new-trip");
let message = document.getElementsByClassName("message");
let messageBody = document.getElementById("return-message");

//Check for user_id in order to stay on page
function checkForLogin() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "./index.html";
  }
}

checkForLogin();

function addNewTrip() {
  let dayType = typeof +daysInput.value;
  let costType = typeof +costInput.value;
  if (
    cityInput.value === "" ||
    stateInput.value === "" ||
    countryInput.value === "" ||
    dayType !== "number" ||
    actInput.value === "" ||
    costType !== "number"
  ) {
    alert("Some values are missing!");
  } else if (daysInput.value <= 0 || costInput.value <= 0) {
    alert("All number values must be postive!");
  } else {
    let userId = localStorage.getItem("userId");
    let body = {
      city: cityInput.value,
      state: stateInput.value,
      country: countryInput.value,
      days: daysInput.value,
      activities: actInput.value,
      cost: costInput.value,
      userId,
    };

    axios.post(`${baseURL}/trips`, body).then((res) => {
      alert(res.data);
    });
    cityInput.value = "";
    stateInput.value = "";
    countryInput.value = "";
    daysInput.value = "";
    actInput.value = "";
    costInput.value = "";
  }
}

submitTrip.addEventListener("click", addNewTrip);
