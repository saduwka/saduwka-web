const choices = ["Камень", "Ножницы", "Бумага"];
const result = document.querySelector("#result");

// Функция для обработки игры
function play(userChoice) {
	// Генерация случайного выбора компьютера
	const computerChoice = choices[Math.floor(Math.random() * choices.length)];
	console.log(`Компьютер выбрал: ${computerChoice}`);
	console.log(`Ты выбрал: ${userChoice}`);

	// Определение результата
	if (userChoice === computerChoice) {
		result.textContent = `Компьютер выбрал ${computerChoice}, ты выбрал ${userChoice}. Это ничья.`;
	} else if (
		(userChoice === "Камень" && computerChoice === "Ножницы") ||
		(userChoice === "Ножницы" && computerChoice === "Бумага") ||
		(userChoice === "Бумага" && computerChoice === "Камень")
	) {
		result.textContent = `Компьютер выбрал ${computerChoice}, ты выбрал ${userChoice}. Это победа!`;
	} else {
		result.textContent = `Компьютер выбрал ${computerChoice}, ты выбрал ${userChoice}. Ты проиграл.`;
	}
}

// Привязка кнопок к игре
document.querySelectorAll(".button").forEach((button) => {
	button.addEventListener("click", () => {
		const userChoice = button.innerText;
		play(userChoice);
	});
});
