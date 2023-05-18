const { log } = require('console');
var net = require('net');

function connect(connectCb, eventCb) {
    var socket = net.connect('/etc/gui.socket');
    socket.on('connect', function() {
        connectCb(socket);
    });
    socket.on('data', function(data) {
        try {
            var event = JSON.parse(data);
            eventCb(socket, event);
        }
        catch (err) {}
    });
}

function createWindow(socket, x, y, width, height, name) {
    socket.write(JSON.stringify({request: 'createWindow', x: x, y: y, width: width, height: height, name: name}));
}

function destroyWindow(socket, name) {
    socket.write(JSON.stringify({request: 'destroyWindow', name: name}));
}

function transferBuffer(socket, name, buffer) {
    socket.write(JSON.stringify({request: 'transferBuffer', name: name}), async function() {
        await sleep(10);
        socket.write(buffer);
    });
}

module.exports = {connect, createWindow, destroyWindow, transferBuffer};

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  