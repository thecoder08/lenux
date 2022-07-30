#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.3 build script!"
echo "Setting up..."
dd if=/dev/zero of=lenux.img bs=1024 count=500000
sudo losetup -P loop8 lenux.img
cat lenux.sfdisk | sudo sfdisk /dev/loop8
sudo mkfs.ext4 /dev/loop8p1
sudo mkdir /mnt/lenux
sudo mount /dev/loop8p1 /mnt/lenux
echo "Installing rootfs..."
sudo tar -xvf lenux.tar.gz -C /mnt/lenux
echo "Installing kernel..."
sudo rsync -a kernel/ /mnt/lenux
echo "Installing GRUB..."
sudo rsync -a grub-cfg/ /mnt/lenux
sudo grub-install --target=i386-pc --boot-directory=/mnt/lenux/boot /dev/loop8
echo "Finishing up..."
sudo umount /mnt/lenux
sudo rmdir /mnt/lenux
sudo losetup -d /dev/loop8
echo "Build succeded!"
