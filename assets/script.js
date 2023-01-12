const searchBtn = document.getElementById("searchBtn");
const searchHistoryArr = JSON.parse(localStorage.getItem("historyArr")) || [];

function createButton(cityName) {
  const historyButton = document.createElement("button");
  historyButton.textContent = cityName;
  const historyDiv = document.getElementById("history");

  historyButton.addEventListener("click", () => {
    retrieveWeatherData(cityName);
  });

  historyDiv.appendChild(historyButton);
}

searchHistoryArr.forEach((cityName) => createButton(cityName));

function retrieveWeatherData(cityName) {
  const apiKey = "b7fbf615641171c9610ddf5ae4bbd20c";
  const searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateTodayData(data);
      const lon = data.coord.lon;
      const lat = data.coord.lat;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      fetch(forecastURL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          futureForecastData(data);
        });
    });
}

function updateTodayData(data) {
  const cityNameDiv = document.createElement("div");
  cityNameDiv.innerHTML = data.name;

  const todaysDate = document.createElement("div");
  todaysDate.innerHTML = moment.unix(data.dt).format("MM/DD/YY");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = data.main.temp;

  const humidityDiv = document.createElement("div");
  humidityDiv.innerHTML = data.main.humidity;

  const windDiv = document.createElement("div");
  windDiv.innerHTML = data.wind.speed;

  const iconDiv = document.createElement("img");
  iconDiv.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  );
  iconDiv.setAttribute("class", "iconStyle");

  const dayDataDiv = document.getElementById("dayData");
  dayDataDiv.innerHTML = "Today's Forecast";
  dayDataDiv.append(
    cityNameDiv,
    tempDiv,
    humidityDiv,
    windDiv,
    todaysDate,
    iconDiv
  );
}

function futureForecastData(data) {
  for (let index = 5; index < data.list.length; index = index + 8) {
    const cityNameDiv = document.createElement("div");
    cityNameDiv.innerHTML = data.list[index].main.name;

    const todaysDate = document.createElement("div");
    todaysDate.innerHTML = moment.unix(data.list[index].dt).format("MM/DD/YY");

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data.list[index].main.temp;

    const humidityDiv = document.createElement("div");
    humidityDiv.innerHTML = data.list[index].main.humidity;

    const windDiv = document.createElement("div");
    windDiv.innerHTML = data.list[index].wind.speed;

    const forecastDataDiv = document.getElementById("forecastData");
    forecastDataDiv.innerHTML = "Five Day Forecast";
    forecastDataDiv.append(cityNameDiv, tempDiv, humidityDiv, windDiv);
  }
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const cityName = document.querySelector("#cityName").value;
  createButton(cityName);
  searchHistoryArr.push(cityName);
  localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
  retrieveWeatherData(cityName);
});
