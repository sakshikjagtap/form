/* eslint-disable no-console */
const fs = require('fs');

class Form {
  #formData;
  #details;
  #index;

  constructor(formData) {
    this.#formData = formData;
    this.#details = {};
    this.#index = 0;
  }

  getPrompt() {
    return this.#formData[this.#index].query;
  }

  validateField(fieldValue) {
    const field = this.#formData[this.#index];
    return field.validator(fieldValue);
  }

  nextField() {
    this.#index++;
  }

  addField(fieldValue) {
    const field = this.#formData[this.#index];
    this.#details[field.fieldName] = fieldValue;
  }

  getDetails() {
    return this.#details;
  }

  isFilled() {
    return this.#index === this.#formData.length;
  }
}

const writeFile = (details) => {
  fs.writeFileSync('./form.json', JSON.stringify(details));
};

const registerResponse = (form, response, logger) => {
  if (form.validateField(response)) {
    form.addField(response);
    form.nextField();
  }

  if (!form.isFilled()) {
    logger(form.getPrompt());
    return;
  }

  writeFile(form.getDetails());
  logger('thank you');
  process.exit();

};

module.exports = { Form, registerResponse };
