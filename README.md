#rework-color-distinguish  
[![Build Status](https://travis-ci.org/abruzzihraig/rework-color-distinguish.svg?branch=master)](https://travis-ci.org/abruzzihraig/rework-color-distinguish) [![Coverage Status](https://coveralls.io/repos/abruzzihraig/rework-color-distinguish/badge.png?branch=master)](https://coveralls.io/r/abruzzihraig/rework-color-distinguish?branch=master) [![Code Climate](https://codeclimate.com/github/abruzzihraig/rework-color-distinguish/badges/gpa.svg)](https://codeclimate.com/github/abruzzihraig/rework-color-distinguish) 

rework-color-distinguish is a css preprocess plugin for [Rework](https://github.com/reworkcss/rework)

it is easier for users to see content including separating foreground from background.  
More detail about distinguish contrast color in [WCAG](http://www.w3.org/TR/WCAG20/).  

## Installation
```
$ npm install rework-color-distinguish
```

## Example
*origin css:*
```
.foo {
    background-color: #37f9b2;
    color: contrast(#37f9b2);
}
```
*js with rework:*
```
var rework = require('rework');
var distinguish = require('rework-color-distinguish');

var css = rework(input)
    .use(distinguish())
    .toString();
```
*yields css:*
```
.foo {
    background-color: #37f9b2;
    color: #000000;
}
```
With 'contrast(color)' mixin, you can get a mostly contrast color between the two or more colors where you set in. 

## Usage
### distinguish([color1, color2, ...])
Accepts multi-parameter for color string which have a type of 'hex', the `contrast(color)` mixin function in css, will be converted a mostly contrast color from these hex color parameters.

The default contrast colors are '#000000' and '#ffffff';


## Author
Yang He [abruzzi.hraig@gmail.com](http://mailto:abruzzi.hraig@gmail.com)

## Licence
MIT
