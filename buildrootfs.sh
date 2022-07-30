#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.3 build script!"
echo "Setting up..."
mkdir rootfs
echo "Installing programs..."
sudo rsync -a dirs/ rootfs
sudo rsync -a doc/ rootfs
sudo rsync -a init/ rootfs
sudo rsync -a gnu/ rootfs
sudo rsync -a lpm/ rootfs
sudo rsync -a ls/ rootfs
sudo rsync -a lsh/ rootfs
sudo rsync -a node/ rootfs
sudo rsync -a cat/ rootfs
sudo rsync -a clear/ rootfs
sudo rsync -a echo/ rootfs
sudo rsync -a write/ rootfs
sudo rsync -a cp/ rootfs
sudo rsync -a rm/ rootfs
sudo rsync -a nasm/ rootfs
sudo rsync -a coyote/ rootfs
sudo rsync -a grady-game/ rootfs
sudo rsync -a getty/ rootfs
sudo rsync -a mv/ rootfs
sudo rsync -a mkdir/ rootfs
sudo rsync -a grep/ rootfs
echo "Creating archive..."
cd rootfs
tar -czvf lenux.tar.gz $(ls)
echo "Finishing up..."
cd ..
rm -r rootfs
echo "Done!"