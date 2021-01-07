var fs = require('fs');
var cp = require('child_process');
cp.exec('xsetroot -solid white');
fs.readdir('/usr/share/xsessions/', function(err, data) {
  if (err) {
    console.log(err);
  }
  else {
    for (var i = 0; i < data.length; i++) {
      fs.readFile('/usr/share/xsessions/' + data[i], function(err, data) {
        if (err) {
          console.log(err);
        }
        else {
          var xsessiondata = {};
          var lines = data.toString().split('\n');
          for (var i = 0; i < lines.length; i++) {
            xsessiondata[lines[i].split('=')[0]] = lines[i].split('=')[1];
          }
          var xsession = new Option();
          xsession.innerHTML = xsessiondata['Name'];
          xsession.value = xsessiondata['Exec'];
          $('#xsessions').appendChild(xsession);
        }
      });
    }
  }
});
function submit() {
  if ($('#xsessions').value == 'default') {
    console.log('Executing runuser ' + $('#username').value + ' -c x-session-manager');
    var win = nw.Window.get();
    win.hide();
    var xsession = cp.exec('runuser ' + $('#username').value + ' -c x-session-manager');
    xsession.on('exit', function() {
      process.exit();
    });
  }
  else {
    console.log('Executing runuser ' + $('#username').value + ' -c ' + $('#xsessions').value);
    var win = nw.Window.get();
    win.hide();
    xsession = cp.exec('runuser ' + $('#username').value + ' -c ' + $('#xsessions').value);
    xsession.on('exit', function() {
      process.exit();
    });
    xsession.on('err', function(err) {
      console.log(err);
    });
    xsession.stderr.on('data', function(data) {
      console.log(data.toString());
    });
  }
}
