// const fruits = ["apple", "lemon", "banana"];
// console.log(fruits);
// console.log(fruits[1]);


// const studentsArray = [
//     {
//         name: "Ruslan",
//         age: 22,
//     },
//     {
//         name: "Alex",
//         age: 33,
//     },
//     {
//         name: "Ivan",
//         age: 44,
//     },
// ];

// console.log(studentsArray);

// const car = {};

// console.log(car); 

// car.color = "red";

// console.log(car);

const car = {};
const carSpec = {};
car.color = prompt("Color");
car.price = +prompt("Price");
car.availability = confirm("Есть в наличии?")
car.spec = carSpec;
carSpec.speed = +prompt("Speed");
carSpec.engineType = prompt("Engine type");
carSpec.wheel = prompt("Wheel");

console.log(car);

for (const key in car) {
    // console.log(key);
    // console.log(`key - ${key}, value - ${car[key]}`);    
    console.log(key, car[key]);
}