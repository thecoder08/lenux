#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.3 test script!"
echo "Setting up..."
dd if=/dev/zero of=test.img bs=1024 count=500000
/sbin/mkfs.ext4 test.img
chmod o+w test.img
sudo mkdir /mnt/lenux
sudo mount test.img /mnt/lenux
echo "Installing programs..."
sudo rsync -a dirs/ /mnt/lenux
sudo rsync -a doc/ /mnt/lenux
sudo rsync -a init/ /mnt/lenux
sudo rsync -a gnu/ /mnt/lenux
sudo rsync -a lpm/ /mnt/lenux
sudo rsync -a ls/ /mnt/lenux
sudo rsync -a lsh/ /mnt/lenux
sudo rsync -a node/ /mnt/lenux
sudo rsync -a cat/ /mnt/lenux
sudo rsync -a clear/ /mnt/lenux
sudo rsync -a echo/ /mnt/lenux
sudo rsync -a write/ /mnt/lenux
sudo rsync -a cp/ /mnt/lenux
sudo rsync -a rm/ /mnt/lenux
sudo rsync -a nasm/ /mnt/lenux
sudo rsync -a coyote/ /mnt/lenux
sudo rsync -a grady-game/ /mnt/lenux
sudo rsync -a getty/ /mnt/lenux
sudo rsync -a mv/ /mnt/lenux
sudo rsync -a mkdir/ /mnt/lenux
sudo rsync -a grep/ /mnt/lenux
echo "Finishing up..."
sudo umount /mnt/lenux
sudo rmdir /mnt/lenux
echo "Running test image..."
qemu-system-x86_64 -m 2048 -hda test.img -kernel kernel/boot/linux -append "root=/dev/sda rw quiet vga=ask"
echo "Removing test image..."
rm test.img
echo "Done!"
