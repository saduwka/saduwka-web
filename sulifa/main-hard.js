const choices = [
	{ text: "Камень", url: "./assets/rock.png" },
	{ text: "Ножницы", url: "./assets/scissors.png" },
	{ text: "Бумага", url: "./assets/paper.png" },
];

const result = document.querySelector("#result");
const choicesUsPC = document.querySelector(".choices");
const counterWin = document.querySelector(".counter-win");
const counterLoss = document.querySelector(".counter-loss");
const counterDraw = document.querySelector(".counter-draw");

let winValue = 0;
let lossValue = 0;
let drawValue = 0;

// Обновление счетчиков
const updateWin = (value) => {
	winValue += value;
	counterWin.textContent = winValue;
};
const updateLoss = (value) => {
	lossValue += value;
	counterLoss.textContent = lossValue;
};
const updateDraw = (value) => {
	drawValue += value;
	counterDraw.textContent = drawValue;
};

// Функция для получения выбора компьютера
function getComputerChoice(userChoiceText) {
	// Логика для того, чтобы компьютер выбирал вариант, который бьет выбор пользователя
	if (userChoiceText === "Камень") {
		return choices[2]; // Камень -> Бумага
	} else if (userChoiceText === "Ножницы") {
		return choices[0]; // Ножницы -> Камень
	} else if (userChoiceText === "Бумага") {
		return choices[1]; // Бумага -> Ножницы
	}
}

// Основная функция игры
function play(userChoiceText) {
	const userChoiceObj = choices.find(
		(choice) => choice.text === userChoiceText,
	);

	if (!userChoiceObj) {
		console.error("Некорректный выбор пользователя:", userChoiceText);
		return;
	}

	// Очищаем результат перед добавлением новых элементов и показываем спиннер
	result.innerHTML = "<div class='spinner'></div>";

	// Выбор компьютера, который побеждает выбор пользователя
	const computerChoiceObj = getComputerChoice(userChoiceText);

	// Создаем div для выбора пользователя
	const userChoiceDiv = document.createElement("div");
	userChoiceDiv.classList.add("user-choice");
	const userImg = document.createElement("img");
	userImg.src = userChoiceObj.url;
	userImg.alt = userChoiceObj.text;
	userImg.title = `Ты выбрал: ${userChoiceObj.text}`;
	userChoiceDiv.appendChild(userImg);

	// Добавляем div для пользователя через 1 секунду
	setTimeout(() => {
		result.appendChild(userChoiceDiv);

		// Убираем спиннер после 1 секунды (когда пользовательский выбор добавлен)
		const spinner = document.querySelector(".spinner");
		if (spinner) spinner.remove();
	}, 1000);

	// Создаем div для выбора компьютера
	const compChoiceDiv = document.createElement("div");
	compChoiceDiv.classList.add("comp-choice");
	const computerImg = document.createElement("img");
	computerImg.src = computerChoiceObj.url;
	computerImg.alt = computerChoiceObj.text;
	computerImg.title = `Компьютер выбрал: ${computerChoiceObj.text}`;
	compChoiceDiv.appendChild(computerImg);

	// Добавляем div для компьютера через 2 секунды
	setTimeout(() => {
		result.appendChild(compChoiceDiv);
	}, 2000);

	// Отображаем анимацию "Су-Ли-Фа"
	const whoWin = document.querySelector("#who-win");
	whoWin.textContent = "Су";
	setTimeout(() => {
		whoWin.textContent = "Ли";
	}, 500);
	setTimeout(() => {
		whoWin.textContent = "Фа";
	}, 1000);

	// Определяем результат игры через 3 секунды
	setTimeout(() => {
		if (userChoiceObj.text === computerChoiceObj.text) {
			whoWin.textContent = "Ничья!";
			updateDraw(1);
		} else if (
			(userChoiceObj.text === "Камень" &&
				computerChoiceObj.text === "Ножницы") ||
			(userChoiceObj.text === "Ножницы" &&
				computerChoiceObj.text === "Бумага") ||
			(userChoiceObj.text === "Бумага" && computerChoiceObj.text === "Камень")
		) {
			whoWin.textContent = "Победа!";
			updateWin(1);
		} else {
			whoWin.textContent = "Проиграл";
			updateLoss(1);
		}

		// Показать кнопки после вычисления результата
		choicesUsPC.style.display = "flex";
	}, 3000);
}

// Добавление обработчиков событий к кнопкам
document.querySelectorAll(".button").forEach((button) => {
	button.addEventListener("click", () => {
		choicesUsPC.style.display = "none"; // Скрыть кнопки выбора после нажатия
		const userChoice = button.innerText; // Получаем текст кнопки
		play(userChoice); // Передаем текст кнопки в функцию play
	});
});
