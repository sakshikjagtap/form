const { Field } = require('../../form/src/field');
const assert = require('assert');

describe('Field', () => {
  describe('#getPrompt', () => {
    it('should return a prompt of given field', () => {
      const field = new Field('name', 'Enter name');
      assert.strictEqual(field.getPrompt(), 'Enter name');
    });
  });

  describe('#isValid', () => {
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

  describe('#getEntry', () => {
    it('should return array of field and response', () => {
      const field = new Field('name', 'Enter name');
      const response = 'sakshi'
      field.addField(response);
      assert.deepStrictEqual(field.getEntry(), ['name', 'sakshi']);
    });
  });

  describe('#isFilled', () => {
    it('should return true if field is filled', () => {
      const field = new Field('name', 'Enter name');
      const response = 'sakshi'
      field.addField(response);
      assert.deepStrictEqual(field.isFilled(), true);
    });

    it('should return false if field is not filled', () => {
      const field = new Field('name', 'Enter name');
      const response = 'sakshi'
      assert.deepStrictEqual(field.isFilled(), false);
    });
  });
});
