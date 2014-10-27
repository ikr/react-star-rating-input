// That module must be really simple. Otherwise, brfs won't work.

var fs = require('fs');
module.exports = fs.readFileSync(__dirname + '/../www/styles.css', 'utf8');
