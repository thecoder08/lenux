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

var fs = require('fs');
var behindMouseBuffer = saveNewBuffer(x, y, 20, 20, 3);
var cursor = fs.readFileSync(__dirname + '/images/cursor.raw');
var finger = fs.readFileSync(__dirname + '/images/finger.raw');

getMouse('/dev/input/mice', function(left, middle, right, rel_x, rel_y) {
    // send mouse event to window if applicable
    var hoveredWindow = windows.findIndex(window => x >= window.x && x < window.x + window.width && y >= window.y && y < window.y + window.height);
    if (hoveredWindow > -1) {
        windows[hoveredWindow].socket.write(JSON.stringify({event: 'mouse', left: left, middle: middle, right: right, rel_x: rel_x, rel_y: rel_y, x: x - windows[hoveredWindow].x, y: y - windows[hoveredWindow].y}));
    }
    // restore behind mouse and move mouse
    fb.buffer(x, y, 20, 20, 3, behindMouseBuffer);
    if (((x + rel_x) >= 0) && ((x + rel_x) <= 620)) {
        x += rel_x;
    }
    if (((y - rel_y) >= 0) && ((y - rel_y) <= 460)) {
        y -= rel_y;
    }
    behindMouseBuffer = saveNewBuffer(x, y, 20, 20, 3);
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
    if (oldLeft && !left) {
        // mouse up
        if (held > -1) {
            fb.rectangle(windows[held].x, windows[held].y, windows[held].width, windows[held].height, colors.black);
            // check for previously obstructed windows and redraw them
            var obstructedWindows = windows.filter(window => checkCollision(windows[held], window) && window.name != windows[held].name);
            for (var i = 0; i < obstructedWindows.length; i++) {
                obstructedWindows[i].socket.write(JSON.stringify({event: 'redraw'}));
            }
            windows[held].x = x
            windows[held].y = y;
            windows[held].socket.write(JSON.stringify({event: 'redraw'}));
        }
    }
    if (!oldLeft && left) {
        // mouse down
        held = windows.findIndex(window => x >= window.x && x < window.x + window.width && y >= window.y && y < window.y + window.height);
        if (held > -1) {
            var firstWindow = windows[held];
            windows.splice(held, 1);
            windows.unshift(firstWindow);
            held = 0;
        }
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
            behindMouseBuffer = saveNewBuffer(x, y, 20, 20, 3);
            recvdData = new Uint8Array();
        }
    }  
    });
}).listen('/etc/gui.socket');
fs.chmodSync('/etc/gui.socket', 0o777);

function saveNewBuffer(x, y, width, height, depth) {
    var buffer = new Buffer.alloc(width * height * depth);
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var pixel = readPixel(x + j, y + i);
            var location = ((i * width) + j) * depth;
            for (var k = 0; k < depth; k++) {
                buffer[location + k] = pixel[k];
            }
        }
    }
    return buffer;
}

function readPixel(x, y) {
    var color = new Buffer.alloc(fb.depth);
    fs.readSync(fb.framebuffer, color, 0, fb.depth, ((y * fb.width) + x) * fb.depth);
    color.reverse();
    return color;
}

// from chatGPT
function checkCollision(rect1, rect2) {
    // Calculate the x, y, width, and height of the intersection of the two rectangles
    const xOverlap = Math.max(0, Math.min(rect1.x + rect1.width, rect2.x + rect2.width) - Math.max(rect1.x, rect2.x));
    const yOverlap = Math.max(0, Math.min(rect1.y + rect1.height, rect2.y + rect2.height) - Math.max(rect1.y, rect2.y));
    
    // If there is no intersection, return false
    if (xOverlap === 0 || yOverlap === 0) {
      return false;
    }
    
    // Otherwise, there is a collision
    return true;
}

// params of requests
// all requests: request, name
// createWindow: x, y, width, height
// destroyWindow: no others
// transferBuffer: no others. Client must send buffer data after request JSON.

// params of events
// all events: event
// redraw: no others. After receiving, clients should resend a transferBuffer request.
// mouse: left, middle, right, rel_x, rel_y, x, y