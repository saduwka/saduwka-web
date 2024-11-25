// //текущая дата и время
// let now = new Date();

// console.log(now);

// // 1 января 1970 unix время - время начало на компьютерах
// // Получим милисек
// let time = new Date ().getTime();

// console.log(time);

// let year = now.getFullYear();
// let month = now.getMonth();
// let date = now.getDate(); //число
// let day = now.getDay();
// console.log(year, month, date, day);

// //январь имеет индекс 0
// let specDate = new Date (2024 , 11, 31, 10, 15, 30);
// let specDate1 = new Date ("2024-12-25T10:20:30")

// console.log(specDate);
// console.log(specDate1);

// let dateDifference = specDate - specDate1;
// console.log(dateDifference);

// let msToHours = 60 * 60 * 1000

// let dateDifferenceInHours = dateDifference / msToHours;
// console.log(dateDifferenceInHours);


//const - перезаписать нельзя
// const PI = Math.PI; //3.14.....
// const e = Math.E;// 2.7....

// console.log(PI);
// console.log(e);

// const num = 4.49816;

// const round = Math.round(num); // округляет математически
// const floor = Math.floor(num); // округляет в меньшую
// const ceil = Math.ceil(num); //округляет в большую

// console.log("num", num);
// console.log("round", round);
// console.log("floor", floor);
// console.log("ceil", ceil);

// const pow = Math.pow(4, 3); // 4^3 == 4 ** 3
// const sqrt = Math.sqrt(16); // корень из 16

// const min = Math.min(PI, e, num);
// const max = Math.max(PI, e, num);

// console.log("Min",min);
// console.log("Max",max);

// const dec = Math.round(num * 100) / 100;
// console.log(dec);

// const randomNum = Math.floor(Math.random() * 10) + 1;
// console.log(randomNum);

// const input = +prompt();
// const randomNum = Math.floor(Math.random() * 10) + 1;
// let count = 0;



// for (let i = 0; i < 100; i++){
    
//     const randomNum = Math.floor(Math.random() * 10) + 1;
    
//     if (input == randomNum){
//         count++
//     }
// }
// console.log(count);

// const now = new Date();
// const userDays = +prompt();

// let result = new Date();
// result.setDate(now.getDate() + userDays);

// console.log(result);

const randomNum = Math.floor(Math.random() * 10) + 1;
let userNum = +prompt();


// while (true) бесконечный цикл 
while (true) {
    if (randomNum == userNum) {
        console.log("Success");
        break;
    } 
    userNum = +prompt();
}







