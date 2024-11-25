// for (let num = 10; num >= 0; num--) {
//     if (num % 2 == 0) {
//     console.log(num);
//     }
// }

// let str = "Hello";


// //length возвращает длину строки
// console.log(str.length);
// // console.log(str[1]);

// for (let i = 0; i < str.length; i++) {
//     console.log("индекс ", i);
//     console.log("буква ", str[i]);
// }

// for (let i = str.length - 1; i >= 0; i--) {
//     console.log(str[i]);
// }


// let str = "hello";
// let str1 = " world";

// console.log(str + str1);

// str = str.concat(str1);

// console.log(str);

// for (let i = 0; i < str1.length; i++) {
//     str += str1[i];
//     console.log(str);
// }

let str = "    text more here  ";

console.log(str.length);

//includes проверяет содержит ли строка str подстроку которую мы передадим в круглых скобках
console.log(str.includes("te", 1));

console.log(str.at(2)); // если не найдет символ - вернет undefined
console.log(str.charAt(2));// если не найдет символ - вернет ""
console.log(str.startsWith("asd")); 
console.log(str.slice(-4, -1)); // -  начинаем с правой стороны
console.log(str.slice(2)); //убираем все до 2 индекса
console.log(str.indexOf("x")); // вернет индекс строки
console.log(str.indexOf("K")); // вернет индекс строки, если символа нет вернет -1
console.log(str.trim()); // обрезает пробелы в начале и в конце строки
console.log(str.toLowerCase());
console.log(str.toUpperCase());












