// nodeunit tests
var naturaltime = require('../index.js');

module.exports = {
  setUp: function(done) {
    this.parser = naturaltime.createParser({ language: 'en-us' });
    done();
  },
  "test relativity": function(test) {
    var tests = [
      {str: 'in 20 minutes', expect: 'future'},
      {str: '20 minutes from now', expect: 'future'},
      {str: '20 minutes ago', expect: 'past'},
    ];
    var parser = this.parser;
    tests.forEach(function(_test) {
      var results = parser.parse(_test.str);
      if (results.relative !== _test.expect) {
        console.error("===", _test.str, " => ", results.relative, "??");
      }
      test.equals(results.relative, _test.expect);
    });
    test.done();
  },
  "test unit extraction": function(test) {
    var tests = [
      // seconds
      {str: "in 2 s", unit: "seconds"},
      {str: "in 2s", unit: "seconds"},
      {str: "in 2 sec", unit: "seconds"},
      {str: "in 2 secs", unit: "seconds"},
      {str: "in 2 seconds", unit: "seconds"},
      {str: "2s ago", unit: "seconds"},

      // minutes
      {str: "in 2 minutes", unit: "minutes"},
      {str: "in 2 mins", unit: "minutes"},
      {str: "in 2 min", unit: "minutes"},
      {str: "in 1 m", unit: "minutes"},
      {str: "2 m ago", unit: "minutes"},

      // hours
      {str: "in 2 hours", unit: "hours"},
      {str: "in 2 hour", unit: "hours"},
      {str: "in 2 h", unit: "hours"},
      {str: "2h ago", unit: "hours"},
      {str: "in 24h", unit: "hours"},

      // days
      {str: "in 2 days", unit: "days"},
      {str: "2 days ago", unit: "days"},
      {str: "in 2 d", unit: "days"},
      {str: "2d ago", unit: "days"},
      {str: "20d ago", unit: "days"},

      // weeks
      {str: "in 2 weeks", unit: "weeks"},
      {str: "2 weeks ago", unit: "weeks"},
      {str: "in 2 wks", unit: "weeks"},
      {str: "2w ago", unit: "weeks"},
      {str: "20w ago", unit: "weeks"},
      {str: "in 20w", unit: "weeks"},

      // years
      {str: "in 2 years", unit: "years"},
      {str: "2 years ago", unit: "years"},
      {str: "in 2 yr", unit: "years"},
      {str: "2y ago", unit: "years"},
      {str: "200y ago", unit: "years"},
    ];

    var parser = this.parser;
    tests.forEach(function(_test) {
      var results = parser.parse(_test.str);
      if (results.unit !== _test.unit) {
        console.error("===", _test.str, " => ", results.unit, "??");
      }
      test.equals(results.unit, _test.unit);
    });
    test.done();
  },
  "test date creation": function(test) {
    var tests = [
      {start: new Date(), str: 'in 5 minutes', delta: 300},
      {start: new Date(), str: '5 minutes ago', delta: -300},
      {start: new Date(), str: 'in 1 hour', delta: 3600},
      {start: new Date(), str: '1 hour ago', delta: -3600},
      {start: new Date(), str: 'in 1 day', delta: 86400},
      {start: new Date(), str: 'in 2 days', delta: 86400*2},
      {start: new Date(), str: '1 day ago', delta: -86400},
      {start: new Date(), str: '1 week ago', delta: -86400 * 7},
      {start: new Date(), str: '2 weeks ago', delta: -86400 * 7 * 2},
      {start: new Date(), str: '1 year ago', delta: -1},
      {start: new Date(), str: 'in 2 years', delta: 2},
    ];

    var parser = this.parser;
    tests.forEach(function(_test) {
      var result = parser.date(_test.str, _test.start);
      var diff = result.valueOf() - _test.start.valueOf();
      // special case for years
      if (Math.abs(diff) > 31000000000) {
        diff = result.getFullYear() - _test.start.getFullYear();
      }
      else {
        // .valueOf returns nanoseconds
        _test.delta *= 1000;
      }
      test.equal(_test.delta, diff);
    });
    test.done();
  }
}
