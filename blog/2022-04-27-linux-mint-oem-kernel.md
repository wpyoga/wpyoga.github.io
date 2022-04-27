---
title: Linux Mint OEM Kernel
tags: [thinkpad, t14, linux, kernel]
---

The ThinkPad T14 Gen 1 AMD was released in 2020, and it is actually one of the newest / youngest laptops I ever had. Since I am using Linux Mint, which is based on Ubuntu LTS, the kernel is relatively old and I realized that I need to update to a new kernel if I want to have good hardware compatibility.

The latest release of Linux Mint (20.3) is still based on Ubuntu 20.04 LTS, not Ubuntu 22.04 LTS which was just released -- usually Linux Mint will get a new release a few months after the Ubuntu LTS release. Therefore, I'm upgrading to the latest kernel available in the Ubuntu 20.04 repositories.

<!-- truncate -->

# Install the OEM kernel

The installation in quite straightforward:

```shell-session
$ sudo apt install linux-image-oem-20.04 linux-headers-oem-20.04
```

After installation, I rebooted the laptop and chose the corresponding kernel on the boot menu.

# Remove the other kernels

I then checked that nothing is badly broken, and proceeded to remove the older kernels:

```shell-session
$ sudo apt purge --autoremove linux-generic-hwe-20.04 
$ sudo apt purge --autoremove linux-*-5.4.* linux-*-5.13.*
```

# Note when upgrading to the next Linux Mint version

When I eventually upgrade to the next Linux Mint version, I think I would need to install the regular kernel packages again.
