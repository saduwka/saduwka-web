// //  DOM - document object module


// //querySelector возвращает первый элемент который найдет по указанному селектору
// // const par = document.querySelector("p");

// // const divElem = document.querySelector("div");


// // console.log(par);
// // console.log(divElem);

// //querySelector возвращает (коллекцию) все элементы который найдет по указанному селектору
// // const paragraphs = document.querySelectorAll("p");
// // console.log(paragraphs);
// // console.log(paragraphs.length);

// // item() - возвращает элемент по индексу
// // console.log(paragraphs.item(1));

// // paragraphs.forEach(function(par){
// //     console.log(par);
    
// // })

// const container = document.querySelector(".container")
// // console.log(container);

// const paragraphs = container.querySelectorAll("p")
// // console.log(paragraphs);

// const heading = document.querySelector("#heading");
// // console.log(heading);

// const heading1 = document.getElementById("heading");
// // console.log(heading1);

// const pars = document.getElementsByClassName("container");
// // console.log(pars);

// // heading.textContent = "<span> New text from js </span>";
// // // heading.innerHTML = "<span>HI!</span>"

// // console.dir(paragraphs[0]);
// // console.dir(heading)


// // add добавляет класс элементу
// heading.classList.add("text-red");
// // remove удаляет класс у элемента
// container.classList.remove("container");
// // contains проверяет наличие класса у элемента (true/false)
// const checkClass = container.classList.contains("container");
// console.log(checkClass);
// // toggle добавит класс если его не было и удалит если он был
// container.classList.toggle("test");


// const box = document.querySelector(".box");

// const input = prompt("Введите цвет");

// box.classList.add(input);

// const newBox = document.createElement("div");
// const body = document.body;

// newBox.textContent = "New box from Js";
// newBox.classList.add("red");

// body.appendChild(newBox);

// console.log(newBox);

const container = document.querySelector(".container");

for (let i = 0; i < 91; i++){
    const newElem = document.createElement("div");

    newElem.textContent = i + 1;
    newElem.classList.add("box");
    
    container.append(newElem);
}


