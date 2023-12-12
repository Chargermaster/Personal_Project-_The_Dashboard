//Finding the various elements and giving them event listeners
const pageTitel = document.getElementById("pageTitle");
pageTitel.addEventListener("input", inputPageTitle);
const cardTextArea = document.getElementById("cardTextArea");
cardTextArea.addEventListener("input", inputTextArea);

const body = document.getElementById("bodyBackground");
const backgroundTextInput = document.getElementById("backgroundTextInput");
const backgroundSubmitButton = document.getElementById(
  "backgroundSubmitButton"
);
backgroundSubmitButton.addEventListener("click", getBackground);
// body.style.backgroundImage =
//   "url('https://img.etimg.com/thumb/width-640,height-480,imgsize-56196,resizemode-75,msid-95423731/magazines/panache/5-reasons-why-tomatoes-should-be-your-favourite-fruit-this-year/tomatoes-canva.jpg')";

//Functions for the text fields
function inputPageTitle(inputText) {
  localStorage.setItem("inputField", inputText.target.value);
  pageTitel.value = localStorage.getItem("inputField");
}

function inputTextArea(textArea) {
  localStorage.setItem("textArea", textArea.target.value);
  cardTextArea.value = localStorage.getItem("textArea");
}

function getBackground() {
  if (backgroundTextInput.value.length === 0) {
    console.log("String is empty");
  } else {
    let api_url = `https://api.unsplash.com/photos/random?query=${backgroundTextInput.value}&client_id=ScnUMlifBs2ManUdhxd35ZzlYT4o3EQvbt-c-4277sY`;
    getBackgroundAPI(api_url);
  }
  // let newBackgroundImage = `https://api.unsplash.com/photos/random?query=${backgroundTextInput.value}&client_id=ScnUMlifBs2ManUdhxd35ZzlYT4o3EQvbt-c-4277sY`;
  // console.log(newBackgroundImage);
  console.log("hello");
}
async function getBackgroundAPI(api_url) {
  const response = await fetch(api_url);
  if (response.ok) {
    const apiImageData = await response.json();
    console.log(apiImageData.urls.full);
    localStorage.setItem("backgroundImage", `${apiImageData.urls.regular}`);
    body.style.backgroundImage = `url('${localStorage.getItem(
      "backgroundImage"
    )}')`;
    // body.style.backgroundImage = `url('${apiImageData.urls.full}')`;
  } else {
    console.log("jsonError");
  }
}

if (localStorage.getItem("backgroundImage") != null) {
  body.style.backgroundImage = `url('${localStorage.getItem(
    "backgroundImage"
  )}')`;
}

//https://api.unsplash.com/photos/random?query=${term}&client_id=ScnUMlifBs2ManUdhxd35ZzlYT4o3EQvbt-c-4277sY
