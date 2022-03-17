---
title: Show Items in Folder
tags: [gui, file manager, dbus]
---

When we download a file in the browser, there is usually an option to "Show in folder". For the longest time, I've been looking for a way to do replicate this functionality on the command line.

<!-- truncate -->

## It's not xdg-open

We know that we can use `xdg-open` to open a file from the command line. By "open" I mean call the associated application and have it open the file requested. So I tried to monitor invocations of `xdg-open` by using the stupidest method there is:

```title="xdg-open"
#!/bin/sh
echo "$0" "$@" >>/tmp/xdg-open-invocations.log
xdg-open-real "$@"
```

Of course, I've renamed the original `xdg-open` binary to `xdg-open-real`.

But I found nothing, no logs.

## It's related to the file manager

I applied the "monitoring" process to Thunar, but I only see a line like this in the log:

```
/usr/bin/Thunar --daemon
```

Something's calling `Thunar` and making it run as a daemon (presumably for faster start-up performance for subsequent calls). But I don't see anything related to the file I was viewing. Apparently `Thunar` doesn't have an option to do that, either.

## Monitoring all process invocations

So I googled a bit and found [this](https://unix.stackexchange.com/questions/260162/how-to-track-newly-created-processes-in-linux). The proper solution is:

```
$ sudo bpftrace -e 'tracepoint:syscalls:sys_enter_exec*{ printf("pid: %d, comm: %s, args: ", pid, comm); join(args->argv); }'
```

:::warning
DO NOT copy solutions blindly from StackOverflow / Google / etc. Understand what it does first, then adapt it or use it accordingly.
:::

However, it doesn't show any process invocations other than the `Thunar --daemon` one.

## Of course it had to be D-Bus

Then it dawned on me that this should concern D-Bus. Using `dbus-monitor`, we can see this:

```
method call time=1644810719.430850 sender=:1.640 -> destination=org.freedesktop.FileManager1 serial=12 path=/org/freedesktop/FileManager1; interface=org.freedesktop.FileManager1; member=ShowItems
   array [
      string "file:///home/william/Downloads/download.pdf"
   ]
   string ""
```

So I can replay it:

```
$ dbus-send --type=method_call --dest=org.freedesktop.FileManager1 /org/freedesktop/FileManager1 org.freedesktop.FileManager1.ShowItems array:string:"file:///home/william/Downloads/download.pdf" string:""
```

And it works! So I created this script to help me:

```title="bin/show-in-folder"
#!/bin/sh

PATH_ARRAY=
for x in "$@"; do
  PATH_ARRAY="$PATH_ARRAY","file://$(pwd)/$x"
done

dbus-send \
  --type=method_call \
  --dest=org.freedesktop.FileManager1 \
  /org/freedesktop/FileManager1 \
  org.freedesktop.FileManager1.ShowItems \
  array:string:"${PATH_ARRAY#,}" \
  string:""
```
