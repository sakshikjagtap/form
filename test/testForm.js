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

  it('Should provide filled form to callback', () => {
    const nameField = new Field('name', 'Enter name', identity);
    const form = new Form([nameField]);

    const filledForm = [];
    const logger = content => content;
    const writeFile = content => filledForm.push(content);
    const response = 'sakshi';

    registerResponse(form, response, logger, writeFile);
    assert.deepStrictEqual(filledForm, [{ name: 'sakshi' }]);
  });

  it('should give invalid field error if field is not valid', () => {
    const moreThan5 = response => response.length > 5;
    const nameField = new Field('name', 'Enter name', moreThan5);
    const form = new Form([nameField]);

    const display = [];
    const logger = content => display.push(content);
    const response = 'abin';

    registerResponse(form, response, logger, identity);
    assert.deepStrictEqual(display, ['Invalid response', 'Enter name']);
  });
});

describe('Form', () => {
  it('should return prompt for name', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form([nameField]);
    assert.strictEqual(form.getPrompt(), 'Enter name');
  });

  it('should return second prompt', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter dob');
    const form = new Form([nameField, dobField]);
    form.addField('sakshi')
    assert.strictEqual(form.getPrompt(), 'Enter dob');
  });

  it('should throw an error if response is invalid', () => {
    const moreThan5 = response => response.length > 5;
    const nameField = new Field('name', 'Enter name', moreThan5);
    const form = new Form([nameField]);
    assert.throws(() => form.addField('abin'));
  });

  it('should give all the details of form', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form([nameField]);
    form.addField('sakshi');
    assert.deepStrictEqual(form.getDetails(), { name: 'sakshi' });
  });

  it('should give true if all the fields are filled', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form([nameField]);
    form.addField('sakshi');
    assert.deepStrictEqual(form.isFilled(), true);
  });
});
