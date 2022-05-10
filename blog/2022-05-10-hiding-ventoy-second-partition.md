---
title: Hiding Ventoy's second partition
tags: [ventoy, vtoyefi, reserved partition]
---

When we install Ventoy on a USB stick, it creates 2 partitions: Ventoy and VTOYEFI. We put ISO images into the Ventoy partition, but rarely, if ever, touch the VTOYEFI partition. However, both partitions are mounted every time the USB stick is inserted, be it in Windows or in Linux. My goal is to disable this behaviour, while making sure the USB stick is still fully functional.

<!-- truncate -->

# Partition structure

The partitions created by Ventoy look like this:

```
Disk /dev/sdb: 57.31 GiB, 61530439680 bytes, 120176640 sectors
Disk model:  SanDisk 3.2Gen1
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: A59926BF-48A9-4C4E-8243-F2AD5921CDC2

Device         Start       End   Sectors  Size Type
/dev/sdb1       2048 120111063 120109016 57.3G Microsoft basic data
/dev/sdb2  120111064 120176599     65536   32M Microsoft basic data
```

`/dev/sdb1` is the bigger Ventoy partition, and `/dev/sdb2` is the smaller VTOYEFI partition.

# Solution

The solution turns out to be somewhat simple: change the VTOYEFI partition's type to "Windows recovery environment". This can be done using `fdisk`:

```
Welcome to fdisk (util-linux 2.34).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p
Disk /dev/sdb: 57.31 GiB, 61530439680 bytes, 120176640 sectors
Disk model:  SanDisk 3.2Gen1
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: A59926BF-48A9-4C4E-8243-F2AD5921CDC2

Device         Start       End   Sectors  Size Type
/dev/sdb1       2048 120111063 120109016 57.3G Microsoft basic data
/dev/sdb2  120111064 120176599     65536   32M Microsoft basic data

Command (m for help): t
Partition number (1,2, default 2): 2
Partition type (type L to list all types): 14

Changed type of partition 'Microsoft basic data' to 'Windows recovery environment'.

Command (m for help): w
The partition table has been altered.
Syncing disks.
```

:::note
You can type `L` when prompted, to see all the different partition types:
```
  1 EFI System                     C12A7328-F81F-11D2-BA4B-00A0C93EC93B
  2 MBR partition scheme           024DEE41-33E7-11D3-9D69-0008C781F39F
  3 Intel Fast Flash               D3BFE2DE-3DAF-11DF-BA40-E3A556D89593
  4 BIOS boot                      21686148-6449-6E6F-744E-656564454649
  5 Sony boot partition            F4019732-066E-4E12-8273-346C5641494F
  6 Lenovo boot partition          BFBFAFE7-A34F-448A-9A5B-6213EB736C22
  7 PowerPC PReP boot              9E1A2D38-C612-4316-AA26-8B49521E5A8B
  8 ONIE boot                      7412F7D5-A156-4B13-81DC-867174929325
  9 ONIE config                    D4E6E2CD-4469-46F3-B5CB-1BFF57AFC149
 10 Microsoft reserved             E3C9E316-0B5C-4DB8-817D-F92DF00215AE
 11 Microsoft basic data           EBD0A0A2-B9E5-4433-87C0-68B6B72699C7
 12 Microsoft LDM metadata         5808C8AA-7E8F-42E0-85D2-E1E90434CFB3
 13 Microsoft LDM data             AF9B60A0-1431-4F62-BC68-3311714A69AD
 14 Windows recovery environment   DE94BBA4-06D1-4D40-A16A-BFD50179D6AC
 15 IBM General Parallel Fs        37AFFC90-EF7D-4E96-91C3-2D7AE055B174
 16 Microsoft Storage Spaces       E75CAF8F-F680-4CEE-AFA3-B001E56EFC2D
 17 HP-UX data                     75894C1E-3AEB-11D3-B7C1-7B03A0000000
 18 HP-UX service                  E2A1E728-32E3-11D6-A682-7B03A0000000
 19 Linux swap                     0657FD6D-A4AB-43C4-84E5-0933C84B4F4F
 20 Linux filesystem               0FC63DAF-8483-4772-8E79-3D69D8477DE4
 ...
```
:::

# Non-suitable partition types for VTOYEFI

## EFI System

If we use this partition type, Windows 10 installation cannot proceed. Just after copying initial files, the installer will abort with the error "Windows could not prepare the computer to boot into the next phase of installation."

## Microsoft reserved

Using this partition type, the VTOYEFI partition is not mounted on Linux, but it is still mounted on Windows and shows up on This PC (My Computer). The weird thing is, Disk Management does not show this partition at all.
