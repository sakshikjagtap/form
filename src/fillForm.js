const fs = require('fs');

const { Form, registerResponse } = require('./form.js');

const isNameValid = (name) => /^[a-z]{4,}/.test(name);
const isDOBValid = (birthDate) => /\d{2}-\d{2}-\d{2}/.test(birthDate);
const isDetailPresent = (detail) => detail.length > 0;

const writeFile = (details) => {
  fs.writeFileSync('./form.json', JSON.stringify(details));
  process.stdin.destroy();
};

const main = () => {
  const formData = [
    { name: 'name', query: 'Enter name', validator: isNameValid },
    { name: 'dob', query: 'Enter DOB', validator: isDOBValid },
    { name: 'hobbies', query: 'Enter Hobbies', validator: isDetailPresent },
  ];

  const form = new Form(formData);
  process.stdin.setEncoding('utf8');

  console.log(form.getPrompt());
  process.stdin.on('data', (response) => {
    registerResponse(form, response.trim(), console.log, writeFile);
  });
};

main();
