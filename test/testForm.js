const { Form, registerResponse } = require('../src/form.js');
const { Field } = require('../src/field.js');
const assert = require('assert');

const identity = content => content;

describe('registerResponse', () => {
  it('Should give next prompt', () => {
    const nameField = new Field('name', 'Enter name', identity);
    const dobField = new Field('dob', 'Enter dob', identity);
    const form = new Form([nameField, dobField]);
    const display = [];
    const logger = content => display.push(content);
    const response = 'sakshi';

    registerResponse(form, response, logger, identity);
    assert.deepStrictEqual(display, ['Enter dob']);
  });

  it('Should write data into file', () => {
    const nameField = new Field('name', 'Enter name', identity);
    const form = new Form([nameField]);

    const display = [];
    const logger = content => content;
    const writeFile = content => display.push(content);
    const response = 'sakshi';

    registerResponse(form, response, logger, writeFile);
    assert.deepStrictEqual(display, [{ name: 'sakshi', dob: undefined, hobbies: undefined }]);
  });

  it('should give same prompt if field is not valid', () => {
    const moreThan5 = response => response > 5;
    const nameField = new Field('name', 'Enter name', moreThan5);
    const form = new Form([nameField]);

    const display = [];
    const logger = content => display.push(content);
    const response = 'abin';

    registerResponse(form, response, logger, identity);
    assert.deepStrictEqual(display, ['Enter name']);
  });

});
