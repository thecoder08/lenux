#!/usr/bin/node
var { getMouse } = require('./input');
var { Framebuffer, colors } = require('node-framebuffer');

var fb = new Framebuffer('/dev/fb0', 640, 480, 3);
var x = 0;
var y = 0;

getMouse('/dev/input/mice', function(left, middle, right, rel_x, rel_y) {
    if (((x + rel_x) >= 0) && ((x + rel_x) < 640)) {
        x += rel_x;
    }
    if (((y - rel_y) >= 0) && ((y - rel_y) < 480)) {
        y -= rel_y;
    }
    fb.clear();
    if (left) {
        fb.drawRectangle(x, y, 10, 10, colors.red);
    }
    else if (middle) {
        fb.drawRectangle(x, y, 10, 10, colors.yellow);
    }
    else if (right) {
        fb.drawRectangle(x, y, 10, 10, colors.green);
    }
    else {
        fb.drawRectangle(x, y, 10, 10, colors.blue);
    }
});