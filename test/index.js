var rework = require('rework');
var assert = require('chai').assert;
var distinguish = require('..');
var read = require('fs').readFileSync;

var input = read(__dirname + '/input.css', 'utf8');
var expect = read(__dirname + '/expect.css', 'utf8').trim();

var color_input = 'color: contrast(#333);';
var color_expect = 'color: #ffffff;';
var background_color_input = 'background-color: contrast(#333);';
var background_color_expect = 'background-color: #ffffff;';
var box_shadow_input = 'box-shadow: 5px 5px 5px contrast(#1b2d42), 10px 10px 10px contrast(#7960f3);';
var box_shadow_expect = 'box-shadow: 5px 5px 5px #ffffff, 10px 10px 10px #000000;';
var background_input = 'background: url(xxx) contrast(#3bad42) no-repeat center center;';
var background_expect = 'background: url(xxx) #000000 no-repeat center center;';

function layout(property) {
    return '.foo {\n  '+property+'\n}';
}

function should_convert(input, expect) {
    return 'should equivalent which "' + input + '" -> "' + expect + '"';
}

describe('distinguish two css files', function() {
    it('should equivalent which two css files', function() {
        var css = rework(input)
            .use(distinguish())
            .toString()
            .trim();
        assert.equal(css, expect);
    });
});

describe('Hex value to RBG object', function() {
    it('should convert #333 -> {R: 51, G: 51, B: 51}', function() {
        var rgb_obj = distinguish.convert_to_rgb('#333');
        assert.notDeepEqual(rgb_obj, {R: '51', G: '51', B: '51'});
    });
});

describe('RBG object to Hex value', function() {
    it('should convert #333 -> {R: 51, G: 51, B: 51}', function() {
        var hex = distinguish.convert_to_hex({R: 51, G: 51, B:51});
        assert.equal(hex, '#333333');
    });
});

describe('distinguish contrast value in different css propreties', function() {
    it(should_convert(color_input, color_expect), function() {
        var compiled = rework(layout(color_input)).use(distinguish()).toString().trim();
        var expect = layout(color_expect);
        assert.equal(compiled, expect);
    });
    it(should_convert(background_color_input, background_color_expect), function() {
        var compiled = rework(layout(background_color_input)).use(distinguish()).toString().trim();
        var expect = layout(background_color_expect);
        assert.equal(compiled, expect);

    });
    it(should_convert(background_input, background_expect), function() {
        var compiled = rework(layout(background_input)).use(distinguish()).toString().trim();
        var expect = layout(background_expect);
        assert.equal(compiled, expect);
    });
    it(should_convert(box_shadow_input, box_shadow_expect), function() {
        var compiled = rework(layout(box_shadow_input)).use(distinguish()).toString().trim();
        var expect = layout(box_shadow_expect);
        assert.equal(compiled, expect);
    });
});
