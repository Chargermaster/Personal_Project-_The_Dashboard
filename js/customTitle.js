//Finds the page title element and adds an event listener for when the input field is used
const pageTitel = document.getElementById("pageTitle");
pageTitel.addEventListener("input", inputPageTitle);

//Takes the text from the input field and adds it into local storage
function inputPageTitle(inputText) {
  localStorage.setItem("inputField", inputText.target.value);
  pageTitel.value = localStorage.getItem("inputField");
}

//Checks if the local storage is empty, if not add the text to the title
localStorage.getItem("inputField") != null
  ? (pageTitel.value = localStorage.getItem("inputField"))
  : console.log("LocalStorage title error");
