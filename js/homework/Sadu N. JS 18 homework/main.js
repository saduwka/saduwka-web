const resultImg = document.querySelector("#result-img");
const submitBtn = document.querySelector("#submit");

const RANDOM_DOG_URL = "https://dog.ceo/api/breeds/image/random";

const randomDog = () => {
	fetch(RANDOM_DOG_URL)
		.then((res) => res.json())
		.then((randomDogResult) => {
			insertRandomDog(randomDogResult);
		})
		.catch((error) => {
			console.error("Ошибка при получении данных:", error);
		});
};

const insertRandomDog = (data) => {
	resultImg.setAttribute("src", data.message);
	resultImg.setAttribute("alt", "Random Dog");
};

submitBtn.addEventListener("click", () => {
	randomDog();
});
