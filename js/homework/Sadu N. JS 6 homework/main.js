const person = {};

person.name = prompt("Введите ваше имя");
person.age = +prompt("Введите ваш возраст");
person.hasPhoto = confirm("Есть ли у вас фото");

console.log(person);

const passportOffice = {};

passportOffice.minAge = 18;
passportOffice.requiresPhoto = true;

if (person.age < passportOffice.minAge) {
    console.log(`${person.name}, вы слишком молоды для получения паспорта.`);
} else if (person.hasPhoto == passportOffice.requiresPhoto) {
    console.log(`${person.name}, вы можете получить паспорт.`);
} else {
    console.log(`${person.name}, принесите фото для получения паспорта.`);
    
}

    