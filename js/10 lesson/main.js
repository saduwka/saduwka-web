const arr = [34, 165, 73];

// переводит массив в строку
const str = arr.join("");
console.log(str);
// переворачивает массив, но при этом перезаписывает массив
arr.reverse();
// склеивает массивы и можно дописать в массив
arr.concat();

// callback функция которая передается в качестве параметра и применится для каждого элемента массива

// find -> в качестве параметра ждет функцию.
// -> функция которую мы передадим ждет еще 3 параметра (элемент, индекс, массив)
arr.find(function(item){
    console.log(item);
});

const data = [
    {
        name: "Karaganda",
        people: 1000000,
    },
    {
        name: "Astana",
        people: 2000000,
    },
    {
        name: "Almaty",
        people: 3000000,
    }
];

function findCity(city, i){
    return city.people >= 2000000 && city.name.startsWith("Al")
};

const result = data.find(findCity);
console.log(result);

function filterCity(city, i){
    return city.people >= 2000000
}

const resultFiltr = data.filter(filterCity);
console.log(resultFiltr);

function checkPopulation(elem){
    return elem.people > 0
}

const check = data.every(checkPopulation);
console.log(check);

function addPeople(city){
    city.people += 10000
    return city
}

const updatedData = data.map(addPeople)
console.log(updatedData);

const test = data
    .filter(filterCity)
    .map(addPeople)

console.log(test);



