/* eslint-disable id-length */
const { Form, registerResponse } = require('../src/form.js');
const assert = require('assert');

describe('registerResponse', () => {
  it('Should give next prompt', () => {
    const formData = [
      { name: 'name', query: 'Enter name', validator: x => x },
      { name: 'dob', query: 'Enter dob', validator: x => x }
    ];
    const form = new Form(formData);
    const display = [];
    const logger = content => display.push(content);
    const response = 'sakshi';

    registerResponse(form, response, logger);
    assert.deepStrictEqual(display, ['Enter dob']);
  });
});
