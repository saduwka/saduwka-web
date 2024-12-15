const weekDay = document.querySelector("#weekday");
const task = document.querySelector("#task");

console.log(weekDay);
console.log(task);

const mondayTask = document.querySelector(".monday-task-par");
const tuesdayTask = document.querySelector(".tuesday-task-par");
const wednesdayTask = document.querySelector(".wednesday-task-par");
const thursdayTask = document.querySelector(".thursday-task-par");
const fridayTask = document.querySelector(".friday-task-par");
const saturdayTask = document.querySelector(".saturday-task-par");
const sundayTask = document.querySelector(".sunday-task-par");
const writeBtn = document.querySelector(".submit-btn");

writeBtn.addEventListener("click", (event) => {
	event.preventDefault();
	const taskValue = task.value;
	const weekDayValue = weekDay.value;
	console.log(taskValue);
	console.log(weekDayValue);

	if (taskValue == "") {
		alert("Введите задачу");
	} else if (weekDayValue == "monday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		mondayTask.appendChild(newTask);
	} else if (weekDayValue == "tuesday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		tuesdayTask.appendChild(newTask);
	} else if (weekDayValue == "wednesday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		wednesdayTask.appendChild(newTask);
	} else if (weekDayValue == "thursday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		thursdayTask.appendChild(newTask);
	} else if (weekDayValue == "friday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		fridayTask.appendChild(newTask);
	} else if (weekDayValue == "saturday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		saturdayTask.appendChild(newTask);
	} else if (weekDayValue == "sunday") {
		const newTask = document.createElement("li");
		newTask.textContent = taskValue;
		sundayTask.appendChild(newTask);
	} else if (weekDayValue == "") {
		alert("Выбери день недели");
	}

	task.value = "";
	weekDay.value = "";
});
