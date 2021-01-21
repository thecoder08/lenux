#!/usr/bin/env node
var fs = require('fs');
var args = process.argv;
var memoryAddress = args[3];
var variable = {};
var code = [];
fs.readFile(args[2], function(err, data) {
  if (err) {
    console.log('Exception: FileReadError');
  }
  else {
    for (var i = 0; i < data.toString().split('\n').length - 1; i++) {
      var line = data.toString().split('\n')[i];
      var params = line.split(' ');
      if (params[0] == '#') {

      }
      else if (params[0] == 'NEW') {
        if (params[1] == 'MAN') {
          variable[params[2]] = params[3];
        }
        else if (params[1] == 'DYN') {
          variable[params[2]] = memoryAddress;
          if (memoryAddress > args[4]) {
            console.log('Exception: OutOfMemoryError');
            process.exit(1);
          }
          memoryAddress++;
        }
        else {
          console.log('Exception: VarTypeError');
          process.exit(1);
        }
      }
      else if (params[1] == '=') {
        if ((params.length == 3) && parseInt(params[2])) {
          code.push(6, parseInt(params[2]));
          code.push(1, parseInt(variable[params[0]]));
        }
        else if ((params.length == 3) && !parseInt(params[2])) {
          code.push(11, parseInt(variable[params[2]]));
          code.push(1, parseInt(variable[params[0]]));
        }
        else if (params.length == 5) {
          code.push(11, parseInt(variable[params[2]]));
          code.push(12, parseInt(variable[params[4]]));
          if (params[3] == '+') {
            code.push(16);
          }
          else {
            console.log('Exception: InvalidOperationError');
          }
          code.push(3, parseInt(variable[params[0]]));
        }
        else {
          console.log('Exception: InvalidAssignmentError');
        }
      }
      else {
        console.log('Exception: CommandParseError');
        process.exit(1);
      }
    }
    fs.writeFile('out.bin', Buffer.from(Int8Array.from(code).buffer), {encoding: 'binary'}, function(err) {
      if (err) {
        console.log('Exception: FileWriteError');
      }
      else {
        console.log('NoException');
      }
    });
  }
});
