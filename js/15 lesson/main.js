let users = [];

const container = document.querySelector(".container");

const getUsers = () => {
	fetch("https://jsonplaceholder.typicode.com/users", {
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

			data.forEach((user) => {
				const div = document.createElement("div");
				const userNameElem = document.createElement("div");
				const userPhoneElem = document.createElement("div");

				userNameElem.textContent = user.name;
				userPhoneElem.textContent = user.phone;

				div.append(userNameElem);
				div.append(userPhoneElem);

				container.append(div);
			});
		})
		.catch((error) => {})
		.finally(() => {});
};

//catch
//then - действия при успешном выполнении запроса

getUsers();

console.log(users);
