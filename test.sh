#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.3 test script!"
echo "Setting up..."
dd if=/dev/zero of=test.img bs=1024 count=500000
/sbin/mkfs.ext4 test.img
chmod o+w test.img
sudo mkdir /mnt/lenux
sudo mount test.img /mnt/lenux
echo "Installing rootfs..."
sudo tar -xvf lenux.tar.gz -C /mnt/lenux
echo "Finishing up..."
sudo umount /mnt/lenux
sudo rmdir /mnt/lenux
echo "Running test image..."
qemu-system-x86_64 -m 2048 -vga std -hda test.img -kernel kernel/boot/linux -append "root=/dev/sda rw quiet vga=ask"
echo "Removing test image..."
rm test.img
echo "Done!"
