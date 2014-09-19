var diff = require('color-diff');
var visit = require('rework-visit');

module.exports = exports = function(contrast_colors) {
    if (!contrast_colors) contrast_colors = [{R: 0, G: 0, B: 0}, {R: 255, G: 255, B: 255}];
    return function(style, rework) {
        var contrast_regex = /contrast\((.*)\)/g;
        var hex_regex = /#.*(?=\))/g;
        visit(style, function(declarations) {
            declarations.map(function(d) {
                if (contrast_regex.test(d.value)) {
                    var contrast_arr = d.value.match(contrast_regex);
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
exports.convert_to_rgb = function(hex) {
    // TODO Convert RGB
    return {R: 0, G: 0, B: 0};
}
exports.convert_to_hex = function(rgb) {
    // TODO Convert hex
    return '#aaaaaa';
}

