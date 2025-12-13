class Storage {
  static addCharactersToStorage(count) {
    let characters = this.getCharactersFromStorage();

    characters.push(count);
    localStorage.setItem("totalCharacters", JSON.stringify(characters));
    return characters;
  }

  static getCharactersFromStorage() {
    let characters;
    if (localStorage.getItem("totalCharacters") == null) {
      characters = [];
    } else {
      characters = JSON.parse(localStorage.getItem("totalCharacters"));
    }
    return characters;
  }

  static addWordsToStorage(count) {
    let words = this.getWordsFromStorage();

    words.push(count);
    localStorage.setItem("wordCount", JSON.stringify(words));
    return words;
  }

  static getWordsFromStorage() {
    let words;

    if (localStorage.getItem("wordCount") == null) {
      words = [];
    } else {
      words = JSON.parse(localStorage.getItem("wordCount"));
    }
    return words;
  }

  static addSentenceToStorage(value) {
    let sentence = this.getSentenceFromStorage();

    sentence.push(value);
    localStorage.setItem("sentenceCount", JSON.stringify(sentence));

    return sentence;
  }

  static getSentenceFromStorage() {
    let sentence;

    if (localStorage.getItem("sentenceCount") == null) {
      sentence = [];
    } else {
      sentence = JSON.parse(localStorage.getItem("sentenceCount"));
    }
    return sentence;
  }

  static addLimitToStorage(limit) {
    let characterLimit = this.getLimitFromStorage();

    characterLimit = limit;

    localStorage.setItem("characterLimit", characterLimit);
  }

  static getLimitFromStorage() {
    let characterLimit;

    if (localStorage.getItem("characterLimit") !== null) {
      characterLimit = 0;
    } else {
      localStorage.getItem("characterLimit");
    }
    return characterLimit;
  }
}

export default Storage;