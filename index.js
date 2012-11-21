var Parser = require('./parser')

var defaultParser = new Parser();

module.exports = function(str) {
  return defaultParser.parse(str);
}

module.exports.createParser = function(options) {
  return new Parser(options);
}
