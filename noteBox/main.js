const inputNotes = document.querySelector("#input-text");
const saveBtn = document.querySelector("#save");
const noteArea = document.querySelector("#notes");
const deleteBtnShow = document.querySelector("#delete-show");

document.addEventListener("DOMContentLoaded", () => {
	const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
	savedNotes.forEach((note) => {
		addNoteToDOM(note);
	});
});

saveBtn.addEventListener("click", (event) => {
	event.preventDefault();

	const inputValue = inputNotes.value.trim();
	if (inputValue === "") return;

	addNoteToDOM(inputValue);
	saveNoteToStorage(inputValue);
	inputNotes.value = "";
});

function addNoteToDOM(noteText) {
	const newNote = document.createElement("li");
	const newNoteText = document.createElement("span");
	newNoteText.textContent = noteText;
	newNote.appendChild(newNoteText);
	noteArea.appendChild(newNote);

	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "х";
	deleteBtn.classList.add("delete-btn");
	deleteBtn.addEventListener("click", () => {
		newNote.remove();
		deleteNoteFromStorage(noteText);
	});

	newNote.appendChild(newNoteText);
	newNote.appendChild(deleteBtn);
	noteArea.appendChild(newNote);
}

function saveNoteToStorage(noteText) {
	const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
	savedNotes.push(noteText);
	localStorage.setItem("notes", JSON.stringify(savedNotes));
}

function deleteNoteFromStorage(noteText) {
	let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
	savedNotes = savedNotes.filter((note) => note !== noteText);
	localStorage.setItem("notes", JSON.stringify(savedNotes));
}

deleteBtnShow.addEventListener("click", (event) => {
	event.preventDefault();
	const deleteBtns = document.querySelectorAll(".delete-btn");
	deleteBtns.forEach((btn) => {
		btn.style.display = "inline-block";
	});
});
