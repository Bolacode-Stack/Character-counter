import Storage from "./storage.js";
import getCharacters from "./alphabet.js";
import { graph, alphabetStats, letterDensity, toggle } from "./alphabet.js";

let output;
const limitInput = document.querySelector(".limit-count");
const limitReached = document.querySelector(".limit-reached");
const limitCheckbox = document.querySelector(".limit-check");
const spaces = document.querySelector(".spaces");
const sentenceCount = document.querySelector(".sentence-count");
const wordCount = document.querySelector(".word-count");
const characterInput = document.querySelector(".character-input");
const readingTime = document.querySelector(".reading-time");
const wrapper = document.querySelector(".progress-wrapper");
const icon = document.querySelector(".fa-solid");
const logo = document.querySelector("#logo");
const body = document.querySelector("body");
const theme = document.querySelector(".theme");
let totalCharacters = document.querySelector("#total-characters");
const statsParagraph = document.querySelector(".stats-paragraph");
const resetUI = document.querySelector(".reset");

let time = 50,
  second = 1000;
let typing = true;
let string = ["Analyze your text in real-time"];
let regex = /\w+/g;

theme.addEventListener("click", (event) => {
  body.classList.toggle("light-theme");
  if (body.classList.contains("light-theme")) {
    logo.src = "/Assets/images/logo-light-theme.svg";
    theme.src = "/Assets/images/icon-moon.svg";
  } else {
    logo.src = "/Assets/images/logo-dark-theme.svg";
    theme.src = "/Assets/images/icon-sun.svg";
  }
});

class CharacterStats {
  constructor() {
    this.loadEventListeners();
    this.render();
  }

  loadEventListeners() {
    characterInput.addEventListener("input", this.totalCharacters.bind(this));
    characterInput.addEventListener("input", this.wordCount.bind(this));
    characterInput.addEventListener("input", this.sentenceCount.bind(this));

    limitCheckbox.addEventListener("change", this.setLimit.bind(this));
    resetUI.addEventListener("click", this.resetUI.bind(this));
  }

  totalCharacters(event) {
    let totalCount = 0;
    let input = event.target.value;
    totalCount += input.length;
    totalCharacters.innerText = totalCount;
    console.log("Counts & Spaces =", totalCount, this.countSpace());

    localStorage.clear();
    let total = Storage.addCharactersToStorage(totalCount);

    spaces.addEventListener("change", (event) => {
      let isChecked = event.target.checked ? true : false;

      let excludeSpaces = totalCount - this.countSpace();
      if (!isChecked) {
        totalCharacters.innerText = totalCount;
      } else if (isChecked) {
        totalCharacters.innerText = excludeSpaces;
      }
    });

    if (totalCount >= this.setLimit(event)) {
      limitReached.classList.add("show");
      characterInput.classList.add("limit");
    } else if (totalCount <= this.setLimit()) {
      limitReached.classList.remove("show");
      characterInput.classList.remove("limit");
    }
  }

  setLimit() {
    let limit = parseInt(limitInput.value);
    return limit;
  }

  wordCount(event) {
    let count = 0,
      contents = [],
      wordMatch;

    let input = event.target.value;
    contents.push(input);

    contents.forEach((word) => {
      if ((wordMatch = word.match(/\w+/g))) {
        count += wordMatch.length;
        wordCount.innerText = count;
      }

      let total = Storage.addWordsToStorage(count);
    });
  }

  sentenceCount(event) {
    let value = 0,
      contents = [],
      sentenceMatch;

    let text = event.target.value;
    contents.push(text);

    contents.forEach((sentence) => {
      if ((sentenceMatch = sentence.match(/\.+/g))) {
        value += sentenceMatch.length;
        sentenceCount.innerText = value;
      }

      let total = Storage.addSentenceToStorage(value);
    });
  }

  countSpace() {
    let spaces = 0,
      spaceMatch;
    let content = getCharacters();
    content.forEach((space) => {
      if ((spaceMatch = space.match(/\s+/g))) {
        spaces += spaceMatch.length;
      }
    });
    return spaces;
  }

  displayTotalCharacters() {
    let total = Storage.getCharactersFromStorage();
    total.forEach((count) => {
      totalCharacters.innerText = count;

      spaces.addEventListener("change", (event) => {
        let isChecked = event.target.checked ? true : false;

        let excludeSpaces = count - this.countSpace();
        if (!isChecked) {
          totalCharacters.innerText = count;
        } else if (isChecked) {
          totalCharacters.innerText = excludeSpaces;
        }
      });

      if (count >= this.setLimit(event)) {
        limitReached.classList.add("show");
        characterInput.classList.add("limit");
      } else if (count <= this.setLimit()) {
        limitReached.classList.remove("show");
        characterInput.classList.remove("limit");
      }
    });
  }

  displayWordCount() {
    let totalWords = Storage.getWordsFromStorage();
    totalWords.forEach((word) => {
      wordCount.innerText = word;
    });
  }

  displaySentenceCount() {
    let sentence = Storage.getSentenceFromStorage();
    sentence.forEach((value) => {
      sentenceCount.innerText = value;
    });
  }

  readingTime() {
    let timeout,
      countdown = 60;
    timeout = setInterval(() => {
      readingTime.innerText = `${countdown--} seconds`;
    });
    clearInterval(timeout);
    if (countdown == 0) {
      readingTime.innerText = "0 seconds";
    }
  }

  resetUI() {
    this.resetStats();
    this.resetUtilities();
    this.resetGraph();
  }

  resetUtilities() {
    limitInput.value = "";
    characterInput.value = "";
    limitReached.classList.add("hide");
    characterInput.classList.add("border");
    characterInput.classList.remove("limit");
  }

  resetStats() {
    wordCount.innerText = "00";
    totalCharacters.innerText = "00";
    sentenceCount.innerText = "00";
    localStorage.removeItem("totalCharacters");
    localStorage.removeItem("wordCount");
    localStorage.removeItem("sentenceCount");
  }

  resetGraph() {
    toggle.remove();
    wrapper.innerHTML = "";
    wrapper.style.height = "0px";
    statsParagraph.classList.add("view");
    wrapper.classList.remove("height-limit");
  }

  render() {
    this.displayTotalCharacters();
    this.displayWordCount();
    this.displaySentenceCount();
  }
}

const stats = new CharacterStats();

export { icon, wrapper, statsParagraph };
