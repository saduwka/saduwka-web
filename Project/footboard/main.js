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

let currentCompetitionCode = null;

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

	matchesBtn.removeEventListener("click", showMatches);
	standingsBtn.removeEventListener("click", showStandings);
	scorersBtn.removeEventListener("click", showScorers);

	matchesBtn.addEventListener("click", showMatches);
	standingsBtn.addEventListener("click", showStandings);
	scorersBtn.addEventListener("click", showScorers);

	board.innerHTML = "";

	async function showMatches() {
		if (currentCompetitionCode !== competition.code) return;

		const { matches } = await getMatchesByCompetition(competition.code);
		displayMatches(matches, competition);
		modal.style.display = "none";
	}

	async function showStandings() {
		if (currentCompetitionCode !== competition.code) return;

		const standings = await getStandingsByCompetition(competition.code);
		displayStandings(standings, competition);
		modal.style.display = "none";
	}

	async function showScorers() {
		if (currentCompetitionCode !== competition.code) return;

		const scorers = await getScorersByCompetition(competition.code);
		displayScorers(scorers);
		modal.style.display = "none";
	}

	modal.style.display = "block";
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
		board.innerHTML = "<p>No tournaments available.</p>";
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
        <div class="match-header">
          <img id="logoHomeTeam" src="${match.homeTeam.crest || ""}" alt="${
				match.homeTeam.name
			} logo" />
          <div class="match-info">
            <strong>${match.homeTeam.name}</strong>
            <span>
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
				<th>Position</th>
				<th></th>
				<th>Team</th>
				<th>Games</th>
				<th>Win</th>
				<th>Draw</th>
				<th>Defeat</th>
				<th>Points</th>
			</tr>
		</thead>
		<tbody>
			${standings[0].table
				.map(
					(team) => `
				<tr class="team-row" data-team-id="${team.team.id}">
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
	document.querySelectorAll(".team-row").forEach((row) => {
		row.addEventListener("click", async () => {
			const teamId = row.getAttribute("data-team-id");
			if (teamId) {
				await displayTeamInfo(teamId);
			} else {
				console.error("No team ID found for this row.");
			}
		});
	});
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
				<th>Position</th>
				<th>Player</th>
				<th>Team</th>
				<th>Goals</th>
				<th>Assists</th>
				<th>Penalties</th>
				<th>Matches played</th>
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

const displayTeamInfo = async (teamId) => {
	try {
		const res = await fetch(`${SERVER_URL}teams/${teamId}`, {
			headers: {
				"X-Auth-Token": "b84f86b2893b46379c3da0f78c6833b9",
			},
		});
		const team = await res.json();
		console.log(team);

		board.innerHTML = `
		<div class="team-info">
			<h2>${team.name}</h2>
			<img src="${team.crest}" alt="${team.name} logo" />
			<p>Founded: ${team.founded || "N/A"}</p>
			<p>Stadium: ${team.venue || "N/A"}</p>
			<p>Address: ${team.address || "N/A"}</p>
			<p>Website: <a href="${team.website}" target="_blank">${team.website}</a></p>
			<p>Coach: ${
				team.coach && team.coach.name
					? `${team.coach.name} (${team.coach.nationality})`
					: "N/A"
			}</p>
			<p><b>Squad:</p>
			<table>
				<thead>
					<tr>
						<th>Role</th>
						<th>Player</th>
						<th>Nationality</th>
					</tr>
				</thead>
				<tbody>
					${team.squad
						.map(
							(player) => `
							<tr>
								<td>${player.position || "N/A"}</td>
								<td>${player.name}</td>
								<td>${player.nationality || "N/A"}</td>
							</tr>`,
						)
						.join("")}
				</tbody>
			</table>
		</div>
		`;

		homeBtn.style.display = "block";
		competitionLogo.innerHTML = "";
	} catch (error) {
		console.error("Failed to fetch team information:", error);
		board.innerHTML =
			"<p>Failed to load team information. Please try again later.</p>";
	}
};

const columns = 4;

document.addEventListener("DOMContentLoaded", async () => {
	const object = await getCompetitions();
	displayCompetitions(object);
	const tiles = document.querySelectorAll(".competition-tile");
	const totalTiles = tiles.length;
	const remainder = totalTiles % columns;

	if (remainder > 0) {
		const tilesToRemove = remainder;
		for (let i = 0; i < tilesToRemove; i++) {
			tiles[totalTiles - 1 - i].remove();
		}
	}
});

homeBtn.addEventListener("click", async () => {
	modal.style.display = "none";
	competitionLogo.innerHTML = "";
	homeBtn.style.display = "none";
	const object = await getCompetitions();
	displayCompetitions(object);
	const tiles = document.querySelectorAll(".competition-tile");
	const totalTiles = tiles.length;
	const remainder = totalTiles % columns;

	if (remainder > 0) {
		const tilesToRemove = remainder;
		for (let i = 0; i < tilesToRemove; i++) {
			tiles[totalTiles - 1 - i].remove();
		}
	}
});
