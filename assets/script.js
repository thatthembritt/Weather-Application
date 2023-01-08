let dayDataDiv = document.getElementById("dayData");
let forecastDiv = document.getElementById("forecastDiv");
let searchBtn = document.getElementById("searchBtn");
let searchHistoryArr = JSON.parse(localStorage.getItem("historyArr")) || [];

function createButton(cityName) {
  var historyButton = document.createElement("button");
  historyButton.textContent = cityName;
  let historyDiv = document.getElementById("history");
  historyButton.addEventListener("click", function () {
    dayDataDiv.innerHTML = "";

    let apiKey = "2dde65710100afa34ad3b9db2e765df8";
    console.log(cityName);
    let searchURL =
      "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyid}=${apiKey}&units=imperial";
    fetch(searchURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let cityNameDiv = document.createElement("div");
        cityNameDiv.innerHTML = data.name;

        let todaysDate = document.createElement("div");
        todaysDate.innerHTML = data.main.temp;

        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.main.temp;

        let humidityDiv = document.createElement("div");
        humidityDiv.innerHTML = data.main.humidity;

        let windDiv = document.createElement("div");
        windDiv.innerHTML = data.wind.speed;

        let iconDiv = document.createElement("img");
        iconDiv.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        );
        iconDiv.setAttribute("class", "iconStyle");
        dayDataDiv.append(
          cityNameDiv,
          tempDiv,
          humidityDiv,
          windDiv,
          todaysDate,
          iconDiv
        );
      });
    retrieveForecastData(cityName);
  });
  historyDiv.append(historyButton);
}
for (let index = 0; index < searchHistoryArr.length; index++) {
  createButton(searchHistoryArr[index]);
}
function getWeather(event) {
  event.preventDefault();
  dayDataDiv.innerHTML = "Today's Forecast";
  let cityName = document.querySelector("#cityName").value;
}
