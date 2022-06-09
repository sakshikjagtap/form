const { createForm, writeFile } = require('./lib.js');
const { registerResponse } = require('./form.js');

const main = () => {
  const form = createForm();
  process.stdin.setEncoding('utf8');
  console.log(form.getPrompt());
  process.stdin.on('data', (response) => {
    const chunks = response.trim().split('\n');
    chunks.forEach(chunk => {
      registerResponse(form, chunk, console.log, writeFile);
    });
  });
};

main();
