let now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();
let hours = now.getHours();
let min = now.getMinutes();
console.log(`${year}-${month}-${date} ${hours}:${min}`);

let day = now.getDay();
if (day == 1) {
    console.log(`День недели: Понедельник`);
}
if (day == 2) {
    console.log(`День недели: Вторник`);
}
if (day == 3) {
    console.log(`День недели: Среда`);
}
if (day == 4) {
    console.log(`День недели: Четверг`);
}
if (day == 5) {
    console.log(`День недели: Пятница`);
}
if (day == 6) {
    console.log(`День недели: Суббота`);
}
if (day == 7) {
    console.log(`День недели: Воскресенье`);
}

let yearStart = new Date (2024, 0, 1);
let dateDifference = now - yearStart;
let msToDay = 60 * 60 * 1000 * 24;
let dateDifferenceInDay = dateDifference / msToDay;
const round = Math.round(dateDifferenceInDay);
console.log(`Количество дней прошедших с начало года = ${round}`);



