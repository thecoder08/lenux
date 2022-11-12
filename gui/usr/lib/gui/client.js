var net = require('net');
function connect(cb) {
    var socket = net.connect('/etc/gui.socket');
    socket.on('connect', function() {
        cb(socket);
    });
}

function createWindow(socket, x, y, width, height, name) {
    socket.write(JSON.stringify({method: "createWindow", x: x, y: y, width: width, height: height, name: name}));
    socket.once('data', function() {});
}