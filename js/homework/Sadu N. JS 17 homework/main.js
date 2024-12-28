const container = document.querySelector(".container");

const getImages = () => {
	fetch("https://jsonplaceholder.typicode.com/photos", { method: "GET" })
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			console.log(response);
		})
		.then((data) => {
			console.log(data);

			data.forEach((image) => {
				const div = document.createElement("div");
				const imageElem = document.createElement("img");

				imageElem.setAttribute("src", `${image.url}`);
				imageElem.setAttribute("alt", `Image`);

				div.append(imageElem);
				container.append(div);
			});
		});
};
getImages();
