#!/bin/bash
set -e
echo "Welcome to the Lenux 1.0.3 build script!"
echo "Setting up..."
mkdir rootfs
echo "Installing programs..."
rsync -a dirs/ rootfs
rsync -a doc/ rootfs
rsync -a init/ rootfs
rsync -a gnu/ rootfs
rsync -a lpm/ rootfs
rsync -a ls/ rootfs
rsync -a lsh/ rootfs
rsync -a node/ rootfs
rsync -a cat/ rootfs
rsync -a clear/ rootfs
rsync -a echo/ rootfs
rsync -a write/ rootfs
rsync -a cp/ rootfs
rsync -a rm/ rootfs
rsync -a nasm/ rootfs
rsync -a coyote/ rootfs
rsync -a grady-game/ rootfs
rsync -a getty/ rootfs
rsync -a mv/ rootfs
rsync -a mkdir/ rootfs
rsync -a grep/ rootfs
rsync -a readlink/ rootfs
rsync -a gui/ rootfs
echo "Creating archive..."
cd rootfs
tar -czvf ../lenux.tar.gz $(ls)
echo "Finishing up..."
cd ..
rm -r rootfs
echo "Done!"