var cp = require('child_process');
function print(text) {
  $('#info').value += text + '\n';
}
function clear() {
  $('#info').value = '';
}
function install() {
  clear();
  print('Creating directory hierarchy...');
  var mkdir = cp.spawn('/bin/mkdir', ['/mnt/lenux/boot', '/mnt/lenux/boot/grub', '/mnt/lenux/proc', '/mnt/lenux/sys', '/mnt/lenux/dev', '/mnt/lenux/run', '/mnt/lenux/usr', '/mnt/lenux/usr/bin', '/mnt/lenux/usr/sbin', '/mnt/lenux/usr/share', '/mnt/lenux/usr/lib', '/mnt/lenux/mnt', '/mnt/lenux/etc', '/mnt/lenux/etc/skel', '/mnt/lenux/root', '/mnt/lenux/home']);
  mkdir.on('exit', function(code, signal) {
    if (code === 0) {
      print('Creating symlinks...');
      var binlink = cp.spawn('/bin/ln', ['-s', 'usr/bin', '/mnt/lenux/bin']);
      binlink.on('exit', function(code, signal) {
        if (code === 0) {
          var sbinlink = cp.spawn('/bin/ln', ['-s', 'usr/sbin', '/mnt/lenux/sbin']);
          sbinlink.on('exit', function(code, signal) {
            if (code === 0) {
              var liblink = cp.spawn('/bin/ln', ['-s', 'usr/lib', '/mnt/lenux/lib']);
              liblink.on('exit', function(code, signal) {
                if (code === 0) {
                  print('Installing kernel...');
                  var kernel = cp.spawn('/bin/cp', ['/lenux/vmlinuz-4.19.0-11-686-pae', '/mnt/lenux/boot']);
                  kernel.on('exit', function(code, signal) {
                    if (code === 0) {
                      print('Installing initrd...');
                      var initrd = cp.spawn('/bin/cp', ['/lenux/initrd.img-4.19.0-11-686-pae', '/mnt/lenux/boot']);
                      initrd.on('exit', function(code, signal) {
                        if (code === 0) {
                          print('Installing GRUB config file...');
                          var grubconf = cp.spawn('/bin/cp', ['/lenux/grub.cfg', '/mnt/lenux/boot/grub/grub.cfg']);
                          grubconf.on('exit', function(code, signal) {
                            if (code === 0) {
                              print('Installing init...');
                              var init = cp.spawn('/bin/cp', ['/lenux/init', '/mnt/lenux/sbin/init']);
                              init.on('exit', function(code, signal) {
                                if (code === 0) {
                                  print('Installing the bourne shell...');
                                  var sh = cp.spawn('/bin/cp', ['/bin/sh', '/mnt/lenux/bin/sh']);
                                  sh.on('exit', function(code, signal) {
                                    if (code === 0) {
                                      print('Success! Click Next.');
                                    }
                                    else {
                                      print('Error installing the bourne shell!');
                                    }
                                  });
                                }
                                else {
                                  print('Error installing init!');
                                }
                              });
                            }
                            else {
                              print('Error installing GRUB config file!');
                            }
                          });
                        }
                        else {
                          print('Error installing initrd!');
                        }
                      });
                    }
                    else {
                      print('Error installing kernel!');
                    }
                  });
                }
                else {
                  print('Error creating symlinks!');
                }
              });
            }
            else {
              print('Error creating symlinks!');
            }
          });
        }
        else {
          print('Error creating symlinks!');
        }
      });
    }
    else {
      print('Error creating directory hierarchy!');
    }
  });
}
