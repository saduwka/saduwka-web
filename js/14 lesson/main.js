const cardsArr = [
	{ text: "A", id: 1 },
	{ text: "A", id: 2 },
	{ text: "B", id: 3 },
	{ text: "B", id: 4 },
	{ text: "C", id: 5 },
	{ text: "C", id: 6 },
	{ text: "D", id: 7 },
	{ text: "D", id: 8 },
	{ text: "E", id: 9 },
	{ text: "E", id: 10 },
	{ text: "F", id: 11 },
	{ text: "F", id: 12 },
];

let firstCard = null;
let secondCard = null;

const boardElem = document.querySelector(".board");
const restartBtn = document.querySelector(".restart");
const score = document.querySelector(".scores");
let points = 0;

restartBtn.addEventListener("click", () => {
	clearBoard();
});

const clearBoard = () => {
	const boardCards = boardElem.childNodes;
	boardCards.forEach((card) => {
		console.log(card);
		boardElem.removeChild(card);
	});
};

const shuffleCards = (cardsArr) => {
	for (let i = 0; i < cardsArr.length; i++) {
		const randomIndex = Math.floor(Math.random() * (cardsArr.length - 1));

		[cardsArr[i], cardsArr[randomIndex]] = [cardsArr[randomIndex], cardsArr[i]];
	}
	return cardsArr;
};

const createBoard = () => {
	const shuffledCards = shuffleCards(cardsArr);

	shuffledCards.forEach((card) => {
		const cardElem = document.createElement("div");
		cardElem.classList.add("card");
		cardElem.textContent = card.text;
		cardElem.dataset.name = card.text;

		boardElem.appendChild(cardElem);
	});
};

const unflipCards = () => {
	if (firstCard && secondCard) {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
	}
};

/* 
    1) Проверка двойного клика на одну и ту же карточку
    2) Перемещать карточки
    3) Скрыть обложки (css)
    4) Счетчик (+50 за верный, -50 за не правильный)
    5) Кнопка рестарта (Либо если счет ушел в минус)

*/

const updateScore = (value) => {
	points += value;
	score.textContent = points;
};

const hideMatchedCards = () => {
	if (firstCard && secondCard) {
		firstCard.style.display = "none";
		secondCard.style.display = "none";
	}
};

const checkCards = () => {
	const firstCardName = firstCard.dataset.name;
	const secondCardName = secondCard.dataset.name;

	if (firstCard == secondCard) {
		return false;
	}
	return firstCardName == secondCardName;
};

const flipCard = (event) => {
	const target = event.target;
	const card = target.closest(".card");
	console.log(event);

	if (card && firstCard != card) {
		card.classList.add("flip");
	}

	if (!firstCard) {
		firstCard = card;
	} else if (!secondCard) {
		secondCard = card;
	}
	if (firstCard && secondCard) {
		const match = checkCards();
		match
			? (hideMatchedCards(), updateScore(50))
			: (unflipCards(), updateScore(-50));
		firstCard = null;
		secondCard = null;
	}

	console.log(points);

	console.log(firstCard);
	console.log(secondCard);
};

createBoard();
boardElem.addEventListener("click", flipCard);

// = - присваивание
// == - проверка на равенство (по значению)
// === - проверка на равенство (по значению и по типу)
