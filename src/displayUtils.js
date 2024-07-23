require('colors');

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log('========================================'.green);
  console.log('=          EDITED BY ONIXIA            ='.green);
  console.log('========================================'.green);
  console.log();
}

module.exports = {
  displayHeader,
};

