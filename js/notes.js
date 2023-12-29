//Finds the text field and gives it an event listener that fires upon input
const cardTextArea = document.getElementById("cardTextArea");
cardTextArea.addEventListener("input", inputTextArea);

//Takes the input text and places it into local storage
function inputTextArea(textArea) {
  localStorage.setItem("textArea", textArea.target.value);
  cardTextArea.value = localStorage.getItem("textArea");
}

//On side load, grabs any text from local storage if there is any and puts it into the text area.
localStorage.getItem("textArea") != null
  ? (cardTextArea.value = localStorage.getItem("textArea"))
  : console.log("LocalStorage text area error");
