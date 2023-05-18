#!/usr/bin/node
var fs = require('fs');
var client = require('./client.js');
var { FramebufferArray, colors } = require('node-framebuffer');
var name = makeid(10);
var buffer = new Uint8Array(256 * 256 * 3);
var fb = new FramebufferArray(buffer, 256, 256, 3);

client.connect(function(socket) {
    client.createWindow(socket, 0, 0, 256, 256, name);
    buffer.fill(255);
    fb.circle(50, 50, 10, colors.red);
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