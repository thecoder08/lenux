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
echo "Setting permissions..."
sudo chown -R 0 /mnt/lenux
sudo chgrp -R 0 /mnt/lenux
sudo chown -R 1000 /mnt/lenux/home/user
sudo chgrp -R 1000 /mnt/lenux/home/user
sudo cp /mnt/lenux/usr/bin/node /mnt/lenux/usr/bin/snode
sudo chmod +s /mnt/lenux/usr/bin/snode
echo "Finishing up..."
sudo umount /mnt/lenux
sudo rmdir /mnt/lenux
echo "Running test image..."
kvm -m 256M -smp $(nproc) -vga std -cpu kvm64 -drive file=test.img,format=raw -kernel kernel/boot/linux -append "root=/dev/sda rw vga=0x312"
echo "Removing test image..."
rm test.img
echo "Done!"
