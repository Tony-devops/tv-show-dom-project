function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const allEpisodes = getAllEpisodes();

function makeSeasonAndEpisode(episode) {
  const { season, number } = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");

  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";
  episodeList.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.classList.add("episode-container");
    let title = document.createElement("p");
    title.innerText = `${episode.name} -(${makeSeasonAndEpisode(episode)}`;
    title.classList.add("episode-title");
    let episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.classList.add("img");
    let episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeSummary.classList.add("episode-summary");
    episodeContainer.appendChild(title);
    episodeContainer.appendChild(episodeImage);
    episodeContainer.appendChild(episodeSummary);
    displayNumber(allEpisodes.length, episodeList.length);
    rootElem.appendChild(episodeContainer);
  });
}
function displayNumber(allEpisodes, filteredEpisode) {
  let currentEpisode = document.getElementById("display-episode-number");
  currentEpisode.innerHTML = `Displaying ${filteredEpisode}/${allEpisodes} episodes`;
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredEpisodes = getAllEpisodes().filter((episode) => {
    // localeCompare might be neater here
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  makePageForEpisodes(filteredEpisodes);
});

let select = document.getElementById("select-episode");

allEpisodes.forEach((episode) => {
  let option = document.createElement("option");
  option.value = episode.id;
  option.innerHTML = `S${makeSeasonAndEpisode(episode)}`
});

window.onload = setup;
/*
const url = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes = [];

//You can edit ALL of the code here
function setup() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // in here we can do whatever we want with the data
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    })
    .catch((err) => console.error(err));
}

function makeSeasonAndEpisode(episode) {
  const { season, number } = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");

  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const selectElem = document.getElementById("select-input");

  // clear out the rootElement's HTML before we add the new stuff
  rootElem.innerHTML = "";
  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${episodeList.length} episodes`;
  rootElem.appendChild(countParagraph);

  episodeList.forEach((episode) => {
    // add the season and episode and name
    const paragraph = document.createElement("p");
    paragraph.textContent = `${makeSeasonAndEpisode(episode)}: ${episode.name}`;
    rootElem.appendChild(paragraph);

    // add the image
    const image = document.createElement("img");
    image.src = episode.image.medium;
    rootElem.appendChild(image);

    // add the summary paragraph nb the episode.summary is actually HTML
    rootElem.innerHTML += episode.summary;

    // also, one more thing, add it to the select element as an option
    const option = document.createElement("option");
    option.textContent = `${makeSeasonAndEpisode(episode)} - ${episode.name}`;
    option.value = episode.id;
    selectElem.appendChild(option);
  });
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => {
    // localeCompare might be neater here
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  makePageForEpisodes(filteredEpisodes);
});

const selectInput = document.getElementById("select-input");
selectInput.addEventListener("change", (e) => {
  // we now have shown that e.target.value === the episode id that has been clicked on
  const idSelectedByUser = Number(e.target.value);
  const selectedEpisode = allEpisodes.find((ep) => ep.id === idSelectedByUser);
  if (selectedEpisode) {
    makePageForEpisodes([selectedEpisode]);
  }
});

window.onload = setup;
*/