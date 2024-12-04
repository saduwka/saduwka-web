const movies = [];
for (let i = 0; i < 3; i++) {
    const movieName = prompt("Введите название фильма");
    const movieYear = prompt("Введите год выхода фильма");
    const movieDirector = prompt("Введите имя режиссера");
    const movieActors = [];
    

    for (let a = 0; a < 2; a++) {
        const actorName = prompt("Введите имя актера");
        const actorAge = +prompt("Введите возраст актера");
        const actorObj = {
            name : actorName,
            age : actorAge,
        };
        movieActors.push(actorObj);
    }

    const moviesObj = {
        name: movieName,
        year: movieYear,
        director: movieDirector,
        actors: movieActors,
    }

    movies.push(moviesObj);
}

console.log(movies);
