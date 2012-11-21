module.exports = Parser;

function Parser(options) {
  this.lang = options && options.language || 'en-us';
  this.classifiers = require('./training/'+this.lang);
}

Parser.prototype.parse = function(str) {
  // unit classifier is easily confused by things like '20d', so split it up
  str = str.replace(/([0-9])([^0-9])/, '$1 $2');
  var unit = this.classifiers.units.classify(str);
  var relative = this.classifiers.relative.classify(str);
  var amount = str.match(/[0-9]+/);

  return {
    amount: parseInt(amount, 10),
    unit: unit,
    relative: relative
  }
}

// date: return a new Date object, adjusted as specified in str
//
// - str: a time specified in natural language, "10 minutes ago", etc.
// - from: a starting Date. Defaults to now (i.e. `new Date()`)
Parser.prototype.date = function(str, from) {
  var final;
  if (from !== undefined) final = new Date(from);
  else final = new Date();

  var parsed = this.parse(str);
  if (parsed.relative === 'past') {
    parsed.amount *= -1;
  }
  switch (parsed.unit) {
    case 'years':
      final.setYear(final.getFullYear() + parsed.amount);
      break;
    case 'weeks':
      parsed.amount *= 7;
      parsed.unit = 'days';
    case 'days':
      final.setDate(final.getDate() + parsed.amount);
      break;
    case 'hours':
      final.setHours(final.getHours() + parsed.amount);
      break;
    case 'minutes':
      final.setMinutes(final.getMinutes() + parsed.amount);
      break;
    case 'seconds':
      final.setSeconds(final.getSeconds() + parsed.amount);
      break;
  }
  return final;
}
