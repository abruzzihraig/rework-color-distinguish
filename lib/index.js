var diff = require('color-diff');
var visit = require('rework-visit');

module.exports = exports = function(contrast_colors) {
    if(!constrast_colors) constrast_colors = ['#000000', '#ffffff'];
    return function(style) {
        visit(style, function(d) {
            console.log(d);
        });
    }
}
