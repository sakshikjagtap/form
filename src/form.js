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
    this.#details[field.name] = fieldValue;
  }

  getDetails() {
    return this.#details;
  }

  isFilled() {
    return this.#index === this.#formData.length;
  }
}

const registerResponse = (form, response, logger, writeFile) => {
  if (form.validateField(response)) {
    form.addField(response);
    form.nextField();
  }
  if (!form.isFilled()) {
    logger(form.getPrompt());
    return;
  }
  let { name, dob, hobbies } = form.getDetails();
  if (hobbies !== undefined) {
    hobbies = hobbies.split(',');
  }
  writeFile({ name, dob, hobbies });
  logger('thank you');
};

module.exports = { Form, registerResponse };
