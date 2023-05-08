#!/usr/bin/node
var fs = require('fs');
var client = require('./client.js');

var name = 'Tux';
var buffer = fs.readFileSync(__dirname + '/images/tux.raw');

client.connect(function(socket) {
    client.createWindow(socket, 0, 0, 108, 128, name);
}, function(socket, event) {
    if (event.event == 'redraw') {
        client.transferBuffer(socket, name, buffer);
    }
});