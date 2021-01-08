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
  console.log('Extracting ' + args[2] + '.lpf...');
  tar.extract({file: args[2] + '.lpf', cwd: '/etc/lpmextract'});
  var pkgname = fs.readFileSync('/etc/lpmextract/' + args[2] + '/PKGNAME');
  fs.unlinkSync('/etc/lpmextract/' + args[2] + '/PKGNAME');
  var db = JSON.parse(fs.readFileSync('/etc/lpmcache'));
  console.log('Writing to database...');
  db[pkgname] = getAllFiles('/etc/lpmextract/' + args[2]);
  fs.writeFileSync('/etc/lpmcache', JSON.stringify(db));
  console.log('Installing ' + pkgname + '...');
  mergedirs('/etc/lpmextract/' + args[2], '/home/lennonmclean/fakeroot', 'overwrite');
  fs.rmdirSync('/etc/lpmextract/' + args[2], {recursive: true});
}
