const API_KEY = "a9364650d7bb1a7f29a975686cbc4543";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_ICON_URL = "https://api.openweathermap.org/img/w";

const weatherForm = document.querySelector(".weather-form");
const cityNameInp = document.querySelector("#city-name");
const cityNameOutput = document.querySelector("#city-name-output");
const temperature = document.querySelector("#temperature");
const tempFeel = document.querySelector("#feels-temperature");
const wind = document.querySelector("#wind");
const weatherImage = document.querySelector("#result-img");
const ulHead = document.querySelector(".result-list");
const timeOutput = document.querySelector("#current-time");
const humid = document.querySelector("#humid");
let map;

const getWeatherData = (city) => {
	fetch(
		`${WEATHER_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
	)
		.then((res) => res.json())
		.then((weatherData) => {
			console.log(weatherData);
			insertWeatherData(weatherData);
			showMap(weatherData.coord.lat, weatherData.coord.lon, city);
		})
		.catch((error) => {
			console.log(error);

			alert("Ошибка: город не найден или сервис недоступен.");
			cityNameOutput.textContent =
				"Ошибка: город не найден или сервис недоступен.";
			temperature.textContent = "";
			tempFeel.textContent = "";
			wind.textContent = "";
			weatherImage.style.display = "none";
			humid.textContent = "";
		});
};

const insertWeatherData = (data) => {
	cityNameOutput.textContent = `В городе ${data.name} температура:`;
	if (data.main.temp < 0) {
		temperature.textContent = `${Math.round(data.main.temp)}°C`;
		temperature.style.color = "blue";
	} else {
		temperature.textContent = `${Math.round(data.main.temp)}°C`;
		temperature.style.color = "red";
	}
	if (data.main.feels_like < 0) {
		tempFeel.textContent = `${Math.round(data.main.feels_like)}°C`;
		tempFeel.style.color = "blue";
	} else {
		tempFeel.textContent = `${Math.round(data.main.feels_like)}°C`;
		tempFeel.style.color = "red";
	}
	wind.textContent = `${data.wind.speed} м/с`;
	weatherImage.setAttribute(
		"src",
		`${WEATHER_ICON_URL}/${data.weather[0].icon}.png`
	);
	weatherImage.style.display = "block";
	weatherImage.setAttribute("alt", `${data.weather[0].description}`);
	ulHead.style.display = "block";
	humid.textContent = `${data.main.humidity} %`;
};

const showMap = (lat, lon, city) => {
	if (map) {
		map.remove();
	}

	map = L.map("map").setView([lat, lon], 10);
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 5,
	}).addTo(map);

	L.marker([lat, lon]).addTo(map).bindPopup(`Город: ${city}`).openPopup();
};

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const cityName = cityNameInp.value;
	if (cityName) {
		getWeatherData(cityName);
	} else {
		alert("Введите город");
	}
});
