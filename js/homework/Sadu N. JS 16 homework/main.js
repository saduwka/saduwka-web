let title = [];

const container = document.querySelector(".container");

const getTitle = () => {
	fetch("https://jsonplaceholder.typicode.com/todos", {
		method: "GET",
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			console.log(response);
		})
		.then((data) => {
			console.log(data);
			data.forEach((note) => {
				const div = document.createElement("div");
				const titleElem = document.createElement("div");

				titleElem.textContent = note.title;

				div.appendChild(titleElem);

				container.append(div);
			});
		});
};

getTitle();
