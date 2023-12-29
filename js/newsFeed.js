//Finds the container that will hold the articles
const bbcNewsContainer = document.getElementById("bbcNewsContainer");

//Function that grabs a set amount of articles
async function getNewsArticles() {
  //Grabs top headlines from BBC, source can change after "sources". Thus you could make this user customizable.
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=48d9d28488c942a59433583a879f675c`
  );
  if (response.ok) {
    const newsArticles = await response.json();
    //I went with three articles, this could also be changed into a user setting
    for (i = 0; i < 3; i++) {
      //Creates a div to contain all of the info and gives it a class for easy styling
      const articleContainer = document.createElement("div");
      articleContainer.className = "articleContainer";
      //Grabs the article image from the api object and gives it a class
      const articleImage = document.createElement("img");
      articleImage.className = "articleImage";
      articleImage.src = newsArticles.articles[i].urlToImage;
      //Appends it to the container
      articleContainer.appendChild(articleImage);
      //Creates the link and text node for the link, also gives the a tag a class.
      const articleTitle = document.createElement("a");
      articleTitle.className = "articleTitle";
      const articleUrlTextNode = document.createTextNode(
        newsArticles.articles[i].url
      );
      articleTitle.href = newsArticles.articles[i].url;
      //Makes sure the user isn't redirected
      articleTitle.target = "_blank";
      //Appends the text node to the link
      articleTitle.appendChild(articleUrlTextNode);
      articleTitle.textContent = newsArticles.articles[i].title;
      //Appends the link to the container
      articleContainer.appendChild(articleTitle);
      //Grabs the article description, gives the p tag a class and then appends it to the container
      const articleDescription = document.createElement("p");
      articleDescription.className = "articleDescription";
      articleDescription.textContent = newsArticles.articles[i].description;
      articleContainer.appendChild(articleDescription);
      //Lastly appends the article container to the main news container inside of the grid.
      bbcNewsContainer.appendChild(articleContainer);
    }
  }
}

getNewsArticles();
