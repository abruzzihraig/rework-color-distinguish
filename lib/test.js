var rework = require('rework');
var color_distinguish = require('..');
var read = require('fs').readFileSync;

var input = read(__dirname + '/../test/input.css', 'utf8');

var css = rework(input)
    .use(color_distinguish())
    .toString()
    .trim();
console.log(css);