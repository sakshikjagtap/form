/* eslint-disable max-statements */
/* eslint-disable no-console */
const fs = require('fs');

class Form {
  #queries;
  #details;
  constructor() {
    this.#queries = [
      'Please enter the name',
      'Please enter the DOB',
      'Please enter the hobbies',
      'Please enter phone number'
    ];
    this.#details = { name: null, DOB: null, hobbies: [], phNo: null };
  }

  getQueries() {
    return this.#queries;
  }

  getKeys() {
    return Object.keys(this.#details);
  }

  setValues(key, value) {
    this.#details[key] = value;
  }

  write() {
    fs.writeFileSync('./form.json', JSON.stringify(this.#details));
  }

}

const validateName = (name) => {
  const reg = /^[a-z]{4,}/;
  return reg.test(name);
};

const validateDOB = (birthDate) => {
  const reg = /[1-9]{4}-[1-9]{2}-[1-9]{2}/;
  return reg.test(birthDate);
};

const validateHobbies = (hobbies) => /..*/.test(hobbies);

const validatePhoneNumber = (phoneNumber) => /\d{10}/.test(phoneNumber);

const allValidations = () => {
  return {
    name: validateName,
    DOB: validateDOB,
    hobbies: validateHobbies,
    phNo: validatePhoneNumber
  };
};

const input = (form) => {
  const query = form.getQueries();
  const keys = form.getKeys();
  const validations = allValidations();
  process.stdin.setEncoding('utf8');
  let count = 0;
  console.log(query[count]);
  process.stdin.on('data', (chunk) => {
    if (validations[keys[count]](chunk)) {
      form.setValues(keys[count], chunk);
      count++;
    }
    console.log(query[count]);
    if (count === 4) {
      form.write();
      console.log('thank you');
      process.exit();
    }
  });

};

const form = new Form();
input(form);
