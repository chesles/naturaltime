var Parser = require('./parser')

var defaultParser = new Parser();

module.exports = function(str, start) {
  return defaultParser.date(str, start);
}

module.exports.createParser = function(options) {
  return new Parser(options);
}
