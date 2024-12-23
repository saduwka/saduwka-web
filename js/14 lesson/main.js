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
let canTouch = true;

const boardElem = document.querySelector(".board");
const restartBtn = document.querySelector(".restart");
const score = document.querySelector(".scores");
let points = 0;

restartBtn.addEventListener("click", () => {
	points = 0;
	score.textContent = 0;
	clearBoard();
	createBoard();
});

const clearBoard = () => {
	const boardCards = Array.from(boardElem.childNodes);
	boardCards.forEach((card) => {
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
		cardElem.classList.add("card-wrapper");
		cardElem.textContent = card.text;
		cardElem.dataset.name = card.text;

		boardElem.appendChild(cardElem);
	});
};

const unflipCards = () => {
	if (firstCard && secondCard) {
		canTouch = false;
		setTimeout(() => {
			firstCard.classList.remove("flip");
			secondCard.classList.remove("flip");

			firstCard = null;
			secondCard = null;
			canTouch = true;
		}, 1000);
	}
};

const updateScore = (value) => {
	points += value;
	score.textContent = points;
};

const hideMatchedCards = () => {
	if (firstCard && secondCard) {
		canTouch = false;
	}
	setTimeout(() => {
		firstCard.style.opacity = "0";
		firstCard.classList.remove("card");
		firstCard = null;

		secondCard.style.opacity = "0";
		secondCard.classList.remove("card");
		secondCard = null;

		canTouch = true;
	}, 1000);
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
	if (!canTouch) {
		return;
	}
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
		canTouch = false;
		match
			? (hideMatchedCards(), updateScore(50))
			: (unflipCards(), updateScore(-50));
	}

	console.log(points);

	console.log(firstCard);
	console.log(secondCard);
};

createBoard();
boardElem.addEventListener("click", flipCard);
