const SERVER_URL = "https://api.football-data.org/v4/";

const board = document.querySelector("#board");
const competitionLogo = document.querySelector("#competition-logo");
const homeBtn = document.querySelector("#home-btn");

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");

const getMatchesByCompetition = async (competitionCode) => {
	try {
		const res = await fetch(
			`${SERVER_URL}competitions/${competitionCode}/matches`,
			{
				headers: {
					"X-Auth-Token": "b84f86b2893b46379c3da0f78c6833b9",
				},
			},
		);
		const data = await res.json();
		return {
			competition: data.competition,
			matches: data.matches || [],
		};
	} catch (error) {
		console.error(`Failed to fetch matches for ${competitionCode}:`, error);
		return [];
	}
};

const getStandingsByCompetition = async (competitionCode) => {
	try {
		const res = await fetch(
			`${SERVER_URL}competitions/${competitionCode}/standings`,
			{
				headers: {
					"X-Auth-Token": "b84f86b2893b46379c3da0f78c6833b9",
				},
			},
		);
		const data = await res.json();
		return data.standings || [];
	} catch (error) {
		console.error(`Failed to fetch standings for ${competitionCode}:`, error);
		return [];
	}
};

const getScorersByCompetition = async (competitionCode) => {
	try {
		const res = await fetch(
			`${SERVER_URL}competitions/${competitionCode}/scorers`,
			{
				headers: {
					"X-Auth-Token": "b84f86b2893b46379c3da0f78c6833b9",
				},
			},
		);
		const data = await res.json();
		return data.scorers || [];
	} catch (error) {
		console.error(`Failed to fetch scorers for ${competitionCode}:`, error);
		return [];
	}
};

const getCompetitions = async () => {
	try {
		const res = await fetch(`${SERVER_URL}competitions`, {
			headers: {
				"X-Auth-Token": "b84f86b2893b46379c3da0f78c6833b9",
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch competitions:", error);
		return [];
	}
};

let currentCompetitionCode = null; // Добавим переменную для хранения текущего турнира

const showModal = (competition) => {
	// Сброс флагов
	currentCompetitionCode = competition.code;

	// Открытие модального окна с данными турнира
	const competitionName = document.getElementById("modal-competition-name");
	const competitionLogo = document.getElementById("modal-competition-logo");

	competitionName.innerHTML = competition.name;
	competitionLogo.src = competition.emblem;

	const matchesBtn = document.getElementById("matches-btn");
	const standingsBtn = document.getElementById("standings-btn");
	const scorersBtn = document.getElementById("scorers-btn");

	// Очищаем старые обработчики
	matchesBtn.removeEventListener("click", showMatches);
	standingsBtn.removeEventListener("click", showStandings);
	scorersBtn.removeEventListener("click", showScorers);

	// Добавляем новые обработчики
	matchesBtn.addEventListener("click", showMatches);
	standingsBtn.addEventListener("click", showStandings);
	scorersBtn.addEventListener("click", showScorers);

	// Очищаем экран перед загрузкой данных
	board.innerHTML = "";

	async function showMatches() {
		// Для каждого раздела перед запросом очищаем экран
		if (currentCompetitionCode !== competition.code) return; // Если выбран другой турнир, не выполняем запрос

		const { matches } = await getMatchesByCompetition(competition.code);
		displayMatches(matches, competition);
		modal.style.display = "none";
	}

	async function showStandings() {
		if (currentCompetitionCode !== competition.code) return; // Проверка на изменения турнира

		const standings = await getStandingsByCompetition(competition.code);
		displayStandings(standings, competition);
		modal.style.display = "none";
	}

	async function showScorers() {
		if (currentCompetitionCode !== competition.code) return; // Проверка на изменения турнира

		const scorers = await getScorersByCompetition(competition.code);
		displayScorers(scorers);
		modal.style.display = "none";
	}

	modal.style.display = "block"; // Открываем модальное окно
};

closeBtn.addEventListener("click", () => {
	modal.style.display = "none";
	homeBtn.style.display = "none";
	competitionLogo.innerHTML = "";

	loadCompetitions();
});

const loadCompetitions = async () => {
	const object = await getCompetitions();
	displayCompetitions(object);
};

window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";

		homeBtn.style.display = "none";
		competitionLogo.innerHTML = "";

		loadCompetitions();
	}
});

