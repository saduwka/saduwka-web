// const getData = new Promise((res, rej) => {
// 	console.log("Запрос был отправлен");

// 	setTimeout(() => {
// 		res("user: Alex");
// 	}, 1500);
// });

// getData.then((res) => {
// 	console.log("Полученные данные:", res);
// });

const gerGeolocation = () => {
	// Функция возвращает promise, потому что мы не знаем, когда юзер нажмет на Ок или закроет окно
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		} else {
			reject(new Error("Geolocation is not supported in your browser"));
		}
	});
};

gerGeolocation()
	.then((position) => {
		console.log("Пользователь разрешил");
		console.log(position);
	})
	.catch(() => {
		console.log("Пользователь отклонил");
	})
	.finally(() => {
		console.log("Завершили с локацией");
	});
