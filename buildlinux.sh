#!/bin/bash
set -e
KERNEL_VERSION=5.15.3
KERNEL_MAJOR_VERSION=5
CORES=12
wget https://cdn.kernel.org/pub/linux/kernel/v$KERNEL_MAJOR_VERSION.x/linux-$KERNEL_VERSION.tar.xz
tar -xvf linux-$KERNEL_VERSION.tar.xz
rm linux-$KERNEL_VERSION.tar.xz
cp config linux-$KERNEL_VERSION/.config
cd linux-$KERNEL_VERSION
make bzImage -j $CORES
mkdir ../kernel/boot
mv arch/x86/boot/bzImage ../kernel/boot/linux
cd ..
rm -r linux-$KERNEL_VERSION
