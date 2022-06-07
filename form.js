/* eslint-disable max-statements */
/* eslint-disable no-console */
const fs = require('fs');

const writeFile = (details) => {
  fs.writeFileSync('./form.json', JSON.stringify(details));
};

const validateName = (name) => {
  const reg = /^[a-z]{4,}/;
  return reg.test(name);
};

const validateDOB = (birthDate) => {
  const reg = /[1-9]{2}-[1-9]{2}-[1-9]{2}/;
  return reg.test(birthDate);
};

const validateHobbies = (hobbies) => /..*/.test(hobbies);

const validatePhoneNumber = (phoneNumber) => /\d{10}/.test(phoneNumber);

const input = (formData) => {
  const details = {};
  process.stdin.setEncoding('utf8');
  let count = 0;
  let field = formData[count];
  console.log(field.query);
  process.stdin.on('data', (chunk) => {
    if (field.validator(chunk)) {
      details[field.filed] = chunk;
      count++;
    }
    field = formData[count];
    console.log(field?.query);
    if (count === 6) {
      writeFile(details);
      console.log('thank you');
      process.exit();
    }
  });

};

const formData = [
  { field: 'name', query: 'Enter name', validator: validateName },
  { field: 'DOB', query: 'Enter DOB', validator: validateDOB },
  { field: 'hobbies', query: 'Enter Hobbies', validator: validateHobbies },
  {
    field: 'phNo', query: 'Enter phone number',
    validator: validatePhoneNumber
  },
  { field: 'addLine1', query: 'Enter Address', validator: validateHobbies },
  { field: 'addLine2', query: 'Enter Address', validator: validateHobbies },

];

input(formData);
