---
title: When My Server's Wi-Fi Got Disconnected
tags: [wifi, NetworkManager]
---

A few days ago, I just installed an NVMe SSD on my home server. Then I went on a quick trip, and found out that I couldn't access my server anymore. I had thought to myself, could it be that the SSD was bad? (I bought it used, but barely)

It turns out that the default NetworkManager settings are not suitable for my use-case, as described by [this forum post](https://community.home-assistant.io/t/wifi-does-not-reconnect-if-router-was-gone/247532/5):

> The [nmcli docs](https://developer.gnome.org/NetworkManager/stable/settings-connection.html) state:
> 
> > The number of times a connection should be tried when autoactivating before giving up. Zero means forever, -1 means the global default (4 times if not overridden).
> 
> Four? Why four? Why not 42? What kind of default is that supposed to be?
> Kind of “Please try, but not that hard.” 🙂

Before you say anything, yes I use a Wi-Fi adapter for my home server. It's just an educational server running a few VM's, so Wi-Fi makes sense here. Running a cable between the server and the router would have complicated the installation.

<!-- truncate -->

## Initial discovery

I was in my hotel room, checking up on my home server, when I found that it cannot be accessed. Note that I live in a third-world country, where IP addresses are not given out to home broadband subscribers anymore, so I have to rely on a reverse proxy or VPN to access my home network.

I checked my reverse proxy, the proxy server is up and running. When I checked my VPN, it shows that my home server had disconnected the previous night. I had indeed installed an NVMe SSD the previous night, and I thought the SSD might have been corrupted (I'm running a few VM's on it), or maybe the PCIe adapter was broken (no more space for an additional NVMe SSD on the motherboard).

Another possibility that came to mind was, one or more VM's used up all the memory, and the VPN client died due to an OOM condition. Not sure if this is possible in reality. Or, maybe the Wi-Fi adapter (it's a cheap USB adapter)

Anyway, I didn't think much about it, and waited until I could get home to diagnose the issue.

## Back home

As soon as I got back home, I checked the server and saw that it's still powered on. I tried pinging the server and got no response. I tried unplugging and plugging the Wi-Fi adapter, and the server was back online after the second try. It was then that I remembered, I had unplugged the Wi-Fi access point right around the time the VPN client was disconnected.

## Figuring out the issue

I was hoping for some Wi-Fi driver crash to explain the issue, but found nothing in dmesg. Then I looked at NetworkManager logs and found this:

```
Jan 20 21:46:48 wmpc NetworkManager[734]: <info>  [1642690008.5546] manager: NetworkManager state is now CONNECTED_SITE
Jan 20 21:46:50 wmpc NetworkManager[734]: <info>  [1642690010.0196] manager: NetworkManager state is now CONNECTED_GLOBAL
Jan 20 21:57:00 wmpc NetworkManager[734]: <warn>  [1642690620.4089] sup-iface[0x55b52f610120,wlxf428531ddf06]: connection disconnected (reason -4)
Jan 20 21:57:00 wmpc NetworkManager[734]: <info>  [1642690620.4278] device (wlxf428531ddf06): supplicant interface state: completed -> disconnected
Jan 20 21:57:00 wmpc NetworkManager[734]: <info>  [1642690620.5123] device (wlxf428531ddf06): supplicant interface state: disconnected -> scanning
Jan 20 21:57:15 wmpc NetworkManager[734]: <warn>  [1642690635.5544] device (wlxf428531ddf06): link timed out.
Jan 20 21:57:15 wmpc NetworkManager[734]: <info>  [1642690635.5555] device (wlxf428531ddf06): state change: activated -> failed (reason 'ssid-not-found', sys-iface-state: 'managed')
Jan 20 21:57:15 wmpc NetworkManager[734]: <warn>  [1642690635.5590] device (wlxf428531ddf06): Activation: failed for connection 'mywifi'
Jan 20 21:57:15 wmpc NetworkManager[734]: <info>  [1642690635.5604] device (wlxf428531ddf06): state change: failed -> disconnected (reason 'none', sys-iface-state: 'managed')
Jan 20 21:57:15 wmpc NetworkManager[734]: <info>  [1642690635.5837] manager: NetworkManager state is now CONNECTED_LOCAL
Jan 20 21:57:20 wmpc NetworkManager[734]: <info>  [1642690640.1888] device (wlxf428531ddf06): supplicant interface state: scanning -> inactive
```

The link timed out at around 10 PM on Thursday, and it didn't reconnect.

After some googling, I found out the reason here: https://community.home-assistant.io/t/wifi-does-not-reconnect-if-router-was-gone/247532/5

When I ran `nmcli con show my-network`, I saw these lines in the output:

```
connection.autoconnect:                 yes
connection.autoconnect-priority:        0
connection.autoconnect-retries:         -1 (default)
```

## The solution

So I ran:

```shell-session
$ sudo nmcli con mod my-network connection.autoconnect-retries 0
```

That command updated the configuration into:

```
connection.autoconnect:                 yes
connection.autoconnect-priority:        0
connection.autoconnect-retries:         0 (forever)
```

To confirm that the settings will also be applied after a reboot, I checked `/etc/NetworkManager/system-connections/my-network.nmconnection`:

```ini
[connection]
id=mywifi
uuid=01234567-89ab-cdef-0123-456789abcdef
type=wifi
autoconnect-retries=0
```

With this setting in place, the configuration will survive reboots.
