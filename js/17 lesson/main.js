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
const liHead = document.querySelector(".li-head");

const getWeatherData = (city) => {
	fetch(
		`${WEATHER_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
	)
		.then((res) => res.json())
		.then((weatherData) => {
			console.log(weatherData);
			insertWeatherData(weatherData);
		});
};

const insertWeatherData = (data) => {
	cityNameOutput.textContent = `В городе ${data.name} температура:`;
	temperature.textContent = `${data.main.temp}°C`;
	tempFeel.textContent = `${data.main.feels_like}°C`;
	wind.textContent = `${data.wind.speed} м/с`;
	weatherImage.setAttribute(
		"src",
		`${WEATHER_ICON_URL}/${data.weather[0].icon}.png`
	);
	weatherImage.setAttribute("alt", `${data.weather[0].description}`);
	liHead.style.display = "block";
};

weatherForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const cityName = cityNameInp.value;
	if (cityName) {
		getWeatherData(cityName);
	}
});
