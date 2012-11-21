# naturaltime

A simple natural language time parser for node.js using a naive bayesian
[classifier](https://github.com/harthur/classifier).

## installation

    npm install naturaltime

## usage

```javascript
var naturaltime = require('naturaltime');

var five_minutes_ago = naturaltime('5 minutes ago');
var in_five_minutes = naturaltime('in 5 minutes');
var a_year_ago = naturaltime('1 year ago');

// specify the start date
var a_year_and_a_week_ago = naturaltime('1 week ago', a_year_ago);

// create a parser
var parser = naturaltime.createParser({language: 'en-us'});
var parsed = parser.parse('2 weeks ago');
// => {units: 'weeks', amount: 2, relative: 'past'}
var date = parser.date('2 weeks ago');
```

## limitations

- the string you give `naturaltime` *must* have a decimal number in it
- number matching is naive - if there are two numbers in your string, the first
  one will be extracted and used, not necessarily correct. So, just give us one
  number
- `naturaltime` is not guaranteed to do things right. If you find a case that
  doesn't work like you expect, open an issue or fork the repo and fix it :)

## internationalization

`naturaltime` currently only understands US English. All that is needed for
more language support is a training set for each new language. If you know a
foreign language, please fork this repo and add it!
