const minValue = document.querySelector("#min-value");
const maxValue = document.querySelector("#max-value");
const generateBtn = document.querySelector("#generate");
const result = document.querySelector(".result-value");
const inputMin = document.querySelector(".result-min-value");
const inputMax = document.querySelector(".result-max-value");
const userDate = document.querySelector(".generate-date");

generateBtn.addEventListener("click", () => {
	const min = parseInt(minValue.value, 10);
	const max = parseInt(maxValue.value, 10);

	if (isNaN(min) || isNaN(max)) {
		result.textContent = `Введите значение`;
		return;
	} else if (min > max) {
		result.textContent = `Минимум должен быть меньше или равен максимуму!`;
		return;
	} else if (min < 0 || max < 0) {
		result.textContent = `Введите положительные числа`;
		return;
	}

	const spinner = document.createElement("div");
	spinner.classList.add("spinner");
	result.innerHTML = "";
	result.appendChild(spinner);
	inputMin.textContent = "";
	inputMax.textContent = "";
	userDate.textContent = "";

	setTimeout(() => {
		const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

		result.textContent = `${randomNumber}`;
		inputMin.textContent = `${min}`;
		inputMax.textContent = `${max}`;
		userDate.textContent = new Date();
	}, 1000);
});
