class Form {
  #fields;
  #index;

  constructor(fields) {
    this.#fields = fields;
    this.#index = 0;
  }

  getPrompt() {
    const currentField = this.#fields[this.#index];
    return currentField.getPrompt();
  }

  addField(response) {
    const currentField = this.#fields[this.#index];
    if (!currentField.isValid(response)) {
      throw new Error('Invalid response');
    }
    currentField.addField(response);
    this.#index++;
  }

  getDetails() {
    const details = {};
    this.#fields.forEach(field => {
      const [name, response] = field.getEntry();
      details[name] = response;
    });
    return details;
  }

  isFilled() {
    return this.#index === this.#fields.length;
  }
}

const registerResponse = (form, response, logger, callback) => {
  try {
    form.addField(response);
  } catch (err) {
    logger('Invalid response');
  }

  if (!form.isFilled()) {
    logger(form.getPrompt());
    return;
  }
  callback(form.getDetails());
  logger('thank you');
};

module.exports = { Form, registerResponse };
