//Finds the button, body and the text field for background keyword
const body = document.getElementById("bodyBackground");
const backgroundTextInput = document.getElementById("backgroundTextInput");
const backgroundSubmitButton = document.getElementById(
  "backgroundSubmitButton"
);
//Adds event listener that sends the text field information after the button is clicked
backgroundSubmitButton.addEventListener("click", getBackground);

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
    console.log("JSON background image Error");
  }
}

//Upon loading the site it will check if a background has already been applied by the user via local storage
localStorage.getItem("backgroundImage") != null
  ? (body.style.backgroundImage = `url('${localStorage.getItem(
      "backgroundImage"
    )}')`)
  : console.log("LocalStorage backrgound img error");
