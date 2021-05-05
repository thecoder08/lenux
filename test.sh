#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.2 test script!"
echo "Setting up..."
dd if=/dev/zero of=test.img bs=512 count=4194304
/sbin/mkfs.ext4 test.img
sudo mkdir /mnt/lenux
sudo mount test.img /mnt/lenux
echo "Installing programs..."
sudo rsync -a dirs/ /mnt/lenux
sudo rsync -a doc/ /mnt/lenux
sudo rsync -a dynamic-linker/ /mnt/lenux
sudo rsync -a grub-cfg/ /mnt/lenux
sudo rsync -a init/ /mnt/lenux
sudo rsync -a kernel/ /mnt/lenux
sudo rsync -a libs/ /mnt/lenux
sudo rsync -a lpm/ /mnt/lenux
sudo rsync -a ls/ /mnt/lenux
sudo rsync -a lsh/ /mnt/lenux
sudo rsync -a node/ /mnt/lenux
sudo rsync -a cat/ /mnt/lenux
sudo rsync -a bash/ /mnt/lenux
sudo rsync -a echo/ /mnt/lenux
sudo rsync -a write/ /mnt/lenux
sudo rsync -a cp/ /mnt/lenux
sudo rsync -a rm/ /mnt/lenux
sudo rsync -a nasm/ /mnt/lenux
sudo rsync -a coyote/ /mnt/lenux
sudo rsync -a grady-game/ /mnt/lenux
echo "Finishing up..."
sudo umount /mnt/lenux
sudo rmdir /mnt/lenux
echo "Running test image..."
qemu-system-i386 -m 2048 -hda test.img -kernel kernel/boot/vmlinuz-4.19.0-11-686-pae -initrd kernel/boot/initrd.img-4.19.0-11-686-pae -append "root=/dev/sda rw"
rm test.img
echo "Done!"
