#!/usr/bin/node
var SerialPort = require('serialport');
var cp = require('child_process');
var terminal = new SerialPort(process.argv[2]);
var kbdBuffer = '';
var child = cp.spawn(process.argv[3]);
terminal.write('\033[2J');
terminal.write('\033[H');
terminal.on('data', function(data) {
  for (var i = 0; i < data.toString().length; i++) {
    terminal.write(data.toString().charAt(i));
    if (data.toString().charAt(i) == '\177') {
      kbdBuffer = kbdBuffer.slice(0, -1);
      terminal.write(String.fromCharCode(8));
      terminal.write(' ');
      terminal.write(String.fromCharCode(8));
    }
    else if (data.toString().charAt(i) == '\r') {
      terminal.write('\n');
      kbdBuffer += '\n';
      child.stdin.write(kbdBuffer);
      kbdBuffer = '';
    }
    else {
      kbdBuffer += data.toString().charAt(i);
    }
  }
});
child.stdout.on('data', function(data) {
  for (var i = 0; i < data.toString().length; i++) {
    if (data.toString().charAt(i) == '\n') {
      terminal.write('\r');
    }
    terminal.write(data.toString().charAt(i));
  }
});
child.stderr.on('data', function(data) {
  for (var i = 0; i < data.toString().length; i++) {
    if (data.toString().charAt(i) == '\n') {
      terminal.write('\r');
    }
    terminal.write(data.toString().charAt(i));
  }
});
child.on('exit', process.exit);
