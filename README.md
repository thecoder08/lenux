# Lenux
Lenux is a linux distribution dedicated to simplicity. Contrary to probably every linux distribution in exsistence, it is NOT bundled with GNU or UNIX software (except for GNU GRUB, the bootloader, GNU ld, the dynamic linker, and GNU libc, the standard C library). The software is all created by me, [thecoder08](https://github.com/thecoder08). All of the software, except for linux itself, is written in node.js.
## Download
As of now, there is no download. Eventually however, you will be able to go to the releases page and download the img file available. From that, you can create a bootable USB stick using [BalenaEtcher](https://balena.io/etcher) or `dd`. Insert this into the computer on which you wish to run Lenux. Simply boot from the USB, and you have a working Lenux system! You can also run Lenux in a virtual machine like QEMU.
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
The build script requires the commands `sudo`, `dd`, `losetup`, `fdisk`, `mkfs.ext4`, `mkdir`, `mount`, `rsync`, `grub-install`, `umount`, and `rmdir`.
The installer will prompt you for your password. You must give it. It will also open up an fdisk shell for the disk image. Give it an msdos partition table (this should happen automatically), and at least one partition. It will be automatically formatted it the next step.
