const SERVER_URL = "https://api.football-data.org/v4/";
const TOKEN = "b84f86b2893b46379c3da0f78c6833b9";

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
					"X-Auth-Token": TOKEN,
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
					"X-Auth-Token": TOKEN,
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

const getCompetitions = async () => {
	try {
		const res = await fetch(`${SERVER_URL}competitions`, {
			headers: {
				"X-Auth-Token": TOKEN,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch competitions:", error);
		return [];
	}
};

const getScorersByCompetition = async (competitionCode) => {
	try {
		const res = await fetch(
			`${SERVER_URL}competitions/${competitionCode}/scorers`,
			{
				headers: {
					"X-Auth-Token": TOKEN,
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

let currentCompetitionCode = null;

const showModal = (competition) => {
	currentCompetitionCode = competition.code;

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
	homeBtn.style.display = "block";

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
	competitionLogo.innerHTML = "";

	loadCompetitions();
});

const loadCompetitions = async () => {
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
};

window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";

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
		board.innerHTML = `<p id="no-tournament">No tournaments available.</p>`;
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

const displayTeamInfo = async (teamId) => {
	try {
		const res = await fetch(`${SERVER_URL}teams/${teamId}`, {
			headers: {
				"X-Auth-Token": TOKEN,
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

let displayedMatches = 5;
let allMatches = [];

const loadMoreMatches = (status) => {
	const groupMatches = allMatches.filter((match) => match.status === status);
	const matchesToShow = groupMatches.slice(
		displayedMatches,
		displayedMatches + 5,
	);

	displayedMatches += 5;

	const matchGroup = document.querySelector(`.match-group-${status}`);
	const matchesContainer = matchGroup.querySelector(".matches-container");
	const loadMoreButton = matchGroup.querySelector(".load-more");
	const hideButton = matchGroup.querySelector(".hide");

	matchesContainer.innerHTML += matchesToShow
		.map(
			(match) => `
            <div class="match">
                <div class="match-header">
                    <img id="logoHomeTeam" src="${
											match.homeTeam.crest || "default-logo.png"
										}" alt="${match.homeTeam.name}" />
                    <div class="match-info">
                        <strong>${match.homeTeam.name}</strong>
                        <span>${
													match.score.fullTime.home !== null &&
													match.score.fullTime.away !== null
														? `${match.score.fullTime.home} : ${match.score.fullTime.away}`
														: "VS"
												}</span>
                        <strong>${match.awayTeam.name}</strong>
                    </div>
                    <img id="logoAwayTeam" src="${
											match.awayTeam.crest || "default-logo.png"
										}" alt="${match.awayTeam.name}" />
                </div>
                <p>Date: ${new Date(match.utcDate).toLocaleString()}</p>
                <p>Status: ${match.status}</p>
            </div>`,
		)
		.join("");

	if (displayedMatches < groupMatches.length) {
		loadMoreButton.style.display = "block";
	} else {
		loadMoreButton.style.display = "none";
	}

	if (!hideButton) {
		const newHideButton = document.createElement("button");
		newHideButton.textContent = "Hide";
		newHideButton.classList.add("hide");
		newHideButton.addEventListener("click", () => hideMatches(status));
		matchGroup.appendChild(newHideButton);
	}
};

const hideMatches = (status) => {
	const matchGroup = document.querySelector(`.match-group-${status}`);
	const matchesContainer = matchGroup.querySelector(".matches-container");

	const allMatchesInContainer = Array.from(
		matchesContainer.querySelectorAll(".match"),
	);

	matchesContainer.innerHTML = allMatchesInContainer
		.slice(0, 5)
		.map((match) => match.outerHTML)
		.join("");

	displayedMatches = 5;

	const hideButton = matchGroup.querySelector(".hide");
	hideButton.style.display = "none";

	loadMoreMatches(status);
};

const displayMatches = (matches, competition) => {
	homeBtn.style.display = "block";

	if (!Array.isArray(matches) || matches.length === 0) {
		board.innerHTML = "<p>No matches available or an error occurred.</p>";
		return;
	}

	allMatches = matches;

	competitionLogo.innerHTML = `
        <div class="competition-logo-name">
            <img alt="${competition.code}" src="${
		competition.emblem || "default-logo.png"
	}" />
            <h2>${competition.name || "Unknown Competition"}</h2>
            <div class="filter-container">
                <select id="team-filter">
                    <option value="">All Teams</option>
                </select>
            </div>
        </div>`;

	const teams = [
		...new Set(
			matches.flatMap((match) => [match.homeTeam.name, match.awayTeam.name]),
		),
	];

	teams.sort((a, b) => a.localeCompare(b));

	const teamFilter = document.getElementById("team-filter");
	teams.forEach((team) => {
		const option = document.createElement("option");
		option.value = team;
		option.textContent = team;
		teamFilter.appendChild(option);
	});
	teamFilter.addEventListener("change", () => {
		filterMatches();
	});

	const filterMatches = () => {
		const selectedTeam = teamFilter.value;
		const filteredMatches = selectedTeam
			? matches.filter(
					(match) =>
						match.homeTeam.name === selectedTeam ||
						match.awayTeam.name === selectedTeam,
			  )
			: matches;
		displayFilteredMatches(filteredMatches, competition);
	};

	filterMatches();

	function displayFilteredMatches(matchesToDisplay, competition) {
		const groupedMatches = matchesToDisplay.reduce((acc, match) => {
			const status = match.status || "Unknown";
			if (!acc[status]) {
				acc[status] = [];
			}
			acc[status].push(match);
			return acc;
		}, {});

		const matchGroups = document.querySelectorAll(".match-group");
		matchGroups.forEach((group) => group.remove());

		Object.keys(groupedMatches).forEach((status) => {
			const groupMatches = groupedMatches[status];
			const matchesToShow = groupMatches.slice(0, displayedMatches);

			const matchGroup = document.createElement("div");
			matchGroup.classList.add("match-group", `match-group-${status}`);
			matchGroup.innerHTML = `
                <h3 class="match-status">${status}</h3>
                <div class="matches-container">
                    ${matchesToShow
											.map(
												(match) => `
                                <div class="match">
                                    <div class="match-header">
                                        <img id="logoHomeTeam" src="${
																					match.homeTeam.crest ||
																					"default-logo.png"
																				}" alt="${match.homeTeam.name}" />
                                        <div class="match-info">
                                            <strong>${
																							match.homeTeam.name
																						}</strong>
                                            <span>${
																							match.score.fullTime.home !==
																								null &&
																							match.score.fullTime.away !== null
																								? `${match.score.fullTime.home} : ${match.score.fullTime.away}`
																								: "VS"
																						}</span>
                                            <strong>${
																							match.awayTeam.name
																						}</strong>
                                        </div>
                                        <img id="logoAwayTeam" src="${
																					match.awayTeam.crest ||
																					"default-logo.png"
																				}" alt="${match.awayTeam.name}" />
                                    </div>
                                    <p>Date: ${new Date(
																			match.utcDate,
																		).toLocaleString()}</p>
                                    <p>Status: ${match.status}</p>
                                </div>`,
											)
											.join("")}
                </div>
            `;
			board.appendChild(matchGroup);

			if (groupMatches.length > displayedMatches) {
				const loadMoreButton = document.createElement("button");
				loadMoreButton.textContent = "Load More";
				loadMoreButton.classList.add("load-more");
				matchGroup.appendChild(loadMoreButton);

				loadMoreButton.addEventListener("click", () => {
					loadMoreMatches(status);
				});
			}
		});
	}
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

	loadCompetitions();
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

loadCompetitions();
