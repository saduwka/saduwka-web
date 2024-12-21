const choices = [
	{ text: "Камень", url: "./assets/rock.png" },
	{ text: "Ножницы", url: "./assets/scissors.png" },
	{ text: "Бумага", url: "./assets/paper.png" },
];
const result = document.querySelector("#result");
const choicesUsPC = document.querySelector(".choices");

function play(userChoiceText) {
	const userChoiceObj = choices.find(
		(choice) => choice.text === userChoiceText,
	);
	const computerChoice = choices[Math.floor(Math.random() * choices.length)];

	if (!userChoiceObj) {
		console.error("Некорректный выбор пользователя:", userChoiceText);
		return;
	}

	// Очищаем результат перед добавлением новых элементов и показываем спиннер
	result.innerHTML = "<div class='spinner'></div>";

	// Создаем div для выбора пользователя
	const userChoiceDiv = document.createElement("div");
	userChoiceDiv.classList.add("user-choice");
	const userImg = document.createElement("img");
	userImg.src = userChoiceObj.url;
	userImg.alt = userChoiceObj.text;
	userImg.title = `Ты выбрал: ${userChoiceObj.text}`;
	userChoiceDiv.appendChild(userImg);

	// Добавляем div для пользователя сразу
	setTimeout(() => {
		result.appendChild(userChoiceDiv);

		// Убираем спиннер после 1 секунды (когда пользовательский выбор добавлен)
		const spinner = document.querySelector(".spinner");
		if (spinner) spinner.remove();
	}, 500); // Задержка перед добавлением изображения пользователя

	// Создаем div для выбора компьютера
	const compChoiceDiv = document.createElement("div");
	compChoiceDiv.classList.add("comp-choice");
	const computerImg = document.createElement("img");
	computerImg.src = computerChoice.url;
	computerImg.alt = computerChoice.text;
	computerImg.title = `Компьютер выбрал: ${computerChoice.text}`;
	compChoiceDiv.appendChild(computerImg);

	// Добавляем div для компьютера через 2 секунды
	setTimeout(() => {
		result.appendChild(compChoiceDiv);
	}, 1000);

	// Определяем результат игры
	const whoWin = document.querySelector("#who-win");
	whoWin.textContent = "Су";
	setTimeout(() => {
		whoWin.textContent = "Ли";
	}, 500);
	setTimeout(() => {
		whoWin.textContent = "Фа";
	}, 1000);

	// Задержка перед выводом результата
	setTimeout(() => {
		if (userChoiceObj.text === computerChoice.text) {
			whoWin.textContent = `Ничья`;
			choicesUsPC.style.display = "flex";
		} else if (
			(userChoiceObj.text === "Камень" && computerChoice.text === "Ножницы") ||
			(userChoiceObj.text === "Ножницы" && computerChoice.text === "Бумага") ||
			(userChoiceObj.text === "Бумага" && computerChoice.text === "Камень")
		) {
			whoWin.textContent = `Победа`;
			choicesUsPC.style.display = "flex";
		} else {
			whoWin.textContent = `Проиграл`;
			choicesUsPC.style.display = "flex";
		}
	}, 1500); // Задержка перед определением результата
}

// Добавление обработчиков событий к кнопкам
document.querySelectorAll(".button").forEach((button) => {
	button.addEventListener("click", () => {
		choicesUsPC.style.display = "none";
		const userChoice = button.innerText; // Получаем текст кнопки
		play(userChoice); // Передаём текст кнопки в функцию play
	});
});
