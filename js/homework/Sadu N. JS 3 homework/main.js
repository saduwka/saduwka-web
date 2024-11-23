let num = 1;
let sum = 0;

while (num <= 100) {
    if (num % 2 !== 0) {
        sum = sum + num;
    }
    num++;
}
console.log (sum)

let num1 = -50;

while (num1 >= -150) {
    console.log(num1);
    num1--;   
}

let num3 = 1;
let sum3 = 0;

while (num3 <= 50) {
    if (num3 % 2 == 0 || num3 % 5 == 0){
        num3++;
        continue;
    } else {
    sum3 = sum3 + num3;
    num3++;
    }
    
}

console.log(sum3);

let num4 = +prompt("Введите число кратное 3"); 

if (num4 % 3 == 0) {
    console.log("Success");
} else {
    console.log("Число не кратно 3, попробуйте снова.");
}




