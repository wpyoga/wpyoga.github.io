---
title: Fast Loading for `nvm` and SDKMAN!
tags: [bash, shell, nvm, sdkman, slow]
---

Some time ago I was trying to [make bash start faster](/blog/2021/07/10/bashrc-directory#self-cleaning-implementation). There, I described a solution to load `nvm` and SDKMAN! faster. However, that solution has a few issues.

<!-- truncate -->

- we always need to call one of `nvm`, `node`, or `npm` before we can call any other node.js-related command
- we can avoid the previous problem by manually adding them to `50-nvm.bashrc`, but this is error-prone and cumbersome
- when we add a new utility, we need to manually add them to the list, and to every function there
- if we switch the default node.js version, then we need to re-evaluate the whole script. for example, our node.js 12 installation has `yarn` installed, but our node.js 14 installation doesn't have it installed. we would then need to remove `yarn` from the bashrc script

To solve this, we need something that:

- can automatically find the currently-used node version
- can autogenerate the list and the functions, according to which utilities are installed

## The solution

After some thinking and experimentation, I have come up with a new solution:

```sh title=".bashrc.d/50-nvm.bashrc"
_DEFAULT=
# read the first line only
[ -s "${HOME}/.nvm/alias/default" ] && read -r _DEFAULT <"${HOME}/.nvm/alias/default"

if [ -n "${_DEFAULT}" ]; then
  # this will simplify the checks below
  _DEFAULT=${_DEFAULT#v}
  _DEFAULT=${_DEFAULT%.}

  if [ -d "${HOME}/.nvm/versions/node/v${_DEFAULT}/bin" ]; then
    _DEFAULT_DIR="${HOME}/.nvm/versions/node/v${_DEFAULT}/bin"
  elif [ -d "${HOME}/.nvm/versions/node/v${_DEFAULT}".*/bin ]; then
    _DEFAULT_DIR="$(echo "${HOME}/.nvm/versions/node/v${_DEFAULT}".*/bin)"
  else
    _DEFAULT_DIR=
  fi

  _NVM_BIN_LIST=
  if [ -n "${_DEFAULT_DIR}" ]; then
    for _EXEC in "${_DEFAULT_DIR}"/*; do
      if [ -x "${_EXEC}" ]; then
        _CMD="${_EXEC##*/}"
        eval "${_CMD}"'() { _nvm_load; '"${_CMD}"' "$@"; }'
        _NVM_BIN_LIST="${_NVM_BIN_LIST} ${_CMD}"
      fi
    done
  fi
fi

_CMD='nvm'
eval "${_CMD}"'() { _nvm_load; '"${_CMD}"' "$@"; }'

eval '_nvm_load() {
  unset -f _nvm_load nvm '"${_NVM_BIN_LIST}"'
  export NVM_DIR="${HOME}/.nvm"
  [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
  [ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"
}'

unset _CMD _NVM_BIN_LIST _EXEC _DEFAULT_DIR _DEFAULT
```

When the script is sourced in by `.bashrc`, it will first try to read the default version. This is usually read in as something like `12` or `12.22`. With that version information, it tries to find the corresponding nvm directory and list all the executables there. For each executable, a placeholder shell function is created. When we first call the placeholder, it will initialize `nvm`, after which everything will return to normal.

This is the environment on my laptop:

```console
william@william-ThinkPad-T450s: ~$ cat .nvm/alias/default
12
william@william-ThinkPad-T450s: ~$ ls -l .nvm/versions/node/v12*/bin/*
-rwxr-xr-x 1 william william 48928552 Apr  6 22:06 .nvm/versions/node/v12.22.1/bin/node
lrwxrwxrwx 1 william william       42 May 17 13:12 .nvm/versions/node/v12.22.1/bin/nodemon -> ../lib/node_modules/nodemon/bin/nodemon.js
lrwxrwxrwx 1 william william       38 Jun 21 01:34 .nvm/versions/node/v12.22.1/bin/npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxrwxrwx 1 william william       38 Jun 21 01:34 .nvm/versions/node/v12.22.1/bin/npx -> ../lib/node_modules/npm/bin/npx-cli.js
lrwxrwxrwx 1 william william       36 Jun 10 22:51 .nvm/versions/node/v12.22.1/bin/yarn -> ../lib/node_modules/yarn/bin/yarn.js
lrwxrwxrwx 1 william william       36 Jun 10 22:51 .nvm/versions/node/v12.22.1/bin/yarnpkg -> ../lib/node_modules/yarn/bin/yarn.js
lrwxrwxrwx 1 william william       33 May 27 20:20 .nvm/versions/node/v12.22.1/bin/yo -> ../lib/node_modules/yo/lib/cli.js
lrwxrwxrwx 1 william william       46 May 27 20:20 .nvm/versions/node/v12.22.1/bin/yo-complete -> ../lib/node_modules/yo/lib/completion/index.js
william@william-ThinkPad-T450s: ~$ type _nvm_load nvm node npm yarn
_nvm_load is a function
_nvm_load () 
{ 
    unset -f _nvm_load nvm node nodemon npm npx yarn yarnpkg yo yo-complete;
    export NVM_DIR="${HOME}/.nvm";
    [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh";
    [ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"
}
nvm is a function
nvm () 
{ 
    _nvm_load;
    nvm "$@"
}
node is a function
node () 
{ 
    _nvm_load;
    node "$@"
}
npm is a function
npm () 
{ 
    _nvm_load;
    npm "$@"
}
yarn is a function
yarn () 
{ 
    _nvm_load;
    yarn "$@"
}
```

The placeholder function for `yo` is there, I just didn't show it.

## Loading time

Loading time is still fast enough:

```console
$ time . .bashrc.d/50-nvm.bashrc 

real	0m0.002s
user	0m0.001s
sys	0m0.001s
```

## Testing

With this loading script, `nvm` still functions correctly:

```console
$ yarn --version
1.22.10
```

```console
$ node --version
v12.22.1
```

```console
$ nvm --version
0.38.0
```

```console
$ npm --version
7.18.1
```

Also, it still respects `.nvmrc` as described [here](https://github.com/nvm-sh/nvm#nvmrc):

```console
william@william-ThinkPad-T450s: ~$ mkdir test
william@william-ThinkPad-T450s: ~$ echo 14 >test/.nvmrc
william@william-ThinkPad-T450s: ~$ mkdir test/foo
william@william-ThinkPad-T450s: ~$ cd test/foo
william@william-ThinkPad-T450s: ~/test/foo$ nvm use
Found '/home/william/test/.nvmrc' with version <14>
Now using node v14.17.1 (npm v7.19.0)
william@william-ThinkPad-T450s: ~/test/foo$ cd ..
william@william-ThinkPad-T450s: ~/test$ nvm use
Found '/home/william/test/.nvmrc' with version <14>
Now using node v14.17.1 (npm v7.19.0)
william@william-ThinkPad-T450s: ~/test$ cd ..
william@william-ThinkPad-T450s: ~$ nvm use
No .nvmrc file found
Please see `nvm --help` or https://github.com/nvm-sh/nvm#nvmrc for more information.
```

## Shortcomings

Of course, no solution is perfect. Otherwise the `nvm` developers would have adopted it as their official solution/workaround to the slow loading times of `nvm`. However, there is currently one way that I can think of, to make this solution fail: install a new utility in another terminal session.

In this scenario, we first open a terminal window, but don't call any `nvm` or node.js-related command. Let's say we don't have `yarn` installed at this point. Then in another terminal window, we install `yarn`. Now, in the first terminal window, we cannot execute `yarn` without first calling `nvm` or any other existing commands.

The reverse is not a problem. Let's say we have `yo` installed. If we uninstall `yo` in the other terminal window, when we try to execute it in the first terminal window, it will just fail. This is the exact same behaviour as a vanilla `nvm` installation.

Please let me know if you have any other potential pitfalls and shortcomings

## What about SDKMAN! ?

Well, SDKMAN! is a bit simpler than `nvm`:

```sh title=".bashrc.d/50-sdkman.bashrc"
_SDK_BIN_LIST=
for _EXEC in "${HOME}/.sdkman/candidates"/*/current/bin/*; do
  if [ -x "${_EXEC}" ]; then
    _CMD="${_EXEC##*/}"
    eval "${_CMD}"'() { _sdk_load; '"${_CMD}"' "$@"; }'
    _SDK_BIN_LIST="${_SDK_BIN_LIST} ${_CMD}"
  fi
done

_CMD='sdk'
eval "${_CMD}"'() { _sdk_load; '"${_CMD}"' "$@"; }'

eval '_sdk_load() {
  unset -f _sdk_load sdk '"${_SDK_BIN_LIST}"'
  export SDKMAN_DIR="${HOME}/.sdkman"
  [ -s "${SDKMAN_DIR}/bin/sdkman-init.sh" ] && . "${SDKMAN_DIR}/bin/sdkman-init.sh"
}'

unset _CMD _SDK_BIN_LIST _EXEC
```

Since SDKMAN! uses a `current` symlink for each installed candidate, we can just use this. No need to manually figure out the currently-used version.

The solution for SDKMAN! suffers the same shortcoming as the one for `nvm`, so please also let me know if you find something wrong with it.
