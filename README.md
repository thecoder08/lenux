# Lenux
Lenux is a linux distribution for x86 computers dedicated to simplicity. Contrary to probably every linux distribution in exsistence, it is NOT bundled with GNU or UNIX software (except for GNU GRUB, the bootloader, GNU ld, the dynamic linker, and GNU libc, the standard C library. You can also optionally use GNU bash). The software is all created by me, [thecoder08](https://github.com/thecoder08). All of the software, except for linux itself, is written in node.js.
## Download
To download, go to the releases page and download the .img.gz file available. Extract it with `gunzip` or other utility. From the .img file that remains, you can create a bootable USB stick using [BalenaEtcher](https://balena.io/etcher) or `dd`. Insert this into the computer on which you wish to run Lenux. Simply boot from the USB, and you have a working Lenux system! You can also run Lenux in a virtual machine like QEMU.
## Documentation
Documentation for each package can be accessed using the Lenux documentation system with the command
```
doc [package]
```
## Building
You can build your own Lenux system with your own tweaks using the build script available. Make as many changes to Lenux as you like! Just run the following commands:
```shell
git clone https://github.com/thecoder08/lenux.git
cd lenux
./build.sh
```
The build script requires the commands `sudo`, `dd`, `losetup`, `fdisk`, `mkfs.ext4`, `mkdir`, `mount`, `rsync`, `grub-install`, `umount`, and `rmdir`. Loop device 8 must also be free.
The installer may prompt you for your password. You must give it. It will also open up an fdisk shell for the disk image. Give it an msdos partition table (this should happen automatically), and at least one partition. It will be automatically formatted it the next step.

You should then be able to run `lenux.img` in QEMU using the command
```shell
qemu-system-i386 -hda lenux.img -m 2048
```
for i386 systems, or
```shell
qemu-system-x86_64 -hda lenux.img -m 2048
```
for x86_64 systems. (The same disk image is used for both) again, it is still possible to run Lenux in a real computer.
## Known Issues
* Pressing a key multiple times before it registers.
* Grub may specify the wrong hard drive when runnnig on a real machine.
* Shell crashes if the line is empty
* If the foreground process (usually the shell) exits, init does not disconnect stdin/stdout, resulting in a kernel panic if you try to type something.
