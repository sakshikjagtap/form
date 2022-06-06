/* eslint-disable no-console */
const fs = require('fs');

class Form {
  #queries;
  #details;
  constructor(queries) {
    this.#queries = queries;
    this.#details = { name: null, DOB: null, Hobbies: [] };
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

  name(name) {
    const reg = /[a-z]{4}/;
    reg.test(name);
  }
}

const input = (form) => {
  const query = form.getQueries();
  const keys = form.getKeys();
  process.stdin.setEncoding('utf8');
  let count = 0;
  console.log(query[count]);
  process.stdin.on('data', (chunk) => {
    count++;
    let input = '';
    input += chunk;
    const line = input.split('\n');
    console.log(query[count]);
    form.setValues(keys[count - 1], line.slice(0, -1));
    input = line.slice(-1);
    if (count === 3) {
      form.write();
      process.exit();
    }
  });

};

const query = [
  'Please Enter the name',
  'Please enter the DOB',
  'Please Enter the hobbies'
];

const form = new Form(query);
input(form);
