// const getSum = (a, b) => {
//     if (a > b) {
//         return a - b;
//     } 
//     return b - a;
// }

// console.log(getSum(1124312, 13123123));

// const isOdd = (num) => num % 2 == 0;

// console.log(isOdd(43));


// const arr = [53, 151, 7, 1];

// const filteredArr = arr.filter((num, i) => num > 15);

// console.log(filteredArr);



// const textInput = document.querySelector("#text");
// const yesBtn = document.querySelector("#yes");
// const noBtn = document.querySelector("#no");


// console.log(textInput.value);
// console.log(yesBtn.checked);
// console.log(yesBtn.value);

// const eventFunction = () => {
//     console.log("Clicked");
// }

// const getTextFromInput = () => {
//     console.log(textInput.value);
// }

// const dblClick = () => {
//     console.log("Double click");
// }

// const focus = () => {
//     console.log("Focused");
// }



// textInput.addEventListener("click", eventFunction);

// textInput.addEventListener("input", getTextFromInput);

// yesBtn.addEventListener("dblclick", dblClick);

// textInput.addEventListener("focus", focus);

const boxElem = document.querySelector(".box")

const bgColorInp = document.querySelector("#bg-color-input");
const textColorInp = document.querySelector("#text-color-input");
const borderInp = document.querySelector("#border-input");
const changeBtn = document.querySelector("#change-btn");
const sizeInp = document.querySelector("#number");

const roundBtn = document.querySelector("#round-btn")
const squareBtn = document.querySelector("#square-btn")

changeBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const bgColor = bgColorInp.value;
    const textColor = textColorInp.value;
    const border = borderInp.value;

    boxElem.style.backgroundColor = bgColor;
    boxElem.style.color = textColor;
    boxElem.style.border = border;
})

sizeInp.addEventListener("input", () => {

    const size = sizeInp.value;

    console.log(size);
    
    boxElem.style.width = `${size}px`;
    boxElem.style.height = `${size}px`

})

const changeBoxType = () => {
    const roundBtnStatus = roundBtn.checked;
    const squareBtnStatus = squareBtn.checked;

    if (roundBtnStatus){
        boxElem.classList.add("box-round");
        boxElem.classList.remove("box-square")
    } else if (squareBtnStatus) {
        boxElem.classList.add("box-square");
        boxElem.classList.remove("box-round");
    }
}

squareBtn.addEventListener("click", changeBoxType);
roundBtn.addEventListener("click", changeBoxType);