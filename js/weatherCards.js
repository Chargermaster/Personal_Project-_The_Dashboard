//Array to set the day for the third card
const daysOfTheWeek = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];
async function getWeather(geoLocation) {
  //Grabs the date
  let date = new Date();
  //With the way the API works you set how many 3 hour intervals of data you want. For 3 days you need 16 intervals thus a promise.all is required.
  await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocation.coords.latitude}&lon=${geoLocation.coords.longitude}&cnt=17&units=metric&lang=se&appid=b0cdf53bf9cb2cc5ea401ec088598def`
    ),
  ])
    //After getting all of the intervals it turns all of the results into json objects
    .then((results) => Promise.all(results.map((data) => data.json())))
    //After that it pushes index 0 (current time), 8 (3*8 = 24 hours) and 16 (3*16 = 48 hours) into an array since we only want three days.
    .then((response) => {
      const intervals = [];
      intervals.push(0, 8, 16);
      //Starts at 1 so it's able to grab the ids
      for (i = 1; i <= 3; i++) {
        const weatherCard = document.getElementById(`weatherCard${i}`);
        //Weather card 3 is special as it needs a specific day of the week applied to it
        if (weatherCard.id === "weatherCard3") {
          const weatherDayDiv = document.getElementById("WeatherDayText");
          //getDay uses American weeks as its setup so the weeks start at Sunday (0) and ends on Saturday (6).
          //This means that if it's a Friday it returns 5, starting from 0 that's day 6
          //To get two days ahead with a Mon - Sun scheme you have to add one more day.
          weatherDayDiv.textContent =
            daysOfTheWeek[date.getDay(date.setDate(date.getDate() + 1))];
        }
        //Grabs the image associated with the weather. i needs to be reduced by 1 as it starts on 1 or it'll go outside of the array scope
        const weatherImage = document.getElementById(`weatherImage${i}`);
        let weatherImageElement = document.createElement("img");
        weatherImageElement.src =
          "https://openweathermap.org/img/wn/" +
          response[0].list[intervals[i - 1]].weather[0].icon +
          ".png";
        weatherImage.appendChild(weatherImageElement);
        //Next it grabs the temperature and weather details the same way as the image
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
      console.error("Weather card error: ", error);
    });
}
//Sends the current position of the user along to the async function
navigator.geolocation.getCurrentPosition(getWeather);
