#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.3 build script!"
echo "Setting up..."
mkdir iso
mkdir initramfs
echo "Installing rootfs..."
tar -xvf lenux.tar.gz -C initramfs
echo "Setting permissions..."
sudo chown -R 0 initramfs
sudo chgrp -R 0 initramfs
sudo chown -R 1000 initramfs/home/user
sudo chgrp -R 1000 initramfs/home/user
sudo cp initramfs/usr/bin/node initramfs/usr/bin/snode
sudo chmod +s initramfs/usr/bin/snode
echo "Building initramfs..."
mkdir iso/boot
(cd initramfs; find . | cpio -o -H newc | gzip) > iso/boot/initramfs.cpio.gz
sudo rm -r initramfs
echo "Installing kernel..."
rsync -a kernel/ iso
rsync -a grub-cfg-iso/ iso
echo "Building ISO..."
grub-mkrescue iso -o lenux.iso
echo "Finishing up..."
rm -r iso
echo "Build succeded!"
