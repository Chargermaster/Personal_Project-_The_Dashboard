//Finding the various text-based elements and giving them event listeners
const pageTitel = document.getElementById("pageTitle");
pageTitel.addEventListener("input", inputPageTitle);
const cardTextArea = document.getElementById("cardTextArea");
cardTextArea.addEventListener("input", inputTextArea);
//Finds body and the relevant text field. Gives the text field an event listener
const body = document.getElementById("bodyBackground");
const backgroundTextInput = document.getElementById("backgroundTextInput");
const backgroundSubmitButton = document.getElementById(
  "backgroundSubmitButton"
);
backgroundSubmitButton.addEventListener("click", getBackground);
//Finds quick link button
const firstCard = document.getElementById("firstCard");
const quickLinkButton = document.getElementById("quickLinkButton");
const test = document.getElementById("test");
test.addEventListener("click", testFunction);

const timeContainer = document.getElementById("timeContainer");
const currentTime = document.getElementById("currentTime");
timeContainer.appendChild(currentTime);
const currentDate = document.getElementById("currentDate");
timeContainer.appendChild(currentDate);
let localMinute,
  localHour,
  localDate,
  intervalTimer = 60,
  ranTimeOnce = false;

function displayTime() {
  let date = new Date();
  localMinute = date.getMinutes();
  localHour = date.getHours();
  dateString = date.toDateString();
  currentTime.textContent = localHour + ":" + localMinute;
  dateString = dateString.split(" ");
  currentDate.textContent =
    dateString[2] + " " + dateString[1] + " " + dateString[3];
  console.log(date.getSeconds());
  if (ranTimeOnce === false) {
    intervalTimer -= date.getSeconds();
    setTimeout(displayTime, intervalTimer * 1000);
    intervalTimer = 60;
    ranTimeOnce = true;
  } else {
    setTimeout(displayTime, intervalTimer * 1000);
  }
}

displayTime();

let quickLinkDescription = " ";
let quickLinkURL = " ";

function testFunction() {
  quickLinkButton.firstChild.remove();
  const descriptionInput = document.createElement("input");
  //descriptionInput.id = "descriptionInput"
  quickLinkButton.appendChild(descriptionInput);
  const linkInput = document.createElement("input");
  //linkInput.id = "linkInput";
  quickLinkButton.appendChild(linkInput);
  const addLinksButton = document.createElement("button");
  quickLinkButton.appendChild(addLinksButton);
  addLinksButton.addEventListener("click", function test3() {
    quickLinkDescription = descriptionInput.value;
    quickLinkURL = linkInput.value;
    test2();
  });
}

let linkCards = [];

function test2() {
  const linkCardDiv = document.createElement("div");
  linkCardDiv.id = "linkCardDiv";
  firstCard.appendChild(linkCardDiv);
  const linkCardButton = document.createElement("button");
  linkCardButton.id = "linkCardButton";
  linkCardButton.textContent = "X";
  linkCardButton.addEventListener("click", function removeLinkCard() {
    this.parentElement.remove();
  });
  const linkCardLink = document.createElement("a");
  const linkCardNode = document.createTextNode(`${quickLinkDescription}`);
  linkCardLink.appendChild(linkCardNode);
  //linkCardLink.title = "Sample link?";
  //KOLLA OM DE SKRIVER MED HTTPS:// ELLER INTE - KLARTquickLinkURL
  quickLinkURL = quickLinkURL.toLowerCase();
  quickLinkURL.includes("http://") || quickLinkURL.includes("https://")
    ? quickLinkURL
    : (quickLinkURL = "https://" + quickLinkURL + "/");
  console.log(quickLinkURL);
  linkCardLink.href = quickLinkURL;
  linkCardDiv.appendChild(linkCardLink);
  linkCardDiv.appendChild(linkCardButton);
  linkCards.push({
    linkCardDescription: quickLinkDescription,
    linkCardURL: quickLinkURL,
  });
  localStorage.setItem(`linkCards`, JSON.stringify(linkCards));
  console.log(JSON.parse(localStorage.getItem(`linkCards`), "[]"));
  quickLinkButton.innerHTML = "";
  quickLinkButton.appendChild(test);
}

