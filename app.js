const weatherImg = document.querySelector("#weather-img");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidityValue = document.querySelector(".humidity-value");
const windSpeedValue = document.querySelector(".wind-speed-value");
const searchText = document.querySelector("#search-text");
const searchBtn = document.querySelector(".search-btn");
const weatherBody = document.querySelector(".weather-body");
const error = document.querySelector(".error");

searchBtn.addEventListener("click", async (e) => {
  if (searchText.value === "") return;
  weatherBody.style.display = "none";
  error.style.display = "none";
  try {
    const searchCity = searchText.value.trim().toLowerCase();

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=b910d7bc47455cdda1adc8885a153a38&units=metric`
    );

    const data = response.data;

    weatherBody.style.display = "block";
    temp.textContent = Math.ceil(data.main.temp);
    city.textContent = data.name;

    const mainWeather = data.weather[0].main;
    switch (mainWeather) {
      case "Clear":
        weatherImg.src = "./weather-app-img/images/clear.png";
        break;
      case "Clouds":
        weatherImg.src = "./weather-app-img/images/clouds.png";
        break;
      case "Drizzle":
        weatherImg.src = "./weather-app-img/images/drizzle.png";
        break;

      case "Mist":
        weatherImg.src = "./weather-app-img/images/mist.png";
        break;
      case "Rain":
        weatherImg.src = "./weather-app-img/images/rain.png";
        break;
      case "Snow":
        weatherImg.src = "./weather-app-img/images/snow.png";
        break;

      default:
        weatherImg.src = "./weather-app-img/images/clear.png";
        break;
    }
    windSpeedValue.textContent = Math.ceil(data.wind.speed);
    humidityValue.textContent = Math.ceil(data.main.humidity);

    searchText.value = "";
  } catch (err) {
    console.log(`Error getting message: ${err}`);
    error.style.display = "block";
  }
});
