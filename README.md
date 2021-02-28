# Lenux
Lenux is a linux distribution dedicated to simplicity. Contrary to probably every linux distribution in exsistence, it is NOT bundled with GNU or UNIX software (except for GNU GRUB, the bootloader, GNU ld, the dynamic linker, and GNU libc, the standard C library). The software is all created by me, [thecoder08](https://github.com/thecoder08). All of the software, except for linux itself, is written in node.js.
## Download
As of now, there is no download. Eventually however, you will be able to go to the releases page and download the img file available. From that, you can create a bootable USB stick using [BalenaEtcher](https://balena.io/etcher) or `dd`. Insert this into the computer on which you wish to install Lenux. Boot from the USB, choose the installation method (CLI or GUI), and follow along with the instructions it gives you.
## Documentation
Documentation for each package can be accessed using the Lenux documentation system with
```
doc [package]
```
