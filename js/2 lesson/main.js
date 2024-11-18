// let userAge = +prompt("Укажите ваш возраст"); //+ из строки в число

// console.log(userAge);


// //if - если
// //() условие
// //{} логика работы
// //else - иначе, сработает если if false
// if (userAge > 18) {
//     alert("Вы совершеннолетний");
// } else {
//     alert("Вам нет 18 лет");
// }

// 

// let num = +prompt("Введите число от 10 до 20");

// // && - and - логическая И
// if (num >= 10 && num <= 20) {
//     console.log("OK");
// } else {
//     console.log("Error");
// }



// // || - or логическое ИЛИ
// let color = prompt("Введите цвет");

// // == - проверка равенство
// if (color == "red" || color == "green") {
//     console.log("Good color");
// } else {
//     console.log("Bad color");
// }

// let num = +prompt();

// if (num < 0) {
//     console.log("Число отрицательное");
// } else if (num > 0) {
//     console.log("Число положительное");
// } else if (num == 0) {
//     console.log("Число равно нулю");
// } else {
//     console.log("Вы ввели не число");
// }


/* 
    > - Больше
    >= - Больше или равно
    < - Меньше
    <= - Меньше или равно
    == - Проверка на равенство
    != - Проверка на не равенство

    ! - Частичка НЕ
*/

/*  То что изначально FALSE

    0 - false
    "" - false (Пустая строка)
    false - false
    undefined - false
    null - false
*/

// let num = +prompt("Введите число");

// if (num % 2 == 0) {
//     console.log("Четное");
// } else {
//     console.log("Нечетное");
// }
    

// let word = prompt();

// if (word == "") {
//     console.log("Строка пустая");
// } else { 
//     console.log("Строка заполнена");
    
// }

// let a = +prompt("Введите числа а");
// let b = +prompt("Введите числа b");

// if (a > b) {
//     console.log("Числа а больше b");
// } else {
//     console.log("Числа b больше a");
// }

// let month = +prompt ("Введите номер месяца");
// if (month >= 3 && month <=5) {
//     console.log("Весна");
// } else if (month >= 6 && month <= 8) {
//     console.log("Лето");
// } else if (month >= 9 && month <= 11) {
//     console.log("Осень");
// } else if (month == 12 || month <= 2 && month > 0) {
//     console.log("Зима");
// } else {
//     console.log("Нет такого времени года");
// }


let a = +prompt("a");
let b = +prompt("b");

if (a == b) {
    console.log("Равны");
} else if (a % b == 0 || b % a == 0) {
    console.log("Числа кратны");
} else if (a % b != 0 || b % a != 0) {
    console.log("Числа некратны");
} else {
    console.log("Числа неравны");
}