function buildLinkStorage(linkCardDescription, linkCardURL) {
  const linkCardDiv = document.createElement("div");
  linkCardDiv.id = "linkCardDiv";
  firstCard.appendChild(linkCardDiv);
  const linkCardButton = document.createElement("button");
  linkCardButton.id = "linkCardButton";
  linkCardButton.textContent = "X";
  linkCardButton.addEventListener("click", function removeLinkCard() {
    this.parentElement.remove();
    linkCards = linkCards.filter((url) => url.linkCardURL != linkCardURL);
    localStorage.setItem("linkCards", JSON.stringify(linkCards));
  });
  const linkCardLink = document.createElement("a");
  const linkCardNode = document.createTextNode(`${linkCardDescription}`);
  linkCardLink.appendChild(linkCardNode);
  //linkCardLink.title = "Sample link?";
  linkCardLink.href = linkCardURL;
  linkCardDiv.appendChild(linkCardLink);
  linkCardDiv.appendChild(linkCardButton);
  quickLinkButton.innerHTML = "";
  quickLinkButton.appendChild(test);
}

//Functions for the text fields
function inputPageTitle(inputText) {
  localStorage.setItem("inputField", inputText.target.value);
  pageTitel.value = localStorage.getItem("inputField");
}

function inputTextArea(textArea) {
  localStorage.setItem("textArea", textArea.target.value);
  cardTextArea.value = localStorage.getItem("textArea");
}

//Function to get a background
function getBackground() {
  //First checks if the field is empty or not
  if (backgroundTextInput.value.length === 0) {
    console.log("String is empty");
  } else {
    //Takes the value from the input field and puts it into the API's given parameters
    let api_url = `https://api.unsplash.com/photos/random?query=${backgroundTextInput.value}&client_id=ScnUMlifBs2ManUdhxd35ZzlYT4o3EQvbt-c-4277sY`;
    //Sends along the "convereted" text field input to the API function
    getBackgroundAPI(api_url);
  }
}

async function getWeather(geoLocation) {
  await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocation.coords.latitude}&lon=${geoLocation.coords.longitude}&cnt=16&units=metric&lang=se&appid=b0cdf53bf9cb2cc5ea401ec088598def`
    ),
  ])
    .then((results) => Promise.all(results.map((data) => data.json())))
    .then((response) => {
      console.log(response);
      const intervals = [];
      intervals.push(0, 7, 15);
      for (i = 1; i <= 3; i++) {
        const weatherCard = document.getElementById(`weatherCard${i}`);
        const weatherImage = document.getElementById(`weatherImage${i}`);
        let weatherImageElement = document.createElement("img");
        weatherImageElement.src =
          "https://openweathermap.org/img/wn/" +
          response[0].list[intervals[i - 1]].weather[0].icon +
          ".png";
        weatherImage.appendChild(weatherImageElement);
        const weatherTemperature = document.getElementById(
          `weatherTemperature${i}`
        );
        let weatherTemperatureText = document.createElement("p");
        weatherTemperatureText.textContent =
          Math.round(response[0].list[intervals[i - 1]].main.temp) + "°C";
        weatherTemperature.appendChild(weatherTemperatureText);
        const weatherType = document.getElementById(`weatherType${i}`);
        let weatherTypeText = document.createElement("p");
        weatherTypeText.textContent =
          response[0].list[intervals[i - 1]].weather[0].description;
        weatherType.appendChild(weatherTypeText);
      }
    })

    .catch((error) => {
      console.error("Error: ", error);
    });
}

navigator.geolocation.getCurrentPosition(getWeather);

async function getBackgroundAPI(api_url) {
  const response = await fetch(api_url);
  if (response.ok) {
    const apiImageData = await response.json();
    //Puts the image URL from the API into local storage
    localStorage.setItem("backgroundImage", `${apiImageData.urls.regular}`);
    //Applys the new background image to the body
    body.style.backgroundImage = `url('${localStorage.getItem(
      "backgroundImage"
    )}')`;
  } else {
    console.log("JSON Error");
  }
}

//Upon loading the site it will check if a background has already been applied by the user via local storage
localStorage.getItem("backgroundImage") != null
  ? (body.style.backgroundImage = `url('${localStorage.getItem(
      "backgroundImage"
    )}')`)
  : console.log("LocalStorage backrgound img error");

localStorage.getItem("linkCards") != null
  ? [
      JSON.parse(localStorage.getItem("linkCards")).forEach((element) => {
        buildLinkStorage(element.linkCardDescription, element.linkCardURL);
      }),
      (linkCards = JSON.parse(localStorage.getItem("linkCards"))),
    ]
  : console.log("LocalStorage linkCards null");
