const fs = require('fs');
const { nameValidator, dobValidator, nonEmpty } = require("./validators");
const { Form } = require('./form.js');
const { Field } = require('./field.js');
const { MultiLineField } = require('./multiLineField.js');

const splitOnComma = (text) => text.split(',');

const createForm = () => {
  const nameField = new Field('name', 'Enter name', nameValidator);
  const dobField = new Field('dob', 'Enter dob', dobValidator);
  const hobbiesField =
    new Field('hobbies', 'Enter hobbies', nonEmpty, splitOnComma);
  const address
    = new MultiLineField('address', ['Address Line 1', 'Address Line 2'], nonEmpty);

  return new Form([nameField, dobField, hobbiesField, address]);
}

const writeFile = (details) => {
  fs.writeFileSync('./form.json', JSON.stringify(details));
  process.stdin.destroy();
};

module.exports = { splitOnComma, createForm, writeFile };