#!/usr/bin/node
var { getMouse } = require('./input');
var { Framebuffer, colors } = require('node-framebuffer');
var net = require('net');

var fb = new Framebuffer('/dev/fb0', 640, 480, 3);
var x = 0;
var y = 0;
var held = -1;
var oldLeft = false;
var windows = [];
var behindMouseBuffer = new Uint8Array(20 * 20 * 3);

var fs = require('fs');
var cursor = fs.readFileSync(__dirname + '/images/cursor.raw');
var finger = fs.readFileSync(__dirname + '/images/finger.raw');

getMouse('/dev/input/mice', function(left, middle, right, rel_x, rel_y) {
    if (rel_x != 0 || rel_y != 0) {
        // mouse move
        fb.buffer(x, y, 20, 20, 3, behindMouseBuffer);
        if (((x + rel_x) >= 0) && ((x + rel_x) <= 620)) {
            x += rel_x;
        }
        if (((y - rel_y) >= 0) && ((y - rel_y) <= 460)) {
            y -= rel_y;
        }
        behindMouseBuffer = saveNewBuffer(x, y);
        // draw the appropriate cursor
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
    }
    if (oldLeft && !left) {
        // mouse up
        fb.rectangle(windows[held].x, windows[held].y, windows[held].width, windows[held].height, colors.black);
        windows[held].x = x;
        windows[held].y = y;
        windows[held].socket.write(JSON.stringify({event: 'redraw'}));
    }
    if (!oldLeft && left) {
        // mouse down
        held = windows.findIndex(window => x > window.x && x < window.x + window.width && y > window.y && y < window.y + window.height);
    }
    oldLeft = left;
});

net.createServer(function(socket) {
    var window = {};
    var recvdData = new Uint8Array();
    socket.write(JSON.stringify({event: 'redraw'}));
    socket.on('data', function(data) {
    try {
        var request = JSON.parse(data);
        if (request.request == 'createWindow') {
            windows.push({socket: socket, x: request.x, y: request.y, width: request.width, height: request.height, name: request.name, size: request.width * request.height * 3});
        }
        if (request.request == 'destroyWindow') {
            var index = windows.findIndex(window => x > window.x && x < window.x + window.width && y > window.y && y < window.y + window.height);
            if (index > -1) {
                windows.splice(index, 1);
            }
        }
        if (request.request == 'transferBuffer') {
            window = windows.find(window => window.name == request.name);
        }
    }
    catch (err) {
        recvdData = Buffer.concat([recvdData, data]);
        if (recvdData.length >= window.size) {
            fb.buffer(window.x, window.y, window.width, window.height, 3, recvdData);
            recvdData = new Uint8Array();
        }
    }  
    });
}).listen('/etc/gui.socket');
fs.chmodSync('/etc/gui.socket', 0o777);

// params of requests
// all requests: request, name
// createWindow: x, y, width, height
// destroyWindow: no others
// transferBuffer: size

// params of events
// all events: event, name
// redraw: no others. After receiving, clients should resend a transferBuffer request.