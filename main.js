const apiKey = "4aaff8cdb73d4b8beba62545b429df71";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");

const searchButton = document.querySelector(".searchButton");

const geoButton = document.querySelector(".geoButton");

const weatherIcon = document.querySelector(".weather-image i");

const weather = document.querySelector(".weather");

const errorText = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorText.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "&#8451";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " км/ч";

    if (data.weather[0].main == "Clear") {
      weatherIcon.className = "fa-solid fa-sun";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "fa-solid fa-cloud-rain";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "fa-solid fa-cloud-mist";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "fa-solid fa-cloud-drizzle";
    }

    weather.style.display = "block";
    errorText.style.display = "none";
  }
}

async function findMyState() {
  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const geoApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    fetch(geoApi).then(res => res.json()).then(data => {
      searchInput.value = data.city
      searchButton.click()
    })
  }
  navigator.geolocation.getCurrentPosition(success)
}

geoButton.addEventListener("click", findMyState)

searchButton.addEventListener("click", () => {
  if (searchInput.value !== "") {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    if (searchInput.value !== "") {
      checkWeather(searchInput.value);
      searchInput.value = "";
    }
  }
});
