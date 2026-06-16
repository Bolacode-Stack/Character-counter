const characterInput = document.querySelector(".character-input");
const wrapper = document.querySelector(".progress-wrapper");
const contents = document.querySelector(".contents");
const icon = document.querySelector(".fa-solid");
const toggle = document.querySelector(".see");
const limitReached = document.querySelector(".limit-reached");
const statsParagraph = document.querySelector(".stats-paragraph");

let graph = [
  { alphabet: "a", count: 0 },
  { alphabet: "b", count: 0 },
  { alphabet: "c", count: 0 },
  { alphabet: "d", count: 0 },
  { alphabet: "e", count: 0 },
  { alphabet: "f", count: 0 },
  { alphabet: "g", count: 0 },
  { alphabet: "h", count: 0 },
  { alphabet: "i", count: 0 },
  { alphabet: "j", count: 0 },
  { alphabet: "k", count: 0 },
  { alphabet: "l", count: 0 },
  { alphabet: "m", count: 0 },
  { alphabet: "n", count: 0 },
  { alphabet: "o", count: 0 },
  { alphabet: "p", count: 0 },
  { alphabet: "q", count: 0 },
  { alphabet: "r", count: 0 },
  { alphabet: "s", count: 0 },
  { alphabet: "t", count: 0 },
  { alphabet: "u", count: 0 },
  { alphabet: "v", count: 0 },
  { alphabet: "w", count: 0 },
  { alphabet: "x", count: 0 },
  { alphabet: "y", count: 0 },
  { alphabet: "z", count: 0 },
];

let code, logout;
export function alphabetStats(object) {
  let bars = [];

  let filteredGraph = object.filter((brace) => brace.count !== 0);

  filteredGraph.forEach((brace) => {
    let progressBars = document.createElement("div");
    progressBars.className = "progress-bars";

    let div = document.createElement("div");
    let letter = document.createElement("p");
    letter.className = "alphabet";
    letter.innerText = brace.alphabet.toUpperCase();
    div.append(letter);

    // (2)
    let progress = document.createElement("div");
    progress.className = "progress";

    let bar = document.createElement("div");
    bar.className = "bar";

    setTimeout(() => {
      bar.classList.add("smooth");
      let count = Math.min(brace.count, 100);
      bar.style.width = `${count}%`;
    }, 1500);

    progress.appendChild(bar);

    // (3)
    let totalCount = filteredGraph.reduce((combine, { count }) => {
      return combine + count;
    }, 0);

    let percentage = (brace.count / totalCount) * 100;

    let letterStats = document.createElement("div");
    letterStats.className = "letter-stats";

    let stats = 0;
    let timerID = setInterval(() => {
      letterStats.innerText = `${stats++}(${percentage.toPrecision(3)}) `;

      if (stats == brace.count) {
        clearInterval(timerID);
      }
    }, 100);

    progressBars.append(div, progress, letterStats);

    const displayGraph = () => {
      let appended = wrapper.appendChild(progressBars) ? true : false;
      if (appended) {
        wrapper.style.height = "200px";
        statsParagraph.style.display = "none";
        contents.appendChild(toggle);
      } else if (!appended) {
        wrapper.classList.remove("height-limit");
        statsParagraph.classList.remove("hide");
      }
    };
    displayGraph();
  });
}

export function getCharacters() {
  let contents = [];
  contents.push(characterInput.value);
  return contents;
}

function alphabetCounter(alphabet) {
  let count = 0;
  let contents = getCharacters();
  for (let string of contents) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] == alphabet) {
        count += 1;
      }
    }
  }
  return count;
}

export function letterDensity(object) {
  object.forEach((brace) => {
    brace["count"] = alphabetCounter(brace.alphabet);
  });
  return object.sort((a, b) => a.count < b.count);
}

function toggleGraph() {
  if (parseInt(wrapper.style.height) !== wrapper.scrollHeight) {
    wrapper.style.height = wrapper.scrollHeight + "px";
    toggle.textContent = "See Less";
    icon.classList.replace("fa-chevron-down", "fa-chevron-up");
    toggle.append(icon);
  } else if (wrapper.innerHTML !== "") {
    wrapper.style.height = "200px";
    toggle.textContent = "See More";
    icon.classList.replace("fa-chevron-up", "fa-chevron-down");
    toggle.append(icon);
  }
}

toggle.addEventListener("click", toggleGraph);

document.addEventListener("DOMContentLoaded", () => {
  toggle.remove();

  if (characterInput.value == "") {
    limitReached.remove();
  }
});

export { graph, toggle };
