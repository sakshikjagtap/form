class Field {
  #name;
  #prompt;
  #validator;
  #response;
  #parse;

  constructor(name, prompt, validator = x => true, parse = x => x) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#response = null;
    this.#parse = parse;
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
    return [this.#name, this.#parse(this.#response)];
  }
}

module.exports = { Field };