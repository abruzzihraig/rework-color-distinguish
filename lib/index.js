var diff = require('color-diff');
var visit = require('rework-visit');

module.exports = exports = function(contrast_colors) {
    if (!contrast_colors) contrast_colors = [{R: 0, G: 0, B: 0}, {R: 255, G: 255, B: 255}];
    return function(style, rework) {
        var contrast_regex = /contrast\((.*)\)/g;
        var hex_regex = /#.*(?=\))/g;
        visit(style, function(declarations) {
            declarations.map(function(d) {
                var contrast_arr = d.value.match(contrast_regex);
                if (contrast_arr) {
                    var color_arr = contrast_arr.map(function(contrast) {
                        var color = contrast.match(hex_regex)[0] || '';
                        return exports.convert_to_rgb(color);
                    });

                    var dist_arr = color_arr.map(function(color) {
                        var dist_color = exports.convert_to_hex(diff.closest(color, contrast_colors));
                        d.value = d.value.replace(contrast_regex, dist_color);
                    });
                }
            });
        });
    }
}

/* convert the raw hex string to a RGB object */
exports.convert_to_rgb = function(hex) {
    if(!hex) throw new Error('Hex value is undifined');
    hex = hex.slice(1);
    if(hex.length === 3) {
        hex = [].reduce.call(hex, function(prev, cur) {
            return prev + cur + cur;
        }, '');
    }
    console.log(hex);
    var rgb = {};
    rgb.R = parseInt(hex.substr(0,2), 16);
    rgb.G = parseInt(hex.substr(2,2), 16);
    rgb.B = parseInt(hex.substr(4,2), 16);
    return rgb;
}

/* convert the RGB object to a raw hex string */
exports.convert_to_hex = function(rgb) {
    if(!rgb) throw new Error('rgb value is undifined');
    var hex = '#';
    for(var key in rgb) {
        var val = rgb[key].toString(16);
        if(val.length === 1) {
            val = '0' + val;
        }
        hex += val;
    }
    return hex;
}

