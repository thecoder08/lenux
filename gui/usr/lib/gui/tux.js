#!/usr/bin/node
var fs = require('fs');
var client = require('./client.js');

var name = makeid(10);
var buffer = fs.readFileSync(__dirname + '/images/tux.raw');

client.connect(function(socket) {
    client.createWindow(socket, 0, 0, 108, 128, name);
}, function(socket, event) {
    if (event.event == 'redraw') {
        client.transferBuffer(socket, name, buffer);
    }
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}