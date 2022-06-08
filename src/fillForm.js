const fs = require('fs');
const { Form, registerResponse } = require('./form.js');
const { Field } = require('./field.js');
const { MultiLineField } = require('./multiLineField.js');

const nameValidator = (name) => name.length >= 5;
const dobValidator = (birthDate) => /^\d{4}-\d{2}-\d{2}$/.test(birthDate);
const nonEmpty = (text) => text.length > 0;
const splitOnComma = (text) => text.split(',')

const writeFile = (details) => {
  fs.writeFileSync('./form.json', JSON.stringify(details));
  process.stdin.destroy();
};

const main = () => {
  const nameField = new Field('name', 'Enter name', nameValidator);
  const dobField = new Field('dob', 'Enter dob', dobValidator);
  const hobbiesField = new Field('hobbies', 'Enter hobbies', nonEmpty, splitOnComma);
  const address = new MultiLineField('address', ['Address Line 1', 'Address Line 2'], nonEmpty);

  const form = new Form([nameField, dobField, hobbiesField, address]);

  process.stdin.setEncoding('utf8');
  console.log(form.getPrompt());
  process.stdin.on('data', (response) => {
    registerResponse(form, response.trim(), console.log, writeFile);
  });
};

main();
