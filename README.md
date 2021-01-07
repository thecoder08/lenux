# Lenux
Lenux is a linux distribution dedicated to simplicity. Contrary to probably every linux distribution in exsistence, it is NOT bundled with GNU or UNIX software (except for GNU GRUB, the bootloader). The software is all created by me, [thecoder08](https://github.com/thecoder08). All of the software, except for linux itself, is written in node.js. Lenux isn't available for 32-bit systems due to the fact that node.js isn't available for 32-bit linux systems.
## Download
As of now, there is no download. Eventually however, you will be able to go to the releases page and download the img file available. From that, you can create a bootable USB stick using [BalenaEtcher](https://balena.io/etcher) or `dd`. Insert this into the computer on which you wish to install Lenux. Boot from the USB, choose the installation method (CLI or GUI), and follow along with the instructions it gives you.
## Documentation
Documentation for each package can be accessed with
```
doc [package]
```
