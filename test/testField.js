const { Field } = require('../../form/src/field');
const assert = require('assert');

describe('Field', () => {
  it('should return a prompt of given field', () => {
    const field = new Field('name', 'Enter name');
    assert.strictEqual(field.getPrompt(), 'Enter name');
  });

  it('should return true if field is valid', () => {
    const moreThan5 = content => content.length > 5;
    const field = new Field('name', 'Enter name', moreThan5);
    const response = 'sakshi'
    assert.strictEqual(field.isValid(response), true);
  });

  it('should return false if field is invalid', () => {
    const moreThan5 = content => content.length > 5;
    const field = new Field('name', 'Enter name', moreThan5);
    const response = 'abin'
    assert.strictEqual(field.isValid(response), false);
  });
});
