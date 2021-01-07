#!/usr/bin/env node
var tar = require('tar');
var args = process.argv;
if (args.length < 3) {
  console.log('Invalid Syntax!\n');
  console.log('Correct Syntax:');
  console.log('install [pkgfile]');
  console.log('remove [pkg]');
  console.log('build [pkgdir]');
}
else {
  console.log('Building package ' + args[2] + '.lpf from directory ' + args[2] + '...');
  tar.create({gzip: true, file: args[2] + '.lpf'}, [args[2]]);
  console.log('Done!');
}
