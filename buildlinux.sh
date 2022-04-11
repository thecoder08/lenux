#!/bin/bash
set -e
KERNEL_VERSION=5.16.10
CORES=$(nproc)
wget https://cdn.kernel.org/pub/linux/kernel/v${KERNEL_VERSION:0:1}.x/linux-$KERNEL_VERSION.tar.xz
tar -xvf linux-$KERNEL_VERSION.tar.xz
rm linux-$KERNEL_VERSION.tar.xz
cp config linux-$KERNEL_VERSION/.config
cd linux-$KERNEL_VERSION
make bzImage -j $CORES
mkdir ../kernel/boot
mv arch/x86/boot/bzImage ../kernel/boot/linux
cd ..
rm -r linux-$KERNEL_VERSION
