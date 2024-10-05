---
title: Installing Tailscale on Windows 7
tags: [tailscale, windows7]
---

For work, I need to connect to remote VPN devices. My PLC programming software is running inside a Windows 7 VM on my laptop. Tailscale does not support Windows 7 anymore, and there are issues even on older supported versions.

<!-- truncate -->

# My environment

The Windows 7 version I'm using is Windows Thin PC, which is a stripped-down version of Windows 7 (Windows Embedded Standard) that is only available in 32 bits. It is lightweight and runs well on my VM.

# Installing Tailscale

I downloaded Tailscale 1.44.3 from https://pkgs.tailscale.com/stable/. This is the exact link: https://pkgs.tailscale.com/stable/tailscale-setup-1.44.3-x86.msi.

# Download Wintun

I downloaded Wintun 0.14.1 from https://www.wintun.net/. I extracted the contents and copy the appropriate `wintun.dll` into `C:\Windows\system32`.

# Restart Tailscale service

First, I opened an Administrator command line and stopped the service:

```
> net stop tailscale
```

Then, I ran the service manually, and ended it manually after it has run:

```
> tailscaled
...
Ctrl-C
```

During the run, I was asked to install a driver -- it is the Wintun driver, so I just installed it.

Finally, I started the service again:

```
> net start tailscale
```

# Enable Tailscale

Still on the Administrator command line, I generated the login link:

```
> tailscale up
```

And used it to login on my Linux laptop.
