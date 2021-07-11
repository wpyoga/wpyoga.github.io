---
title: Bash Shell Slow Start-up
tags: [bash, shell, slow, nvm, sdkman]
---

As we install development environments in our system, we may notice that terminal start-up can become slow. Some people notice it, some don't -- but the reality is, it's there.

<!-- truncate -->

## Finding the culprit

This initially started when I was [looking at bash start-up time](/blog/2021/07/10/bashrc-directory#self-cleaning-implementation), and that's when I noticed that `nvm` loading was a bit slow.

Here's how I found out, by printing the time taken to execute commands:

```sh
for i in "${HOME}/.bashrc.d"/[0-9][0-9]-*.bashrc; do
  if [ -r "$i" ]; then
    export TIMEFORMAT="%R $i"
    time . "$i"
  fi
done
unset i
unset TIMEFORMAT
```

That gives me this printout when I open a new terminal:

```txt
0.051 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.008 /home/william/.bashrc.d/50-asdf.bashrc
0.266 /home/william/.bashrc.d/50-nvm.bashrc
0.037 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
```

There is another thing that I should check:

```sh
export TIMEFORMAT='%R bashrc check'
time if which mktemp >/dev/null 2>&1; then
  ...
```

Which gives me:

```txt
0.019 bashrc check
```

So, it seems that `nvm` takes the longest time, followed by the default bashrc and then `SDKMAN!`.

The problem with slow loading has been experienced by other people:

- https://github.com/nvm-sh/nvm/issues/1261
- https://github.com/nvm-sh/nvm/issues/1277

Although I'm lucky to now have experienced such slow loading myself.

## The solution

Just like most good ideas, others have already thought about it:

- https://gist.github.com/rtfpessoa/811701ed8fa642f60e411aef04b2b64a
- https://armno.in.th/2020/08/24/lazyload-nvm-to-reduce-zsh-startup-time/
- https://www.ioannispoulakas.com/2020/02/22/how-to-speed-up-shell-load-while-using-nvm/

But [this one](http://broken-by.me/lazy-load-nvm/) looks the most promising.

So I adapted it for my own use:

```sh
nvm() {
  unset -f nvm node npm
  export NVM_DIR="${HOME}/.nvm"
  [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
  [ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"
  nvm "$@"
}

node() {
  unset -f nvm node npm
  export NVM_DIR="${HOME}/.nvm"
  [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
  [ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"
  node "$@"
}

npm() {
  unset -f nvm node npm
  export NVM_DIR="${HOME}/.nvm"
  [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
  [ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"
  npm "$@"
}
```

Now the timings have improved:

```txt
0.034 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.002 /home/william/.bashrc.d/50-asdf.bashrc
0.000 /home/william/.bashrc.d/50-nvm.bashrc
0.039 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
0.018 bashrc check
```

## Anything else?

Let's use the same technique for SDKMAN! as well then:

```sh
sdk() {
  unset -f sdk
  export SDKMAN_DIR="${HOME}/.sdkman"
  [ -s "${SDKMAN_DIR}/bin/sdkman-init.sh" ] && . "${SDKMAN_DIR}/bin/sdkman-init.sh"
  sdk "$@"
}
```

With this, we have shaved more time off our start-up:

```txt
0.060 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.004 /home/william/.bashrc.d/50-asdf.bashrc
0.000 /home/william/.bashrc.d/50-nvm.bashrc
0.000 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
0.018 bashrc check
```

Great, now we just have to worry about the default `.bashrc` and the checking part :)

But that's another matter for another day.
