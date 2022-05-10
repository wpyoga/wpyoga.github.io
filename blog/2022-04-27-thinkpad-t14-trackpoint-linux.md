---
title: ThinkPad T14 TrackPoint & Linux
tags: [thinkpad, t14, trackpoint, linux, mouse]
---

On the ThinkPad T14, the TrackPoint does not work so well in Linux. Pointer movement is choppy and is just not smooth overall. When debugged using `libinput debug-events`, we can see that the polling rate is only about 30 Hz.

However, there is a workaround.

<!-- truncate -->

# Workaround

The trick is to reload the `psmouse` module, and [force it](https://forums.lenovo.com/t5/Fedora/T14s-AMD-Trackpoint-almost-unusable/m-p/5064952?page=5#5494798) to use the ImPS/2 protocol.

```shell-session
$ sudo rmmod psmouse
$ sudo modprobe psmouse proto=imps
```

This works on Ubuntu-based distros. For Fedora, since the psmouse module is actually built into the kernel, the `proto` parameter has to be passed on boot, appended to the Linux kernel command line:

```shell-session
psmouse.proto=imps
```

In order to apply it on boot, create the file `/etc/default/grub.d/99_trackpoint.cfg`:

```sh
GRUB_CMDLINE_LINUX="psmouse.proto=imps"
```

After applying this workaround, the polling rate goes up to about 80 Hz. However, there are two issues:
- Pointer movement is now too slow
- The TouchPad doesn't work at all

I don't use the TouchPad, so it's not an issue for me. The slow pointer movement can be alleviated somewhat.

# Speed up pointer movement

In order to speed up the pointer movement, we can use a Coordinate Transformation Matrix:
- https://askubuntu.com/a/1308058
- https://unix.stackexchange.com/a/177640
- https://wiki.ubuntu.com/X/InputCoordinateTransformation

You can play around with the matrix values, but this works best for me:

```shell-session
xinput set-prop 'PS/2 Synaptics TouchPad' 'Coordinate Transformation Matrix' 3.5 0 0 0 3.5 0 0 0 1
```

Then, open the XFCE mouse settings and adjust the Acceleration settings. For me, `3.0` gives me the best results.

The numbers above may vary between ThinkPad models, and even between different TrackPoint brands within the same model.

To make it permanent, create the file `/etc/X11/xorg.conf.d/99-trackpoint.conf`:

```
Section "InputClass"
	Identifier "TrackPoint"
	MatchProduct "PS/2 Synaptics TouchPad"
	Option "TransformationMatrix" "3.5 0 0 0 3.5 0 0 0 1"
EndSection
```

# Notes

On older ThinkPads, setting the `rate`, `speed`, and `sensitivity` via sysfs works. However, it doesn't work on the T14.

# TODO

The above is just a workaround, and you can even call it a kludge.

The proper fix might be two-fold:
- Fix the psmouse driver to recognize and work around the faulty TrackPoint
- Implement [constant scale factor](https://gitlab.freedesktop.org/libinput/libinput/-/issues/281) for libinput

Note:
- This might be related to the fact that the T450s TrackPoint [sometimes stutters](https://www.reddit.com/r/thinkpad/comments/fmt09q/trackpad_sometimes_interferes_with_trackpoint/)
