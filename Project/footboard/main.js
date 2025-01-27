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

let currentCompetitionCode = null;

const showModal = (competition) => {
	currentCompetitionCode = competition.code;

	const competitionName = document.getElementById("modal-competition-name");
	const competitionLogo = document.getElementById("modal-competition-logo");

	competitionName.innerHTML = competition.name;
	competitionLogo.src = competition.emblem;

	const matchesBtn = document.getElementById("matches-btn");
	const standingsBtn = document.getElementById("standings-btn");

	matchesBtn.removeEventListener("click", showMatches);
	standingsBtn.removeEventListener("click", showStandings);

	matchesBtn.addEventListener("click", showMatches);
	standingsBtn.addEventListener("click", showStandings);

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
    <img alt="${competition.code}" src="${
		competition.emblem || "default-logo.png"
	}" />
    <h2>${competition.name || "Unknown Competition"}</h2>
  </div>`;

	allMatches = matches; // Save all matches in a global array

	matches.reverse();

	const groupedMatches = matches.reduce((acc, match) => {
		const status = match.status || "Unknown";
		if (!acc[status]) {
			acc[status] = [];
		}
		acc[status].push(match);
		return acc;
	}, {});

	board.innerHTML = Object.keys(groupedMatches)
		.map((status) => {
			const groupMatches = groupedMatches[status];
			const matchesToShow = groupMatches.slice(0, 5); // Show only the first 5 matches

			return `
        <div class="match-group match-group-${status}">
          <h3 class="match-status">${status}</h3>
          <div class="matches-container">
            ${matchesToShow
							.map(
								(match) => `
                  <div class="match">
                    <div class="match-header">
                      <img id="logoHomeTeam" src="${
												match.homeTeam.crest || "default-logo.png"
											}" alt="${match.homeTeam.name}" />
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
                      <img id="logoAwayTeam" src="${
												match.awayTeam.crest || "default-logo.png"
											}" alt="${match.awayTeam.name}" />
                    </div>
                    <p>Date: ${new Date(match.utcDate).toLocaleString()}</p>
                    <p>Status: ${match.status}</p>
                  </div>`,
							)
							.join("")}
          </div>
        </div>
      `;
		})
		.join("");

	// Add the "Load More" buttons for each match group
	Object.keys(groupedMatches).forEach((status) => {
		const groupMatches = groupedMatches[status];
		const matchGroup = document.querySelector(`.match-group-${status}`);
		const loadMoreButton = document.createElement("button");
		loadMoreButton.textContent = "Load More";
		loadMoreButton.classList.add("load-more");

		matchGroup.appendChild(loadMoreButton);

		loadMoreButton.addEventListener("click", () => {
			loadMoreMatches(status);
		});

		if (groupMatches.length <= 5) {
			loadMoreButton.style.display = "none"; // Hide button if no more matches to show
		}
	});
};

let displayedMatches = 5;
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
};

document.addEventListener("DOMContentLoaded", async () => {
	const object = await getCompetitions();
	displayCompetitions(object);
});

homeBtn.addEventListener("click", async () => {
	modal.style.display = "none";
	competitionLogo.innerHTML = "";
	const object = await getCompetitions();
	displayCompetitions(object);
});
