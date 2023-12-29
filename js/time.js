//Finds the container and relevent P tags.
const timeContainer = document.getElementById("timeContainer");
const currentTime = document.getElementById("currentTime");
const currentDate = document.getElementById("currentDate");

//Sets up a few variables needed to tell the time and date
let localMinute,
  localHour,
  localDate,
  intervalTimer = 60,
  ranTimeOnce = false;

function displayTime() {
  //Gets the date
  let date = new Date();
  //Converts the date into: Minutes -> Hours -> date as a string
  localMinute = date.getMinutes();
  //If local minutes is below 10 it will return as a single diget (I.E. if it's the first minute of the hour it will return a 1 instead of 01).
  if (localMinute < 10) {
    localMinute = "0" + localMinute;
  }
  localHour = date.getHours();
  dateString = date.toDateString();
  //Combines hours and minutes to mimic the display of a clock
  currentTime.textContent = localHour + ":" + localMinute;
  //The date string is a single string split between spaces. The date string is turned into an array by splitting everything between the spaces.
  dateString = dateString.split(" ");
  //Since date returns the awkward American date format of mm-dd-yyyy the array needs to go through index 2-1-3 to display dd-mm-yyyy.
  //Index 0 is skipped as that's the current day of the week.
  console.log(dateString);
  currentDate.textContent =
    dateString[2] + " " + dateString[1] + " " + dateString[3];
  //Checks if this is the first time that the site has been loaded
  if (ranTimeOnce === false) {
    //This is done to make sure the first minute updates accordingly.
    //It takes a minute and removes the amount of seconds that have already passed.
    //I.E. if it's already 20 seconds into a minute when the user enters the site this will update after the remaining 40
    intervalTimer -= date.getSeconds();
    //Runs display time again after the timer runs out. This is done in ms hence the need to multiply with 1000.
    setTimeout(displayTime, intervalTimer * 1000);
    //Resets the interval timer.
    intervalTimer = 60;
    ranTimeOnce = true;
  } else {
    //Now it should always update per minute.
    setTimeout(displayTime, intervalTimer * 1000);
  }
}

displayTime();
