const fs = require('fs');

const getInput = function () {
  const details = {};
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    let input = '';
    input += chunk;
    const line = input.split('\n');
    details.name = line.slice(0, -1);
    input = line.slice(-1);
  });
};

const write = (data) => fs.writeFileSync('./form.json', data);

console.log('Enter name:');
getInput(write);

