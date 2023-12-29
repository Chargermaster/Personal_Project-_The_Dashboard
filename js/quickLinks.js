//Grabs the relevant elements
const cardContainer = document.getElementById("cardContainer");
const quickLinkButtonContainer = document.getElementById(
  "quickLinkButtonContainer"
);
const addLinkButton = document.getElementById("addLinkButton");
//Adds an event listener to the button
addLinkButton.addEventListener("click", addLinkTransform);

//Variables that are required later down the line
let quickLinkDescription = " ";
let quickLinkURL = " ";
let linkCards = [];

function addLinkTransform() {
  //First it removes the button that was just pressed
  addLinkButton.remove();
  //Now it creates two inputs, one for description and the other for the link's URL
  const descriptionInput = document.createElement("input");
  descriptionInput.placeholder = "Länkens namn";
  quickLinkButtonContainer.appendChild(descriptionInput);
  const linkInput = document.createElement("input");
  linkInput.placeholder = "Länkens URL";
  quickLinkButtonContainer.appendChild(linkInput);
  //Next it creates another button that will take the values from the two inputs and move it along to another function
  const addLinksButton = document.createElement("button");
  addLinksButton.textContent = "Lägg till";
  addLinksButton.id = "addLinkButton";
  quickLinkButtonContainer.appendChild(addLinksButton);
  addLinksButton.addEventListener("click", function moveLinkInformation() {
    quickLinkDescription = descriptionInput.value;
    quickLinkURL = linkInput.value;
    createLinkCard();
  });
}

//Creates the actual card
function createLinkCard() {
  //Creates the container for the card
  const linkCardDiv = document.createElement("div");
  linkCardDiv.id = "linkCardDiv";
  cardContainer.appendChild(linkCardDiv);
  //Creates a button so that you can remove the card
  const linkCardButton = document.createElement("button");
  linkCardButton.id = "linkCardButton";
  linkCardButton.textContent = "X";
  linkCardButton.addEventListener("click", function removeLinkCard() {
    //Removes the parent (the container) along with finding the index of the saved cards
    //If the link URL matches it will remove it via splice and then re-insert the remaining links into local storage
    this.parentElement.remove();
    let linkCardsIndex = linkCards.findIndex(
      (url) => url.linkCardURL === this.parentElement.childNodes[0].href
    );
    linkCards.splice(linkCardsIndex, 1);
    localStorage.setItem("linkCards", JSON.stringify(linkCards));
  });
  //Creates a link and gives the node the same description as the user wrote
  const linkCardLink = document.createElement("a");
  const linkCardNode = document.createTextNode(`${quickLinkDescription}`);
  //Makes sure it opens a new tab
  linkCardLink.target = "_blank";
  linkCardLink.appendChild(linkCardNode);
  //To ensure that the link is usable it converts it to lowercase and checks if http or https is written in the link.
  //If not the https is added and an additionally / at the end as I found that the url wouldn't work otherwise
  //If the link is copied it merely skips this check.
  quickLinkURL = quickLinkURL.toLowerCase();
  quickLinkURL.includes("http://") || quickLinkURL.includes("https://")
    ? quickLinkURL
    : (quickLinkURL = "https://" + quickLinkURL + "/");
  console.log(quickLinkURL);
  linkCardLink.href = quickLinkURL;
  linkCardDiv.appendChild(linkCardLink);
  //Adds the new link's url and description to the array
  linkCards.push({
    linkCardDescription: quickLinkDescription,
    linkCardURL: quickLinkURL,
  });

  linkCardDiv.appendChild(linkCardButton);
  localStorage.setItem(`linkCards`, JSON.stringify(linkCards));
  //Lastly it clears the button container and adds back the button that was removed at the start so you can add more cards
  quickLinkButtonContainer.innerHTML = "";
  quickLinkButtonContainer.appendChild(addLinkButton);
}

//If local storage contains something this function will run.
//Most of it is identical, it will create the div, button, link details and event listener to remove the button
function buildLinkStorage(linkCardDescription, linkCardURL) {
  const linkCardDiv = document.createElement("div");
  linkCardDiv.id = "linkCardDiv";
  cardContainer.appendChild(linkCardDiv);
  const linkCardButton = document.createElement("button");
  linkCardButton.id = "linkCardButton";
  linkCardButton.textContent = "X";
  linkCardButton.addEventListener("click", function removeLinkCard() {
    this.parentElement.remove();
    //The function is a bit different as the values from local storage are carried along to the function
    //Here it filters the linkCards array by copying everything inside of it except if the URL matches
    //This means that local storage will get every single URL except the one that matches the removed card
    linkCards = linkCards.filter((url) => url.linkCardURL != linkCardURL);
    localStorage.setItem("linkCards", JSON.stringify(linkCards));
  });
  const linkCardLink = document.createElement("a");
  const linkCardNode = document.createTextNode(`${linkCardDescription}`);
  linkCardLink.target = "_blank";
  linkCardLink.appendChild(linkCardNode);
  linkCardLink.href = linkCardURL;
  linkCardDiv.appendChild(linkCardLink);
  linkCardDiv.appendChild(linkCardButton);
  quickLinkButtonContainer.innerHTML = "";
  quickLinkButtonContainer.appendChild(addLinkButton);
}

//Checks if local storage is empty or not, if not it runs this function to rebuild the cards
localStorage.getItem("linkCards") != null
  ? [
      JSON.parse(localStorage.getItem("linkCards")).forEach((element) => {
        buildLinkStorage(element.linkCardDescription, element.linkCardURL);
      }),
      (linkCards = JSON.parse(localStorage.getItem("linkCards"))),
    ]
  : console.log("LocalStorage linkCards null");