const displayCompetitions = (competitionsData) => {
	if (
		!competitionsData ||
		!competitionsData.competitions ||
		competitionsData.competitions.length === 0
	) {
		board.innerHTML = "<p>Нет доступных турниров.</p>";
		return;
	}

	board.innerHTML = `
    <div id="all-competitions">
      ${competitionsData.competitions
				.map(
					(competition) => ` 
          <div class="competition-tile" data-code="${competition.code}">
            <img src="${competition.emblem}" alt="${competition.name} logo" />
            <h3>${competition.name}</h3>
          </div>
        `,
				)
				.join("")}
    </div>
  `;

	document.querySelectorAll(".competition-tile").forEach((tile) => {
		const competitionCode = tile.getAttribute("data-code");

		const competition = competitionsData.competitions.find(
			(comp) => comp.code === competitionCode,
		);

		tile.addEventListener("click", () => {
			showModal(competition);
		});
	});
};

const displayMatches = (matches, competition) => {
	homeBtn.style.display = "block";

	if (!Array.isArray(matches) || matches.length === 0) {
		board.innerHTML = "<p>No matches available or an error occurred.</p>";
		return;
	}

	competitionLogo.innerHTML = `<div class="competition-logo-name">
      <img alt="${competition.code}" src="${competition.emblem}" />
      <h2>${competition.name}</h2>
    </div>`;

	board.innerHTML = matches
		.map(
			(match) => `
      <div class="match">
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <img id="logoHomeTeam" src="${match.homeTeam.crest || ""}" alt="${
				match.homeTeam.name
			} logo" />
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <strong>${match.homeTeam.name}</strong>
            <span style="margin: 5px 0; font-size: 18px; font-weight: bold;">
              ${
								match.score.fullTime.home !== null &&
								match.score.fullTime.away !== null
									? `${match.score.fullTime.home} : ${match.score.fullTime.away}`
									: "VS"
							}
            </span>
            <strong>${match.awayTeam.name}</strong>
          </div>
          <img id="logoAwayTeam" src="${match.awayTeam.crest || ""}" alt="${
				match.awayTeam.name
			} logo" />
        </div>
        <p>Date: ${new Date(match.utcDate).toLocaleString()}</p>
        <p>Status: ${match.status}</p>
      </div>`,
		)
		.join("");
};

const displayStandings = (standings, competition) => {
	homeBtn.style.display = "block";

	if (!Array.isArray(standings) || standings.length === 0) {
		board.innerHTML = "<p>No standings available or an error occurred.</p>";
		return;
	}

	board.innerHTML = `

    <div class="competition-logo-name">
      <img alt="${competition.code}" src="${competition.emblem}" />
      <h2>${competition.name}</h2>
    </div>
    <table>
      <thead>
        <tr id="standing-head">
          <th>Место</th>
		  <th></th>
          <th>Команда</th>
          <th>Игры</th>
          <th>Победы</th>
          <th>Ничьи</th>
          <th>Поражения</th>
          <th>Очки</th>
        </tr>
      </thead>
      <tbody>
        ${standings[0].table
					.map(
						(team) => `
            <tr>
              <td>${team.position}</td>
			  <td><img id="logo-standing" src="${team.team.crest}" alt="${team.team.tla}"></td>
              <td>${team.team.name}</td>
              <td>${team.playedGames}</td>
              <td>${team.won}</td>
              <td>${team.draw}</td>
              <td>${team.lost}</td>
              <td>${team.points}</td>
            </tr>
          `,
					)
					.join("")}
      </tbody>
    </table>
  `;
};

const displayScorers = (scorers) => {
	homeBtn.style.display = "block";
	if (!Array.isArray(scorers) || scorers.length === 0) {
		board.innerHTML = "<p>No scorers available or an error occurred.</p>";
		return;
	}

	board.innerHTML = `
	
	<table>
		<thead>
			<tr>
				<th>Место</th>
				<th>Игрок</th>
				<th>Команда</th>
				<th>Голов</th>
				<th>Ассистов</th>
				<th>Пенальти</th>
				<th>Сыграно матчей</th>
			</tr>
		</thead>
		<body>
			${scorers
				.map(
					(scorer, index) => `
				<tr>
					<td>${index + 1}</td>
            <td>${scorer.player.firstName || ""} ${
						scorer.player.lastName || "Player"
					}</td>
            <td>${scorer.team.name || "Unknown Team"}</td>
            <td>${scorer.goals !== null ? scorer.goals : 0}</td> 
            <td>${scorer.assists !== null ? scorer.assists : 0}</td> 
            <td>${scorer.penalties !== null ? scorer.penalties : 0}</td> 
            <td>${
							scorer.playedMatches !== null ? scorer.playedMatches : 0
						}</td> 
				</tr>`,
				)
				.join("")}
		</body>
	</table>`;
};

document.addEventListener("DOMContentLoaded", async () => {
	const object = await getCompetitions();
	displayCompetitions(object);
});

homeBtn.addEventListener("click", async () => {
	modal.style.display = "none";
	competitionLogo.innerHTML = "";
	homeBtn.style.display = "none";
	const object = await getCompetitions();
	displayCompetitions(object);
});
