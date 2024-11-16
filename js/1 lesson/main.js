// //  let для создания переменной

// let num = 43;
// let num1 = 12;

// //console.log - выводит значение в консоль
// console.log(num + num1);

// // типы данных

// // 1 - number - числовой тип данных (4, 1.2, -3, 0, 0.3333)

// // // 2 - string - строковый тип данных (текст) ('text', "text")
// // let text = "Hello world";

// // // 3 - boolean - логический тип данных (true of false)
// // let isMobile = true;

// // console.log("переменная text =", text);
// // console.log("переменная isMobile =", isMobile);

// let a = 5;
// let b = 8.3;
// let typeB = typeof(b);

// // typeof - показывает какой тип данных у переменной
// console.log(typeof(a));

// console.log("переменная typeB =", typeB);


// //prompt - ручной ввод данных
// let c = prompt();

// console.log("переменная c=", c);

// /// из prompt всегда будет приходить string
// console.log(typeof(c));


// // Number() - переводит значение в числовой тип
// // если не получилось то запишется NaN (not a number - не число) 
// let typeC = typeof(Number(c));
// let convertedC = Number(c);

// console.log(typeC);
// console.log(convertedC);
// //5+8.3=13.3 + 20 = 13.320
// console.log("сумма =", a + b + convertedC);

// let d = Number(prompt());

// console.log("a + d = ", a + d);


// '' is not definer = переменная не найдена


// let a = Number(prompt("Введите длину прямоугольника"));
// let b = Number(prompt("Введите ширину прямоугольника"));

// let squareP = (a + b) * 2;

// console.log("Периметр = ", squareP);

// let squareS = a * b;

// console.log("Площадь =", squareS);

// let c = Number(prompt("Введите радиус круга"));

// let circleS = 3.14 * (c * c);

// console.log("Площадь круга =", circleS);

// let circleD = 2 * 3.14 * c;

// console.log("Длина окружности =", circleD);

// let d = Number(prompt("Сторона треугольника А"));
// let e = Number(prompt("Сторона треугольника B"));
// let f = Number(prompt("Сторона треугольника C"));

// let triangleP = d + e + f;

// console.log("Площадь треугольника =", triangleP);

let num = 6;
let num1 = 7;
// ** - Возведение в степень 6^7 = 6 ** 7
console.log(num ** num1);

// % - остаток при делении
console.log(num1 % 2);
console.log(num % 2);


let userName = prompt("Введите ваше имя");
let userAge = Number (prompt("Введите ваш возраст"));
let userHeight = Number (prompt("Рост"));
let userWeight = Number (prompt("Вес"));

let manNorm = userWeight / (userHeight ** 2);
let manYour = userWeight - manNorm ;

console.log("Здравствуйте", userName);
console.log("Ваша норме веса =", manNorm);
console.log("Разница от нормы =", manYour);