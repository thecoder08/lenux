#!/usr/bin/node
var { getMouse } = require('./input');
var { Framebuffer, colors } = require('node-framebuffer');

var fb = new Framebuffer('/dev/fb0', 640, 480, 3);
var x = 0;
var y = 0;

getMouse('/dev/input/mice', function(left, middle, right, rel_x, rel_y) {
    if (((x + rel_x) >= 0) && ((x + rel_x) < 630)) {
        x += rel_x;
    }
    if (((y - rel_y) >= 0) && ((y - rel_y) < 470)) {
        y -= rel_y;
    }
    fb.clear();
    if (left) {
        fb.rectangle(x, y, 10, 10, colors.red);
    }
    else if (middle) {
        fb.rectangle(x, y, 10, 10, colors.yellow);
    }
    else if (right) {
        fb.rectangle(x, y, 10, 10, colors.green);
    }
    else {
        fb.rectangle(x, y, 10, 10, colors.blue);
    }
});
