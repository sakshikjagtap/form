const { Form, registerResponse } = require('../src/form.js');
const assert = require('assert');

const identity = content => content;
describe('registerResponse', () => {
  it('Should give next prompt', () => {
    const formData = [
      { name: 'name', query: 'Enter name', validator: identity },
      { name: 'dob', query: 'Enter dob', validator: identity }
    ];
    const form = new Form(formData);
    const display = [];
    const logger = content => display.push(content);
    const response = 'sakshi';

    registerResponse(form, response, logger);
    assert.deepStrictEqual(display, ['Enter dob']);
  });

  it('Should write data into file', () => {
    const formData = [
      { name: 'name', query: 'Enter name', validator: identity },
    ];

    const form = new Form(formData);
    const display = [];
    const logger = content => content;
    const writeFile = content => display.push(content);
    const response = 'sakshi';

    registerResponse(form, response, logger, writeFile);
    assert.deepStrictEqual(display, [{ name: 'sakshi' }]);
  });
});
