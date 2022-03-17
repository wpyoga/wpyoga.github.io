---
title: Migrating Windows 10 from HDD to SSD using Linux
tags: [win10, hdd, ssd, migration, linux, parted]
---

Nowadays, with the price of SSDs getting cheaper all the time, we would often upgrade an existing laptop HDD into an SSD. And most of the time, in order to do that, it is best to migrate the existing Windows installation on the HDD.

Migrating a Windows 10 installation from HDD to SSD is usually done using Windows tools like the [Samsung Data Migration Software](https://semiconductor.samsung.com/consumer-storage/support/tools/) or various forms of AOMEI Partition Assistant. I never trusted the latter application 100%, to be very honest.

Also, this time I don't have Admin access on the laptop to be migrated. At least not on Windows 10. But the BIOS (UEFI) is unlocked, so we can at least boot a Linux live ISO.

<!-- truncate -->

## Hardware preparation

First, we prepare these tools:
- screwdrivers
- an external HDD case
- a bootable Linux live ISO
- a bootable Windows 10 installer

:::tip
For the Linux live ISO and the Windows 10 installer, use [Ventoy](https://ventoy.net). Then you can have both on one single USB stick.
:::

We remove the existing HDD, and then install the new SSD inside the laptop. This is usually done together with a RAM upgrade, because RAM is relatively cheap nowadays.

After that, install the old HDD into the external HDD case.

## Do the migration

1. Boot the laptop into the Linux live ISO.
1. Plug the external HDD case into the laptop.
1. Use `lsblk` to help identify the HDD and SSD device nodes.
1. Use `fdisk -l /dev/sdX` to verify the identities of the HDD and SSD device nodes.
    - Let's say the HDD is `/dev/sdc` and the SSD is `/dev/sda`
1. Copy the partition layout of the HDD and apply it onto the SSD: `sfdisk -d /dev/sdc | sfdisk /dev/sda`
1. Open gparted, and copy the original partitions on the HDD onto the SSD. Usually, there will be at least 2 partitions on the original HDD, one for the EFI partition and another one for the Windows partition.
1. Still in gparted, resize the Windows partition to fill up all the available space (if needed).
1. Reboot into the Windows 10 installer, and then repair the Windows boot manager:
    ```
    bootrec /RebuildBcd
    bootrec /fixMbr
    bootrec /fixboot
    bootsect /nt60 SYS
    ```

:::note
Read the `sfdisk` man page for more options, and also consider backing up all partition tables before doing anything.
:::

## What if...?

### What if the original Windows partitions don't fit on the SSD?

Resize your Windows partition before replacing the HDD. Make it as small as possible, and don't worry because you can always extend it using gparted later.

Alternatively, you can try to resize your Windows partition using gparted. Others have had [success](https://superuser.com/questions/821131/is-it-safe-to-resize-windows-partition-with-gparted), but I haven't tried it yet.

## What if I don't have a Linux live ISO with a desktop?

You can still copy the partitions using `dd`. Then you can use `parted` or `sfdisk` or even `fdisk` to resize the partition, and `ntfsresize` to grow the filesystem.
