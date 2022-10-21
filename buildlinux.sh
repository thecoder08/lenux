#!/bin/bash
set -e
KERNEL_VERSION=6.0.3
CORES=$(nproc)
wget https://cdn.kernel.org/pub/linux/kernel/v${KERNEL_VERSION:0:1}.x/linux-$KERNEL_VERSION.tar.xz
tar -xvf linux-$KERNEL_VERSION.tar.xz
rm linux-$KERNEL_VERSION.tar.xz
cp logo.ppm linux-$KERNEL_VERSION/drivers/video/logo/logo_linux_clut224.ppm
cp config linux-$KERNEL_VERSION/.config
cd linux-$KERNEL_VERSION
if test "$1" == "config"
then
make menuconfig
cp .config ../config
fi
make bzImage -j $CORES
mkdir ../kernel/boot
mv arch/x86/boot/bzImage ../kernel/boot/linux
cd ..
rm -r linux-$KERNEL_VERSION
