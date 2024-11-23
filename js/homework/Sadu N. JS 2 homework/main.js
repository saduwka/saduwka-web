let grade = +prompt("Введите свой балл");

if (grade >= 90) {
    console.log("A");
} else if (grade >= 80 && grade <= 89) {
    console.log("B");
} else if (grade >= 70 && grade <= 79) {
    console.log("C");
} else if (grade >= 60 && grade <= 69) {
    console.log("D");
} else if (grade <= 60) {
    console.log("F");
} 

let dayNum = +prompt ("Введите число");

if (dayNum >= 1 && dayNum <= 5) {
    console.log("Рабочий день");
} else if (dayNum == 6 || dayNum == 7) {
    console.log("Выходной");
} else {
    console.log("Введите число от 1 до 7");
}

let birthDay = +prompt("Введите число вашего дня рождения");
let birthMonth = +prompt("Введите месяц");

if (((birthDay >= 21 && birthDay <= 31) && birthMonth == 3) || ((birthDay >= 1 && birthDay <= 20) && birthMonth == 4)) {
    console.log("Овен");
} else if (((birthDay >= 21 && birthDay <= 30) && birthMonth == 4) || ((birthDay >= 1 && birthDay <= 20) && birthMonth == 5)) {
    console.log("Телец");
} else if (((birthDay >= 21 && birthDay <= 31) && birthMonth == 5) || ((birthDay >= 1 && birthDay <= 21) && birthMonth == 6)) {
    console.log("Близнецы");
} else if (((birthDay >= 22 && birthDay <= 30) && birthMonth == 6) || ((birthDay >= 1 && birthDay <= 22) && birthMonth == 7)) {
    console.log("Рак");
} else if (((birthDay >= 23 && birthDay <= 31) && birthMonth == 7) || ((birthDay >= 1 && birthDay <= 23) && birthMonth == 8)) {
    console.log("Лев");
} else if (((birthDay >= 24 && birthDay <= 31) && birthMonth == 8) || ((birthDay >= 1 && birthDay <= 23) && birthMonth == 9)) {
    console.log("Дева");
} else if (((birthDay >= 24 && birthDay <= 30) && birthMonth == 9) || ((birthDay >= 1 && birthDay <= 23) && birthMonth == 10)) {
    console.log("Весы");
} else if (((birthDay >= 24 && birthDay <= 31) && birthMonth == 10) || ((birthDay >= 1 && birthDay <= 22) && birthMonth == 11)) {
    console.log("Скорпион");
} else if (((birthDay >= 23 && birthDay <= 30) && birthMonth == 11) || ((birthDay >= 1 && birthDay <= 21) && birthMonth == 12)) {
    console.log("Стрелец");
} else if (((birthDay >= 22 && birthDay <= 31) && birthMonth == 12) || ((birthDay >= 1 && birthDay <= 20) && birthMonth == 1)) {
    console.log("Козерог");
} else if (((birthDay >= 21 && birthDay <= 31) && birthMonth == 1) || ((birthDay >= 1 && birthDay <= 20) && birthMonth == 2)) {
    console.log("Водолей");
} else if (((birthDay >= 21 && birthDay <= 29) && birthMonth == 2) || ((birthDay >= 1 && birthDay <= 20) && birthMonth == 3)) {
    console.log("Рыбы");
} else {
    console.log("Введите корректную дату");
    
}

