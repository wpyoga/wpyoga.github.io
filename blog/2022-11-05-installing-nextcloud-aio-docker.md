---
title: Installing Nextcloud AIO on Docker
tags: [nextcloud, nextcloud-aio, docker]
---

I'm trying out self-hosted collaboration platforms. This time, I'm installing Nextcloud AIO on Docker. I'm using Caddy as a reverse proxy, because there will be multiple sites on the same server.

<!-- truncate -->

# Installing Docker

This is the first time I'm installing docker, so I roughly followed the steps outlined here on [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04).

```console
# curl https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/trusted.gpg.d/docker.asc
# echo "deb https://download.docker.com/linux/ubuntu jammy stable" > /etc/apt/sources.list.d/docker.list
# apt update
# apt install docker-ce
# usermod -a -G docker wpyoga
```

# Installing Nextcloud AIO

Then I roughly followed the steps outlined here on [Github](https://github.com/nextcloud/all-in-one/blob/main/reverse-proxy.md).

```console
$ docker run -d \
  --restart always \
  --sig-proxy=false \
  --publish 127.0.0.1:8080:8080 \
  -e APACHE_IP_BINDING=127.0.0.1 \
  -e APACHE_PORT=11000 \
  --name nextcloud-aio-mastercontainer \
  --volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
  --volume /var/run/docker.sock:/var/run/docker.sock:ro \
  nextcloud/all-in-one:latest
```

If you didn't do it right, remove the container and re-create it again. This is one of the quirks of Docker... container configuration is "immutable".

# Nextcloud initial set up

After the initial docker container is up and running, I set up a tunnel in order to access the configuration interface on `localhost:8080`:

```console
$ ssh my-server -L 8080:127.0.0.1:8080
```

The configuration interface is easy to follow, and I enabled all the available services.

# Caddy set up

This is the configuration for the reverse proxy in `/etc/caddy/Caddyfile`:

```
example.com {
	reverse_proxy 127.0.0.1:11000
}
```

Caddy can be configured to use multiple upstream servers if needed.

To disable http, I also added this global configuration block right at the beginning of the file:

```
{
	auto_https disable_redirects
}
```
