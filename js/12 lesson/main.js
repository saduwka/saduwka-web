// const container = document.querySelector(".container");

// // const imageUrl = prompt();

// function createImage(url, alt) {
//     const image = document.createElement("img");

//     image.setAttribute("src", url);
//     image.setAttribute("alt", alt);

//     image.style.width = "250px";
//     image.style.aspectRatio = "1/1";
//     image.style.objectFit = "cover";

//     container.style.display = "flex";
//     container.style.gap = "40px";

//     container.append(image);
    
// }

// const testSpan = document.querySelector("span");

// function deleteImage() {
//     console.log(container.children);
//     container.removeChild(container.children[1]);

//     // container.removeChild(testSpan);
// }

// createImage("https://www.w3schools.com/w3css/img_lights.jpg", "sky");
// createImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnGWEwXpRS7z7rVaGrjIWWTdE8_TiYTGiYjA&s", "camera");
// createImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__zJOFi3ef7eGRIlVWo2DKdUXKrCq8dBwtQ&s", "mountain");

// deleteImage();

const container = document.querySelector('.container');

function getRandomValue() {
    const random = Math.floor(Math.random() * 255);
    // console.log(random);
    return random;
}



function deleteRedBoxes() {
    let color = container.children[0].getAttribute('style');
    const startIndex = color.indexOf('rgb(') + 4;
    const endIndex = color.indexOf(")");

    const rgbString = color.substring(startIndex, endIndex);
    const red = rgbString.split(", ")[0];

    for (let i = 0; i < container.children.length; i++){
        if (red > 100){
            container.removeChild(container.children[i]);
        }
    }
    // console.log(color[startIndex]);
    // console.log(color);
 }

function generateSquares(count = 100){
    for (let i = 0; i < count; i++){
    const newElem = document.createElement("div");

    newElem.classList.add("box");
    
    const red = getRandomValue();
    const blue = getRandomValue();
    const green = getRandomValue();

    newElem.style.backgroundColor = `rgb(${red}, ${blue} ,${green})`

    container.append(newElem);
    }
}

generateSquares(100);

deleteRedBoxes();


// const container1 = document.querySelector(".container1");

// const inputWidth = prompt("Введите ширину");
// const inputHeigh = prompt("Введите высоту");
// const inputColor = prompt("Введите цвет фона");
// const inputBorderWidth = prompt("Введите ширину рамки");
// const inputBorderColor = prompt("Введите цвет рамки");

// container1.style.width = inputWidth + "px";
// container1.style.heigh = inputHeigh + "px";
// container1.style.backgroundColor = inputColor;
// container1.style.border = `${inputBorderWidth}px, solid, ${inputBorderColor}`;