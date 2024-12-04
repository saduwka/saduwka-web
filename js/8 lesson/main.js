// // function calcSum(a, b){
// //     let sum = a + b;
// //     console.log(sum);
// // }

// // calcSum(10, 25);

// function say(name = "", text = "hello") {
//     console.log(`${name} ${text}`);
// }

// say("Alim", "Test"); 
// say();

// function showTable (num = 1) {
//     if (typeof(num) != "number"){
//         console.log("error");
//         return;
//     }
//     for (let i = 1; i <= 9; i++) {
//         console.log(`${num} * ${i} = ${num * i}`);
//     }

// showTable(4);
// showTable();
// showTable("asd");


// function concatStrs(str, str2) {
//     if (!str || !str2 || typeof(str) != "string" || typeof(str2) != "string") {
//         return "Error";
//     }
//     const result = str + str2;
//     return result;
    
// }

// const functionResult = concatStrs("sad", "");
// console.log(functionResult);


// const fruits = ["apple"];

// function addFruits(fruitsArray, fruitName) {
//     if (typeof(fruitName) != "string" || fruitName == ""){
//         console.log("error");
//         return;
//     }

//     fruitsArray.push(fruitName); 
//     return fruitsArray;
// }

// addFruits(fruits, "banana");
// addFruits(fruits, "orange");
// addFruits(fruits, "")
// addFruits(fruits, 132213);
// addFruits(fruits, false)

// console.log(fruits);

function calcLetters(word) {
    const result = {};
    for (let i = 0; i < word.length; i++) {
        let letter = word[i]; 
        result[letter] = 1;
    }
    console.log(result);
    
}

calcLetters("test")

