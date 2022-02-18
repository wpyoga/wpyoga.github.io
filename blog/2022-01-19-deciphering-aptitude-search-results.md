---
title: Deciphering Aptitude Search Results
tags: [apt, aptitude, search, debian]
---

The output of `apt search xxx` is a little cryptic, and I needed to Google quite a bit before landing on the correct documentation: https://www.debian.org/doc/manuals/aptitude/ch02s02s02.en.html

<!-- truncate -->

## Background

Today, as I was updating my laptop, I got these warnings from `apt update`:

```
W: An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: http://repo.mysql.com/apt/ubuntu focal InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 467B942D3A79BD29
W: An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: http://deb.anydesk.com all InRelease: The following signatures were invalid: EXPKEYSIG 18DF3741CDFFDE29 philandro Software GmbH <info@philandro.com>
W: Failed to fetch http://deb.anydesk.com/dists/all/InRelease  The following signatures were invalid: EXPKEYSIG 18DF3741CDFFDE29 philandro Software GmbH <info@philandro.com>
W: Failed to fetch http://repo.mysql.com/apt/ubuntu/dists/focal/InRelease  The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 467B942D3A79BD29
W: Some index files failed to download. They have been ignored, or old ones used instead.
```

So I thought to myself, I haven't been using Anydesk and MySQL lately, let's remove those packages anyway.

From [this SE post](https://askubuntu.com/questions/342434/find-what-packages-are-installed-from-a-repository), I learned a few commands:

```shell-session
$ apt policy | grep mysql
 500 http://repo.mysql.com/apt/ubuntu focal/mysql-tools i386 Packages
     release o=MySQL,n=focal,l=MySQL,c=mysql-tools,b=i386
     origin repo.mysql.com
 500 http://repo.mysql.com/apt/ubuntu focal/mysql-tools amd64 Packages
     release o=MySQL,n=focal,l=MySQL,c=mysql-tools,b=amd64
     origin repo.mysql.com
 500 http://repo.mysql.com/apt/ubuntu focal/mysql-8.0 amd64 Packages
     release o=MySQL,n=focal,l=MySQL,c=mysql-8.0,b=amd64
     origin repo.mysql.com
 500 http://repo.mysql.com/apt/ubuntu focal/mysql-apt-config i386 Packages
     release o=MySQL,n=focal,l=MySQL,c=mysql-apt-config,b=i386
     origin repo.mysql.com
 500 http://repo.mysql.com/apt/ubuntu focal/mysql-apt-config amd64 Packages
     release o=MySQL,n=focal,l=MySQL,c=mysql-apt-config,b=amd64
     origin repo.mysql.com
```

With `o=MySQL`, I can see that I need to do:

```shell-session
$ apt search "?origin (MySQL) ?installed"
i   libmysqlclient21                        - MySQL shared client libraries
i   mysql-apt-config                        - Auto configuration for MySQL APT Repo.
i A mysql-client                            - MySQL Client meta package depending on latest vers
i   mysql-common                            - Common files shared between packages
i A mysql-community-client                  - MySQL Client
i A mysql-community-client-core             - MySQL Client Core Binaries
i A mysql-community-client-plugins          - MySQL Client plugin
i   mysql-community-server                  - MySQL Server
i A mysql-community-server-core             - MySQL Server Core Binaires
i   mysql-workbench-community               - MySQL Workbench
```

But what do `i` and `A` mean?

## The documentation

It's not easy to find this piece of information. I had to Google a whlie to finally find this: https://www.debian.org/doc/manuals/aptitude/rn01re01.en.html

Under `search`, it explains thus:

> Each search result is listed on a separate line. The first character of each line indicates the current state of the package: the most common states are p, meaning that no trace of the package exists on the system, c, meaning that the package was deleted but its configuration files remain on the system, i, meaning that the package is installed, and v, meaning that the package is virtual. The second character indicates the stored action (if any; otherwise a blank space is displayed) to be performed on the package, with the most common actions being i, meaning that the package will be installed, d, meaning that the package will be deleted, and p, meaning that the package and its configuration files will be removed. If the third character is A, the package was automatically installed.

A more detailed documentation can be found here: https://www.debian.org/doc/manuals/aptitude/ch02s02s02.en.html

In my case, what I need to know is:
- `i` means the package is installed
- `A` means the package was installed automatically -- this means it's a dependency of another package

Alright, now that we know, and because we don't need those packages,we can remove all the installed packages directly, except the ones marked as "automatically installed". Those packages should be automatically removed anyway:

```shell-session
$ sudo apt purge --autoremove mysql-apt-config mysql-common mysql-community-server mysql-workbench-community
```

After that, `apt search "?origin (MySQL) ?installed"` doesn't return anything, so the repo should be safe to remove, or so I thought.

It turns out that removing `mysql-apt-config` also removes the repo, so that saves me another step.
