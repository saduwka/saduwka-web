let vowels = "аеёиоыуэюяАЕЁИОЫУЭЮЯ";
let input = "а, е, ё, и, о, у, ы, э, ю, я";
let count = 0;

for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (vowels.includes(char)) {
        count++;
    }
}

console.log(`Количество гласных ${count}`);

let str = prompt("Введите строку");
let input1 = prompt("Введите символ");
let count1 = 0;

for (let i = 0; i < str.length; i++){
    if (str[i] == input1){
        count1++;
    }
}

console.log(`Количество символов в строке ${count1}`);

let str1 = prompt("Введите строку");
let revers = "";

for (let i = str1.length - 1; i >= 0; i--) {
    revers += str1[i];
}
console.log(revers);

