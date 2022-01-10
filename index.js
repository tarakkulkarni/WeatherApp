let weather = {
  apiKey: config.api_key,
  featchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey +
        "&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".weather-heading").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weather-description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather-card").classList.remove("loading");
  },
  search: function () {
    this.featchWeather(document.querySelector(".search").value);
  },
};
document.querySelector("button").addEventListener("click", function () {
  weather.search();
});
document.querySelector(".search").addEventListener("keyup", function (eve) {
  if (eve.key == "Enter") {
    weather.search();
  }
});
weather.featchWeather("Mumbai");
