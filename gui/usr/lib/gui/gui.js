#!/usr/bin/node
var { getMouse } = require('./input');
var { Framebuffer, colors } = require('node-framebuffer');
var net = require('net');

var fb = new Framebuffer('/dev/fb0', 640, 480, 3);
var x = 0;
var y = 0;

var fs = require('fs');
var cursor = fs.readFileSync(__dirname + '/cursor.raw');
var finger = fs.readFileSync(__dirname + '/finger.raw');

getMouse('/dev/input/mice', function(left, middle, right, rel_x, rel_y) {
    fb.rectangle(x, y, 20, 20, colors.black);
    if (((x + rel_x) >= 0) && ((x + rel_x) < 620)) {
        x += rel_x;
    }
    if (((y - rel_y) >= 0) && ((y - rel_y) < 460)) {
        y -= rel_y;
    }
    if (left) {
        fb.buffer(x, y, 20, 20, 3, finger);
    }
    else if (middle) {
        fb.rectangle(x, y, 20, 20, colors.blue);
    }
    else if (right) {
        fb.rectangle(x, y, 20, 20, colors.green);
    }
    else {
        fb.buffer(x, y, 20, 20, 3, cursor);
    }
});

var clients = [];

net.createServer(function(socket) {
    clients.push({socket: socket, windows: []});
    socket.on('data', function(data) {
        var request = JSON.parse(data);
        if (request.method == 'createWindow') {
            windows.push({x: request.x, y: request.y, width: request.width, height: request.height, name: request.name});
        }
    });
}).listen('/etc/gui.socket');