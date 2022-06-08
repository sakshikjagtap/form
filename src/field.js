class Field {
  #name;
  #prompt;
  #validator;
  #response;

  constructor(name, prompt, validator = x => true) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#response = null;
  }

  getPrompt() {
    return this.#prompt;
  }

  isValid(response) {
    return this.#validator(response);
  }

  addField(response) {
    this.#response = response;
  }

  getEntry() {
    return [this.#name, this.#response];
  }
}

module.exports = { Field };