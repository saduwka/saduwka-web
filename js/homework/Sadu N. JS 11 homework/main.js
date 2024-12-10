const profile = document.querySelector(".profile");
const newName = document.createElement("h2");
const newDescription = document.createElement("p");

const inputName = prompt("Введите имя");
const inputDescription = prompt("Введите описание");

newName.textContent = inputName;
newDescription.textContent = inputDescription;

profile.append(newName);
profile.append(newDescription);

