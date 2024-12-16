const chooseDay = document.querySelector("#input-date");
const submitBtn = document.querySelector(".submit-btn");
const task = document.querySelector("#task-text");
const tasksText = document.querySelector(".tasks-text");

const januaryTask = document.querySelector("#january-task");
const februaryTask = document.querySelector("#february-task");
const marchTask = document.querySelector("#march-task");
const aprilTask = document.querySelector("#april-task");
const mayTask = document.querySelector("#may-task");
const juneTask = document.querySelector("#june-task");
const julyTask = document.querySelector("#july-task");
const augustTask = document.querySelector("#august-task");
const septemberTask = document.querySelector("#september-task");
const octoberTask = document.querySelector("#october-task");
const novemberTask = document.querySelector("#november-task");
const decemberTask = document.querySelector("#december-task");

const januaryTask2025 = document.querySelector("#january-task-2025");
const februaryTask2025 = document.querySelector("#february-task-2025");
const marchTask2025 = document.querySelector("#march-task-2025");
const aprilTask2025 = document.querySelector("#april-task-2025");
const mayTask2025 = document.querySelector("#may-task-2025");
const juneTask2025 = document.querySelector("#june-task-2025");
const julyTask2025 = document.querySelector("#july-task-2025");
const augustTask2025 = document.querySelector("#august-task-2025");
const septemberTask2025 = document.querySelector("#september-task-2025");
const octoberTask2025 = document.querySelector("#october-task-2025");
const novemberTask2025 = document.querySelector("#november-task-2025");
const decemberTask2025 = document.querySelector("#december-task-2025");

submitBtn.addEventListener("click", (event) => {
	event.preventDefault();
	const dateValue = chooseDay.value;
	const taskValue = task.value;

	const year = dateValue.slice(0, 4);
	const month = dateValue.slice(5, 7);
	const day = dateValue.slice(8);

	console.log(year);

	// prettier-ignore
	const monthNames = {
		"01": "января",
		"02": "февраля",
		"03": "марта",
		"04": "апреля",
		"05": "мая",
		"06": "июня",
		"07": "июля",
		"08": "августа",
		"09": "сентября",
		"10": "октября",
		"11": "ноября",
		"12": "декабря",
	};

	const monthName = monthNames[month];
	console.log(monthName);

	if (dateValue == "") {
		alert("Выберите дату");
		return;
	} else if (taskValue == "") {
		alert("Введите задачу");
		return;
	}

	const newTask = document.createElement("li");

	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.addEventListener("change", () => {
		if (checkBox.checked) {
			newTask.style.textDecoration = "line-through";
		} else {
			newTask.style.textDecoration = "none";
		}
	});

	const taskText = document.createElement("span");
	taskText.textContent = ` ${day} ${monthName}: ${taskValue}`;

	newTask.appendChild(checkBox);
	newTask.appendChild(taskText);
	// tasksText.appendChild(newTask);
	if (month == "01" && year == "2024") {
		januaryTask.appendChild(newTask);
	} else if (month == "02" && year == "2024") {
		februaryTask.appendChild(newTask);
	} else if (month == "03" && year == "2024") {
		marchTask.appendChild(newTask);
	} else if (month == "04" && year == "2024") {
		aprilTask.appendChild(newTask);
	} else if (month == "05" && year == "2024") {
		mayTask.appendChild(newTask);
	} else if (month == "06" && year == "2024") {
		juneTask.appendChild(newTask);
	} else if (month == "07" && year == "2024") {
		julyTask.appendChild(newTask);
	} else if (month == "08" && year == "2024") {
		augustTask.appendChild(newTask);
	} else if (month == "09" && year == "2024") {
		septemberTask.appendChild(newTask);
	} else if (month == "10" && year == "2024") {
		octoberTask.appendChild(newTask);
	} else if (month == "11" && year == "2024") {
		novemberTask.appendChild(newTask);
	} else if (month == "12" && year == "2024") {
		decemberTask.appendChild(newTask);
	} else if (month == "01" && year == "2025") {
		januaryTask2025.appendChild(newTask);
	} else if (month == "02" && year == "2025") {
		februaryTask2025.appendChild(newTask);
	} else if (month == "03" && year == "2025") {
		marchTask2025.appendChild(newTask);
	} else if (month == "04" && year == "2025") {
		aprilTask2025.appendChild(newTask);
	} else if (month == "05" && year == "2025") {
		mayTask2025.appendChild(newTask);
	} else if (month == "06" && year == "2025") {
		juneTask2025.appendChild(newTask);
	} else if (month == "07" && year == "2025") {
		julyTask2025.appendChild(newTask);
	} else if (month == "08" && year == "2025") {
		augustTask2025.appendChild(newTask);
	} else if (month == "09" && year == "2025") {
		septemberTask2025.appendChild(newTask);
	} else if (month == "10" && year == "2025") {
		octoberTask2025.appendChild(newTask);
	} else if (month == "11" && year == "2025") {
		novemberTask2025.appendChild(newTask);
	} else if (month == "12" && year == "2025") {
		decemberTask2025.appendChild(newTask);
	} else {
		alert("Неверные данные");
	}

	chooseDay.value = "";
	task.value = "";
});

const acc = document.getElementsByClassName("accordion");

const accordions = document.querySelectorAll(".accordion");

for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");

		const panel = this.nextElementSibling;
		if (panel.style.display === "flex") {
			panel.style.display = "none";
		} else {
			panel.style.display = "flex";
		}
	});
}
