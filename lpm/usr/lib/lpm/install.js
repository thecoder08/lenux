#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var args = process.argv;
var tar = require('tar');
var mergedirs = require('merge-dirs');
function getAllFiles(dirPath, arrayOfFiles) {
  var files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    }
    else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
    }
  });
  return arrayOfFiles;
}
if (args.length < 3) {
  console.log('Invalid Syntax!\n');
  console.log('Correct Syntax:');
  console.log('install [pkgfile]');
  console.log('remove [pkg]');
  console.log('build [pkgdir]');
}
else {
  tar.extract({file: args[2] + '.lpf', cwd: '/tmp/lpm'});
  console.log('Done extracting');
  var pkgname = fs.readFileSync('/tmp/lpm/' + args[2] + '/PKGNAME');
  fs.unlinkSync('/tmp/lpm/' + args[2] + '/PKGNAME');
  var db = JSON.parse(fs.readFileSync('/etc/lpmcache'));
  db[pkgname] = getAllFiles('/tmp/lpm/' + args[2]);
  fs.writeFileSync('/etc/lpmcache', JSON.stringify(db));
  mergedirs('/tmp/lpm/' + args[2], '/home/lennonmclean/fakeroot', 'overwrite');
  fs.rmdirSync('/tmp/lpm/' + args[2], {recursive: true});
}
