# Lenux
Lenux is a linux distribution for 64-bit x86 computers dedicated to simplicity. Contrary to probably every linux distribution in exsistence (apart from maybe Alpine), it is NOT bundled with GNU or UNIX software*. The software is all created by me, [thecoder08](https://github.com/thecoder08). All of the programs, except for Linux, are written in node.js.
## Download
To download, go to the releases page and download the .iso file available. Use it to create a bootable USB stick or CD using [BalenaEtcher](https://balena.io/etcher) or `dd`. Insert this into the computer on which you wish to run Lenux. Simply boot from the USB, and you have a working Lenux system! Log in with username "user" and password "password". To install Lenux to your hard drive, just run the command "setup". You can also run Lenux in a virtual machine like QEMU.
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
./buildlinux.sh
./buildrootfs.sh
./buildiso.sh
```
The buildlinux script requires the kernel dependencies, such as `libelf-dev`, `libssl-dev`, `bison`, and `flex`. You can run `./buildlinux.sh config` to configure Linux before building it. If you choose not to configure it, the buildlinux script will use the config file that comes with the repository. The buildiso script requires the command `grub-mkrescue`. The buildrootfs script requires the command `rsync`.

The script may prompt you for your password. You must give it.

You can then run Lenux on real hardware by using `dd` to flash the image to a USB drive.
## Testing
You can easily test the live code in QEMU by cloning the repository and running
```
./buildlinux.sh
./buildrootfs.sh
./test.sh
```
in the repository directory. The test script requires the command `kvm` (`qemu-system-x86_64`). The default credentials are username "user" and password "password". use the `please` command to run programs as root.
## Known Issues
* Grub may specify the wrong hard drive when running on a real machine.

*With some exceptions. see `doc natives` for details.
