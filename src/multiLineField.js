class MultiLineField {
  #name;
  #prompt;
  #validator;
  #responses;
  #parse;
  #index;

  constructor(name, prompt, validator = x => true, parse = x => x) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validator = validator;
    this.#responses = [];
    this.#parse = parse;
    this.#index = 0;
  }

  getPrompt() {
    const prompt = this.#prompt[this.#index];
    this.#index++;
    return prompt;
  }

  isValid(response) {
    return this.#validator(response);
  }

  addField(response) {
    this.#responses.push(response);
  }

  getEntry() {
    return [this.#name, this.#parse(this.#responses).join('\n')];
  }
  isFilled() {
    return this.#prompt.length === this.#responses.length;
  }
}

module.exports = { MultiLineField };