var classifier = require('classifier');

var units = new classifier.Bayesian({default: 'unknown', thresholds: { years: 1 }});
units.fromJSON({
  cats: { days: 5, weeks: 5, seconds: 5, minutes: 5, hours: 5, years: 5 },
  words: {
    hour: { hours: 1 },
    hours: { hours: 1 },
    hr: { hours: 1 },
    h: { hours: 1 },

    minutes: { minutes: 1 },
    min: { minutes: 1 },
    mins: { minutes: 1 },
    m: { minutes: 1 },

    seconds: { seconds: 1},
    secs: { seconds: 1},
    sec: { seconds: 1},
    s: { seconds: 1},

    days: { days: 1},
    day: { days: 1},
    d: { days: 1},

    // weeks
    weeks: { weeks: 1 },
    week: { weeks: 1 },
    wks: { weeks: 1 },
    wk: { weeks: 1 },
    w: { weeks: 1 },

    // years
    years: { years: 1 },
    year: { years: 1 },
    yr: { years: 1 },
    y: { years: 1 },
  }
});

var relative = new classifier.Bayesian();
relative.fromJSON({
  cats: { future: 2, past: 1 },
  words: {
    in: { future: 1 },
    ago: { past: 1 },
    'from now': { future: 1 },
  }
});

module.exports = {
  relative: relative,
  units: units,
}
