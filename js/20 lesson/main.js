const SERVER_URL = "https://db6c-185-217-190-130.ngrok-free.app";

// /register
// /login
// /protected

const formRegister = document.querySelector(".form-register");
const phoneInpRegister = document.querySelector("#user-phone");
const emailInpRegister = document.querySelector("#user-email");
const passInpRegister = document.querySelector("#user-pass");
const passHint = document.querySelector("#pass-hint");

const formLogin = document.querySelector(".form-login");
const emailInpLogin = document.querySelector("#login-email");
const passInpLogin = document.querySelector("#login-pass");

const alertArea = document.querySelector("#alert");

const registerUser = async (e) => {
	e.preventDefault();

	const phone = phoneInpRegister.value;
	const email = emailInpRegister.value;
	const pass = passInpRegister.value;

	const res = await fetch(`${SERVER_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			phone: phone,
			email: email,
			password: pass,
		}),
	});

	const data = await res.json();
	return data;
};

const loginUser = async (e) => {
	e.preventDefault();

	const email = emailInpLogin.value;
	const pass = passInpLogin.value;

	const res = await fetch(`${SERVER_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: pass,
		}),
	});

	const data = await res.json();
	localStorage.setItem("AUTH_TOKEN", data.token);
	console.log(data.message);

	if (res.status === 400) {
		alertArea.innerHTML = `${data.message}`;
		return;
	}

	return data;
};

const getInfo = async () => {
	const token = localStorage.getItem("AUTH_TOKEN");

	if (!token) {
		console.log("Вы не вошли в свой аккаунт");
		return;
	}

	const res = await fetch(`${SERVER_URL}/protected`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.status === 401) {
		localStorage.removeItem("AUTH_TOKEN");
		window.location.reload();
	}
	const data = res;
	console.log(data);
};

const init = async () => {
	await getInfo();
};

init();

formLogin.addEventListener("submit", loginUser);
formRegister.addEventListener("submit", registerUser);

phoneInpRegister.addEventListener("input", (e) => {
	let value = phoneInpRegister.value.replace(/\D/g, "");
	let formattedValue = "+7";
	if (value.length > 1) {
		console.log(value.substring(1, 4)); //код телефонна (701
		formattedValue += "(" + value.substring(1, 4);
	}

	if (value.length >= 4) {
		formattedValue += ") " + value.substring(4, 7);
	}

	if (value.length >= 7) {
		formattedValue += "-" + value.substring(7, 9);
	}
	if (value.length >= 9) {
		formattedValue += "-" + value.substring(9, 11);
	}

	phoneInpRegister.value = formattedValue;
});

phoneInpRegister.addEventListener("blur", () => {
	const phoneRegex = /^\+7\(\d{3}\) \d{3}-\d{2}-\d{2}/;

	if (!phoneRegex.test(phoneInpRegister.value)) {
		alert("Неверный формат");
		phoneInpRegister.style.backgroundColor = "#ffe6e6";

		setTimeout(() => {
			phoneInpRegister.style.backgroundColor = "";
		}, 1000);
	}
});

passInpRegister.addEventListener("input", (e) => {
	passHint.style.display = "block";
	let value = passInpRegister.value;
	const passRegex =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/;
	if (value.length < 5) {
		passInpRegister.style.backgroundColor = "#ffe6e6";
	} else if (!passRegex.test(value)) {
		passInpRegister.style.backgroundColor = "#ffe6e6";
	} else {
		passInpRegister.style.backgroundColor = "";
	}
});

passInpRegister.addEventListener("blur", () => {
	passHint.style.display = "";
});

// i - нечувствительность к регистру

// const regex = /hello/i;

// const regex = /^[a-zA-Z]$/; // только латинские буквы
// const userInput = "Hello world";

// console.log(regex.test(userInput));

const passRegex =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/;
