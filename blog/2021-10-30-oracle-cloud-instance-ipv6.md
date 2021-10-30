---
title: Enabling IPv6 on Oracle Cloud Instance
tags: [oracle, cloud, instance, oci, ipv6, firewall, firewalld, dhcp]
---

I have a couple of always-free compute instances on Oracle Cloud. By default, each instance gets an IPv4 address, and IPv6 is not enabled.

I tried enabling IPv6 using [instructions I found on the Internet](https://blog.51sec.org/2021/09/enable-ipv6-on-oracle-cloud.html), but:
- it doesn't work for my Oracle Linux 8.4 instance
- even if it did, we have to manually obtain the IPv6 address using `/etc/rc.local` -- this doesn't seem to be the best practice, especially since this is a systemd distro

Hey, I'm all for simplicity and I love SysV init scripts, but if the distro is a systemd distro, then I'll use systemd.
Just like the reason why I have an Oracle Linux instance on Oracle Cloud -- it's supposed to be the best-supported OS on their cloud.
Yes, it's just another clone of RHEL, but I thought it would somehow be better tuned for Oracle Cloud environment...

<!-- truncate -->

Anyway, I do have a Ubuntu instance on Oracle Cloud, and it's much easier to set up and figure out as you can see below.

## Enable and assign IPv6 to the instance

This is done from on the cloud infrastructure, and can be easily done using the [Cloud Console](https://cloud.oracle.com/). These instructions are taken from [the aforementioned article](https://blog.51sec.org/2021/09/enable-ipv6-on-oracle-cloud.html).

Once logged in to the Cloud Console, open the instance to be configured and perform the following actions:

1. Configure VCN: add an IPv6 CIDR block

1. Configure Subnet: enable the CIDR block

1. Configure Security List:

    - Ingress Rules: add IPv6-ICMP type 128 to allow incoming ping (from `::/0`)

    - Egress Rules: allow traffic of all protocols to all destinations (`::/0`)

1. Configure Route Table: add default route to all IPv6 destinations (`::/0`)

1. Configure VNIC: assign an IPv6 address

At this point, an IPv6 address has been assigned to the instance, and the network has been set up properly.

## Obtain the IPv6 address from the instance

Next, obtain the IPv6 address from within the instance itself.

### Oracle Linux

SSH into the instance, and [add DHCPv6 service](https://docs.oracle.com/en-us/iaas/Content/Network/Concepts/ipv6.htm#os_config) to the firewall:

```shell-session
$ sudo firewall-cmd --add-service=dhcpv6-client
```

Check that the firewall setting have been applied properly:

```shell-session
$ sudo firewall-cmd --list-all
```

Tell NetworkManager to obtain the IPv6 address:

```shell-session
$ sudo systemctl restart NetworkManager
```

Wait a few seconds, and then check to see that the IPv6 address has been obtained successfully.
We need to wait a few seconds because dhclient needs some time to obtain and then apply the IPv6 address.

```shell-session
$ ip add
```

If all is well, make the firewall rule permanent:

```shell-session
$ sudo firewall-cmd --add-service=dhcpv6-client --permanent
```

I actually wasted a few hours trying to find this information.
It turns out DHCP was blocked by default and we need to allow it.
Not sure why most people recommend setting the IPv6 statically...

Moral of the story: read the official documentation!

### Ubuntu

SSH into the instance, and reload the network configuration:

```shell-session
$ sudo systemctl restart systemd-networkd
```

That's it. It's much simpler isn't it? :)
