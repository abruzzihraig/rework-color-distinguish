var rework = require('rework');
var distinguish = require('..');
var read = require('fs').readFileSync;

var input = read(__dirname + '/input.css', 'utf8');

describe('distinguish', function() {
    it('should distinguish color', function() {
        var css = rework(input)
            .use(distinguish())
            .toString()
            .trim();
        console.log(css);
        return true;
    });
});
