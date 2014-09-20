var rework = require('rework');
var assert = require('chai').assert;
var distinguish = require('..');
var read = require('fs').readFileSync;

var input = read(__dirname + '/input.css', 'utf8');
var expect = read(__dirname + '/expect.css', 'utf8').trim();

describe('distinguish two css files', function() {
    it('should equivalent which two css files', function() {
        var css = rework(input)
            .use(distinguish())
            .toString()
            .trim();
        assert.equal(css, expect);
    });
});
