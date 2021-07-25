---
title: Using a `.bashrc.d` directory instead of just `.bashrc`
tags: [bash, bashrc, bashrc.d, shell]
---

When we install a new development environment, the installer will usually modify `~/.bashrc` or `~/.profile`. However, this is not very clean, because sometimes the entries are not removed when the development environment is uninstalled.

<!-- truncate -->

## Why use a directory?

By using a directory, we can add and remove customizations by simply adding and removing files. Consider this example: when we install [SDKMAN!](https://sdkman.io/), the installer adds these lines to `~/.bashrc` by default:

```sh
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="/home/william/.sdkman"
[[ -s "/home/william/.sdkman/bin/sdkman-init.sh" ]] && source "/home/william/.sdkman/bin/sdkman-init.sh"
```

Then when we uninstall SDKMAN!, we have to open the `~/.bashrc` file and remove the lines that were added.

The same thing happens with `nvm`, a popular version manager for `Node.js`.

Some installers even had to let the user edit `~/.bashrc` by hand.

## Historical precedence

Actually, this is not a new idea. The directory `/etc/profile.d` exists for the same reason, albeit for software installed directly onto the system. The contents of this directory is sourced in by `/etc/profile`, as seen in the snippet below:

```sh
if [ -d /etc/profile.d ]; then
  for i in /etc/profile.d/*.sh; do
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
```

Also, someone else has [blogged about this topic](https://waxzce.medium.com/use-bashrc-d-directory-instead-of-bloated-bashrc-50204d5389ff) on Medium. However, some Medium articles are blocked by a paywall, and I'm not sure if that article is a paid article, or will be made a paid article at some point in the future, so I'm making this blog post instead. In contrast, this blog will always be free, at least as long as GitHub continues to provide GitHub Pages for free.

## Further information

`~/.bashrc.d`

- (2002) https://bugs.gentoo.org/4854
- (2011) http://blogs.perl.org/users/chisel/2011/08/managing-my-shell-setup.html
- (2012) https://groups.google.com/g/linux.debian.bugs.dist/c/1mDbDViPFFQ
- (2012) https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=675008
- (2015) https://freesoft.dev/program/31617374
- (2015) https://blog.sanctum.geek.nz/tag/bashrc-d/
- (2016) https://lsbbugs.linuxfoundation.org/show_bug.cgi?id=4167
- (2016) https://github.com/jdcapa/bashrc.d
- (2017) https://waxzce.medium.com/use-bashrc-d-directory-instead-of-bloated-bashrc-50204d5389ff
- (2017) https://github.com/oskar404/.bashrc.d
- (2019) https://sneak.berlin/20191011/stupid-unix-tricks/
- (2019) https://bugzilla.redhat.com/show_bug.cgi?id=1726397
- (2019) https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=931353
- (2019) https://bugs.launchpad.net/ubuntu/+source/bash/+bug/1835077
- (2020) https://source.arknet.ch/fmorgner/dotfiles/-/tree/16f950b2ce140a81e45bcad99ea142a6f3f7a7f2/bashrc.d
- (2020) https://dev.to/swiknaba/how-to-organize-your-bash-profile-20eb
- (2020) https://lab.retarded.farm/zappel/zGentoo-playground/-/tree/22e288c8b0ed166d1bc0050f9f00e3fe4708b0d4/etc/bash/bashrc.d
- (2021) https://blog.jbriault.fr/bashrc-d/
- https://g.gg42.eu/framagit/conf-99-basic_config_debian/commit/56f82be3cc0f98af05989f34f44817e90d0e814f
- https://write.as/bpsylevc6lliaspe
- https://timnash.co.uk/bashing-my-bashrc-productivity-fridays/


`/etc/profile.d`:

- https://eng.libretexts.org/Bookshelves/Computer_Science/Operating_Systems/Linux_-_The_Penguin_Marches_On_(McClanahan)/02%3A_User_Group_Administration/5.03%3A_System_Wide_User_Profiles/5.03.2_System_Wide_User_Profiles%3A_The_etc-profile.d_Directory
- (2014) https://askubuntu.com/questions/438150/why-are-scripts-in-etc-profile-d-being-ignored-system-wide-bash-aliases


`profile` and `bashrc` in general:

- (2013) https://bencane.com/2013/09/16/understanding-a-little-more-about-etcprofile-and-etcbashrc/
- (2017) https://scriptingosx.com/2017/04/about-bash_profile-and-bashrc-on-macos/

## Simple implementation

To implement the `~/.bashrc.d` scheme, we first need to make that directory, and then move the original rc file into that directory:

```sh
$ cd
$ mkdir .bashrc.d
$ mv -i .bashrc .bashrc.d/00-default.bashrc
```

After that, we need to make a replacement `~/.bashrc` file that sources all the scripts inside `~/.bashrc.d`. This is basically an adaptation of the code snippet in `/etc/profile`:

```sh
for i in "${HOME}/.bashrc.d"/[0-9][0-9]-*.bashrc; do
  if [ -r "$i" ]; then
    . "$i"
  fi
done
unset i
```

Note that we don't need to test if the directory is present -- if it's not present, then `i` will look something like `/home/william/.bashrc.d/*.bashrc`, so the following test for readability will fail anyway.

With this scheme, when you install a new software or SDK into your personal home directory, just add a new file named something like `50-file.bashrc` in `~/.bashrc.d` and it will be sourced in during shell startup.

## Self-cleaning implementation

With the above implementation, some scripts will still directly modify `~/.bashrc`, and ignore the `~/.bashrc.d` directory. We can actually make a self-cleaning implementation, so that lines appended to `~/.bashrc` will automatically be moved into `~/.bashrc.d`.

An easy way to do that, is by using markers in `~/.bashrc`. The markers tell us when the original file starts and ends, so that we can move all the other content into `~/.bashrc.d`.

To achieve this, we modify `~/.bashrc` even further:

```sh
### BASHRC START
for i in "${HOME}/.bashrc.d"/[0-9][0-9]-*.bashrc; do
  if [ -r "$i" ]; then
    . "$i"
  fi
done
unset i

if which mktemp >/dev/null 2>&1; then
  BASHRC_BEFORE="$(mktemp "${HOME}/.bashrc.d/50-new-XXXXXX")"
  BASHRC_AFTER="$(mktemp "${HOME}/.bashrc.d/50-new-XXXXXX")"
  BASHRC_TEMP="$(mktemp "${HOME}/.bashrc-XXXXXX")"
  BASHRC_MODE=before
  while IFS= read -r LINE; do
    if [ "${LINE}" = '### BASHRC START' ]; then
      BASHRC_MODE=bashrc
    elif [ "${LINE}" = '### BASHRC END' ]; then
      BASHRC_MODE=after
      continue
    fi

    if [ "${BASHRC_MODE}" = 'before' ]; then
      printf '%s\n' "${LINE}" >>"${BASHRC_BEFORE}"
    elif [ "${BASHRC_MODE}" = 'after' ]; then
      printf '%s\n' "${LINE}" >>"${BASHRC_AFTER}"
    else
      printf '%s\n' "${LINE}" >>"${BASHRC_TEMP}"
    fi
  done <"${HOME}/.bashrc"
  # this marker is never printed in the loop
  echo '### BASHRC END' >>"${BASHRC_TEMP}"
  mv "${BASHRC_TEMP}" "${HOME}/.bashrc"

  if [ -s "${BASHRC_BEFORE}" -o -s "${BASHRC_AFTER}" ]; then
    echo "~/.bashrc has been modified. Check the following files for customizations:"
    [ -s "${BASHRC_BEFORE}" ] && echo "* ${BASHRC_BEFORE}"
    [ -s "${BASHRC_AFTER}" ] && echo "* ${BASHRC_AFTER}"
  else
    [ ! -s "${BASHRC_BEFORE}" ] && rm "${BASHRC_BEFORE}"
    [ ! -s "${BASHRC_AFTER}" ] && rm "${BASHRC_AFTER}"
  fi
  unset BASHRC_BEFORE BASHRC_AFTER BASHRC_TEMP BASHRC_MODE
fi
### BASHRC END
```

This looks bloated and unnecessary. But this section takes only 9 ms on my laptop (i5-5200u), so it may not be so slow after all. Still, if you think it's too complicated, you can use the [simple implementation](#simple-implementation) instead.

