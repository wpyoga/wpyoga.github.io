---
title: Manual Profiling of Bash Script Execution
tags: [bash, profiling]
---

Sometimes, we would like to know how long a command takes, and which part of the script takes the longest time to run.

<!-- truncate -->

## The method

We can use `time`, which is a special bash keyword. Instead of using a separate `/usr/bin/time` command, it can be less overhead to use the keyword.

Following the implementation [here](/blog/2021/07/10/bashrc-directory#self-cleaning-implementation), we add some profiling info to `~/.bashrc`:

```sh
for i in "${HOME}/.bashrc.d"/[0-9][0-9]-*.bashrc; do
  if [ -r "$i" ]; then
    export TIMEFORMAT="%R $i"
    time . "$i"
  fi
done
unset i
```

This showed that `nvm` makes bash load slowly:

```
0.034 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.002 /home/william/.bashrc.d/50-asdf.bashrc
0.261 /home/william/.bashrc.d/50-nvm.bashrc
0.036 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
```

## An unforeseen problem

So, I began timing its execution:

```sh
nvm_process_parameters() {
  local NVM_AUTO_MODE
  NVM_AUTO_MODE='use'
  while [ $# -ne 0 ]; do
    case "$1" in
      --install) NVM_AUTO_MODE='install' ;;
      --no-use) NVM_AUTO_MODE='none' ;;
    esac
    shift
  done
  export TIMEFORMAT='%R nvm_auto'
  time nvm_auto "${NVM_AUTO_MODE}"
}

nvm_process_parameters "$@"
```

also:

```sh
nvm_auto() {
  echo nvm_auto "$@"
  local NVM_MODE
  NVM_MODE="${1-}"
  local VERSION
  local NVM_CURRENT
  if [ "_${NVM_MODE}" = '_install' ]; then
    VERSION="$(nvm_alias default 2>/dev/null || nvm_echo)"
    if [ -n "${VERSION}" ]; then
      nvm install "${VERSION}" >/dev/null
    elif nvm_rc_version >/dev/null 2>&1; then
      nvm install >/dev/null
    fi
  elif [ "_$NVM_MODE" = '_use' ]; then
    NVM_CURRENT="$(nvm_ls_current)"
    echo NVM_CURRENT="${NVM_CURRENT}"
    if [ "_${NVM_CURRENT}" = '_none' ] || [ "_${NVM_CURRENT}" = '_system' ]; then
      export TIMEFORMAT='%R nvm_resolve_local_alias'
      time VERSION="$(nvm_resolve_local_alias default 2>/dev/null || nvm_echo)"
      if [ -n "${VERSION}" ]; then
        export TIMEFORMAT='%R nvm use'
        time nvm use --silent "${VERSION}" >/dev/null
      elif nvm_rc_version >/dev/null 2>&1; then
        nvm use --silent >/dev/null
      fi
    else
      nvm use --silent "${NVM_CURRENT}" >/dev/null
    fi
  elif [ "_${NVM_MODE}" != '_none' ]; then
    nvm_err 'Invalid auto mode supplied.'
    return 1
  fi
}
```

In some places, I printed out the current time instead of timing the execution:

```sh
    "use")
      local PROVIDED_VERSION
      local NVM_SILENT
      local NVM_SILENT_ARG
      local NVM_DELETE_PREFIX
      NVM_DELETE_PREFIX=0
      local NVM_LTS

      date +'1 %s.%N'
      while [ $# -ne 0 ]; do
        case "$1" in
          --silent)
            NVM_SILENT=1
            NVM_SILENT_ARG='--silent'
          ;;
          --delete-prefix) NVM_DELETE_PREFIX=1 ;;
          --) ;;
          --lts) NVM_LTS='*' ;;
          --lts=*) NVM_LTS="${1##--lts=}" ;;
          --*) ;;
          *)
            if [ -n "${1-}" ]; then
              PROVIDED_VERSION="$1"
            fi
          ;;
        esac
        shift
      done

      date +'2 %s.%N'
      if [ -n "${NVM_LTS-}" ]; then
        VERSION="$(nvm_match_version "lts/${NVM_LTS:-*}")"
      elif [ -z "${PROVIDED_VERSION-}" ]; then
        NVM_SILENT="${NVM_SILENT:-0}" nvm_rc_version
        if [ -n "${NVM_RC_VERSION-}" ]; then
          PROVIDED_VERSION="${NVM_RC_VERSION}"
          VERSION="$(nvm_version "${PROVIDED_VERSION}")"
        fi
        unset NVM_RC_VERSION
        if [ -z "${VERSION}" ]; then
          nvm_err 'Please see `nvm --help` or https://github.com/nvm-sh/nvm#nvmrc for more information.'
          return 127
        fi
      else
        VERSION="$(nvm_match_version "${PROVIDED_VERSION}")"
      fi

      if [ -z "${VERSION}" ]; then
        >&2 nvm --help
        return 127
      fi
```

However, now the output seems a bit strange:

```txt
0.053 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.003 /home/william/.bashrc.d/50-asdf.bashrc
nvm_auto use
NVM_CURRENT=none
0.126 nvm_resolve_local_alias
0.013 nvm_resolve_alias
0.009 nvm_resolve_alias
0.158 nvm use
0.287 nvm use
0.324 nvm use
0.041 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
0.028 bashrc check
```

- it seemed like `50-nvm.bashrc` was never executed at all -- but this is obviously false, because it was executed
- it seemed like there were multiple invocations of `nvm use`
- the `date` command didn't seem to be executed -- or is it?

For the missing `date` command output, it's just a matter of shell redirection. Removing the stdout redirection to `/dev/null` shows the output:

```sh
nvm_auto() {
  echo nvm_auto "$@"
  local NVM_MODE
  NVM_MODE="${1-}"
  local VERSION
  local NVM_CURRENT
  if [ "_${NVM_MODE}" = '_install' ]; then
    VERSION="$(nvm_alias default 2>/dev/null || nvm_echo)"
    if [ -n "${VERSION}" ]; then
      nvm install "${VERSION}" >/dev/null
    elif nvm_rc_version >/dev/null 2>&1; then
      nvm install >/dev/null
    fi
  elif [ "_$NVM_MODE" = '_use' ]; then
    NVM_CURRENT="$(nvm_ls_current)"
    echo NVM_CURRENT="${NVM_CURRENT}"
    if [ "_${NVM_CURRENT}" = '_none' ] || [ "_${NVM_CURRENT}" = '_system' ]; then
      export TIMEFORMAT='%R nvm_resolve_local_alias'
      time VERSION="$(nvm_resolve_local_alias default 2>/dev/null || nvm_echo)"
      if [ -n "${VERSION}" ]; then
        export TIMEFORMAT='%R nvm use'
        time nvm use --silent "${VERSION}"
      elif nvm_rc_version >/dev/null 2>&1; then
        nvm use --silent >/dev/null
      fi
    else
      nvm use --silent "${NVM_CURRENT}" >/dev/null
    fi
  elif [ "_${NVM_MODE}" != '_none' ]; then
    nvm_err 'Invalid auto mode supplied.'
    return 1
  fi
}
```

The stderr redirection is not a problem, it can stay there. The `time` command output is a bit more involved, though.

After reading through the source code, I realized that it was because the environment variable `TIMEFORMAT` kept getting overwritten by our `export` calls. This means that all of these actions are executed inside the current shell context, so every time we do an `export TIMEFORMAT=...`, we are actually overwriting that environment variable. Actually, if we see that all the functions are defined as `function_name() { ... }`, we know that the commands inside the function is executed in the same shell context as the caller.

Meanwhile, the variable `TIMEFORMAT` is evaluated when the command executed by `time` returns or exits, so if it was modified during the execution of the command, then the time printed will follow whatever `TIMEFORMAT` contains at that time.

On the other hand, we actually need all of this to be executed in the same shell context, so that the functions can define environment variables that we can use later. Sidenote: this is the only valid function definition in POSIX shell.

So basically what we need to do is, save the environment variable `TIMEFORMAT` before timing the command execution.

## A naive "fix"

So I attempted a naive fix:

```sh
nvm_process_parameters() {
  local NVM_AUTO_MODE
  NVM_AUTO_MODE='use'
  while [ $# -ne 0 ]; do
    case "$1" in
      --install) NVM_AUTO_MODE='install' ;;
      --no-use) NVM_AUTO_MODE='none' ;;
    esac
    shift
  done
  _TIMEFORMAT="${TIMEFORMAT}"
  export TIMEFORMAT='%R nvm_auto'
  time nvm_auto "${NVM_AUTO_MODE}"
  export TIMEFORMAT="${_TIMEFORMAT}"
}

nvm_process_parameters "$@"
```

```sh
nvm_auto() {
  echo nvm_auto "$@"
  local NVM_MODE
  NVM_MODE="${1-}"
  local VERSION
  local NVM_CURRENT
  if [ "_${NVM_MODE}" = '_install' ]; then
    VERSION="$(nvm_alias default 2>/dev/null || nvm_echo)"
    if [ -n "${VERSION}" ]; then
      nvm install "${VERSION}" >/dev/null
    elif nvm_rc_version >/dev/null 2>&1; then
      nvm install >/dev/null
    fi
  elif [ "_$NVM_MODE" = '_use' ]; then
    NVM_CURRENT="$(nvm_ls_current)"
    echo NVM_CURRENT="${NVM_CURRENT}"
    if [ "_${NVM_CURRENT}" = '_none' ] || [ "_${NVM_CURRENT}" = '_system' ]; then
      _TIMEFORMAT="${TIMEFORMAT}"
      export TIMEFORMAT='%R nvm_resolve_local_alias'
      time VERSION="$(nvm_resolve_local_alias default 2>/dev/null || nvm_echo)"
      export TIMEFORMAT="${_TIMEFORMAT}"
      if [ -n "${VERSION}" ]; then
        _TIMEFORMAT="${TIMEFORMAT}"
        export TIMEFORMAT='%R nvm use'
        time nvm use --silent "${VERSION}"
        export TIMEFORMAT="${_TIMEFORMAT}"
      elif nvm_rc_version >/dev/null 2>&1; then
        nvm use --silent >/dev/null
      fi
    else
      nvm use --silent "${NVM_CURRENT}" >/dev/null
    fi
  elif [ "_${NVM_MODE}" != '_none' ]; then
    nvm_err 'Invalid auto mode supplied.'
    return 1
  fi
}
```

Now we see that `date` is doing its job, but the output from the `time` statements still seem wrong:

```txt
0.057 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.003 /home/william/.bashrc.d/50-asdf.bashrc
nvm_auto use
NVM_CURRENT=none
0.131 nvm_resolve_local_alias
0 1625994490.165539976
1 1625994490.172686988
2 1625994490.174463233
0.012 nvm_resolve_alias
3 1625994490.213854097
0.010 nvm_resolve_alias
4 1625994490.268562513
5 1625994490.301861349
6 1625994490.304278525
7 1625994490.314978462
0.152 nvm use
0.286 nvm_auto
0.313 nvm_auto
0.040 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
0.020 bashrc check
```

## The proper fix

Eventually I realized that we need to do a little bit more. When we save the contents of `TIMEFORMAT` in `_TIMEFORMAT`, we are actually overwriting whatever is in `_TIMEFORMAT` previously. What we actually need to do is, we need to use a different environment variable for each level of function invocation.

So this is the first level, which is OK:

```sh
nvm_process_parameters() {
  local NVM_AUTO_MODE
  NVM_AUTO_MODE='use'
  while [ $# -ne 0 ]; do
    case "$1" in
      --install) NVM_AUTO_MODE='install' ;;
      --no-use) NVM_AUTO_MODE='none' ;;
    esac
    shift
  done
  _TIMEFORMAT="${TIMEFORMAT}"
  export TIMEFORMAT='%R nvm_auto'
  time nvm_auto "${NVM_AUTO_MODE}"
  export TIMEFORMAT="${_TIMEFORMAT}"
}

nvm_process_parameters "$@"
```

It calls `nvm_auto`, which is the second level:

```sh
nvm_auto() {
  echo nvm_auto "$@"
  local NVM_MODE
  NVM_MODE="${1-}"
  local VERSION
  local NVM_CURRENT
  if [ "_${NVM_MODE}" = '_install' ]; then
    VERSION="$(nvm_alias default 2>/dev/null || nvm_echo)"
    if [ -n "${VERSION}" ]; then
      nvm install "${VERSION}" >/dev/null
    elif nvm_rc_version >/dev/null 2>&1; then
      nvm install >/dev/null
    fi
  elif [ "_$NVM_MODE" = '_use' ]; then
    NVM_CURRENT="$(nvm_ls_current)"
    echo NVM_CURRENT="${NVM_CURRENT}"
    if [ "_${NVM_CURRENT}" = '_none' ] || [ "_${NVM_CURRENT}" = '_system' ]; then
      __TIMEFORMAT="${TIMEFORMAT}"
      export TIMEFORMAT='%R nvm_resolve_local_alias'
      time VERSION="$(nvm_resolve_local_alias default 2>/dev/null || nvm_echo)"
      export TIMEFORMAT="${__TIMEFORMAT}"
      if [ -n "${VERSION}" ]; then
        __TIMEFORMAT="${TIMEFORMAT}"
        export TIMEFORMAT='%R nvm use'
        time nvm use --silent "${VERSION}"
        export TIMEFORMAT="${__TIMEFORMAT}"
      elif nvm_rc_version >/dev/null 2>&1; then
        nvm use --silent >/dev/null
      fi
    else
      nvm use --silent "${NVM_CURRENT}" >/dev/null
    fi
  elif [ "_${NVM_MODE}" != '_none' ]; then
    nvm_err 'Invalid auto mode supplied.'
    return 1
  fi
}
```

Note that within the same function, we don't need to use different variables to save `TIMEFORMAT`. This is because the `time` invocations are not nested. However, in the above example, we need to use yet another variable in `nvm_resolve_local_alias`:

```sh
nvm_resolve_local_alias() {
  if [ -z "${1-}" ]; then
    return 1
  fi

  local VERSION
  local EXIT_CODE
  ___TIMEFORMAT="${TIMEFORMAT}"
  export TIMEFORMAT='%R nvm_resolve_alias'
  time VERSION="$(nvm_resolve_alias "${1-}")"
  EXIT_CODE=$?
  export TIMEFORMAT="${___TIMEFORMAT}"
  if [ -z "${VERSION}" ]; then
    return $EXIT_CODE
  fi
  if [ "_${VERSION}" != '_∞' ]; then
    nvm_version "${VERSION}"
  else
    nvm_echo "${VERSION}"
  fi
}
```

(note that we need to save the return value before restoring the `TIMEFORMAT` variable -- otherwise it will also be overwritten)

Now, the output looks correct, and we know the execution time of the separate function calls:

```txt
0.053 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.002 /home/william/.bashrc.d/50-asdf.bashrc
nvm_auto use
NVM_CURRENT=none
0.108 nvm_resolve_local_alias
0 1625995040.289644320
1 1625995040.293696818
2 1625995040.294921503
0.007 nvm_resolve_alias
3 1625995040.336312682
0.011 nvm_resolve_alias
4 1625995040.385616982
5 1625995040.417216708
6 1625995040.418956680
7 1625995040.429000260
0.142 nvm use
0.253 nvm_auto
0.278 /home/william/.bashrc.d/50-nvm.bashrc
0.039 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
0.018 bashrc check
```

Note that we could not use arrays, because POSIX shell does not have an array type.

## An alternative method

There is an alternative method, which is simpler and shows the execution depth, but it is slower:

```sh
nvm_process_parameters() {
  local NVM_AUTO_MODE
  NVM_AUTO_MODE='use'
  while [ $# -ne 0 ]; do
    case "$1" in
      --install) NVM_AUTO_MODE='install' ;;
      --no-use) NVM_AUTO_MODE='none' ;;
    esac
    shift
  done
  export TIMEFORMAT="${TIMEFORMAT} / nvm_auto"
  time nvm_auto "${NVM_AUTO_MODE}"
  export TIMEFORMAT="${TIMEFORMAT% / nvm_auto}"
}

nvm_process_parameters "$@"
```

```sh
nvm_auto() {
  echo nvm_auto "$@"
  local NVM_MODE
  NVM_MODE="${1-}"
  local VERSION
  local NVM_CURRENT
  if [ "_${NVM_MODE}" = '_install' ]; then
    VERSION="$(nvm_alias default 2>/dev/null || nvm_echo)"
    if [ -n "${VERSION}" ]; then
      nvm install "${VERSION}" >/dev/null
    elif nvm_rc_version >/dev/null 2>&1; then
      nvm install >/dev/null
    fi
  elif [ "_$NVM_MODE" = '_use' ]; then
    NVM_CURRENT="$(nvm_ls_current)"
    echo NVM_CURRENT="${NVM_CURRENT}"
    if [ "_${NVM_CURRENT}" = '_none' ] || [ "_${NVM_CURRENT}" = '_system' ]; then
      export TIMEFORMAT="${TIMEFORMAT} / nvm_resolve_local_alias"
      time VERSION="$(nvm_resolve_local_alias default 2>/dev/null || nvm_echo)"
      export TIMEFORMAT="${TIMEFORMAT% / nvm_resolve_local_alias}"
      if [ -n "${VERSION}" ]; then
        export TIMEFORMAT="${TIMEFORMAT} / nvm use"
        time nvm use --silent "${VERSION}"
        export TIMEFORMAT="${TIMEFORMAT% / nvm use}"
      elif nvm_rc_version >/dev/null 2>&1; then
        nvm use --silent >/dev/null
      fi
    else
      nvm use --silent "${NVM_CURRENT}" >/dev/null
    fi
  elif [ "_${NVM_MODE}" != '_none' ]; then
    nvm_err 'Invalid auto mode supplied.'
    return 1
  fi
}
```

```sh
nvm_resolve_local_alias() {
  if [ -z "${1-}" ]; then
    return 1
  fi

  local VERSION
  local EXIT_CODE
  export TIMEFORMAT="${TIMEFORMAT} / nvm_resolve_alias"
  time VERSION="$(nvm_resolve_alias "${1-}")"
  EXIT_CODE=$?
  export TIMEFORMAT="${TIMEFORMAT% / nvm_resolve_alias}"
  if [ -z "${VERSION}" ]; then
    return $EXIT_CODE
  fi
  if [ "_${VERSION}" != '_∞' ]; then
    nvm_version "${VERSION}"
  else
    nvm_echo "${VERSION}"
  fi
}
```

With this method, we get:

```
0.058 /home/william/.bashrc.d/00-default.bashrc
0.000 /home/william/.bashrc.d/50-android-sdk.bashrc
0.000 /home/william/.bashrc.d/50-android-studio.bashrc
0.005 /home/william/.bashrc.d/50-asdf.bashrc
nvm_auto use
NVM_CURRENT=none
0.109 /home/william/.bashrc.d/50-nvm.bashrc / nvm_auto / nvm_resolve_local_alias
0 1625995835.146498759
1 1625995835.151210563
2 1625995835.152251905
0.009 /home/william/.bashrc.d/50-nvm.bashrc / nvm_auto / nvm use / nvm_resolve_alias
3 1625995835.195350192
0.011 /home/william/.bashrc.d/50-nvm.bashrc / nvm_auto / nvm use / nvm_resolve_alias
4 1625995835.248658001
5 1625995835.280006594
6 1625995835.282036172
7 1625995835.291081025
0.148 /home/william/.bashrc.d/50-nvm.bashrc / nvm_auto / nvm use
0.262 /home/william/.bashrc.d/50-nvm.bashrc / nvm_auto
0.289 /home/william/.bashrc.d/50-nvm.bashrc
0.040 /home/william/.bashrc.d/50-sdkman.bashrc
0.000 /home/william/.bashrc.d/90-gradle-opts.bashrc
0.025 bashrc check
```

These two methods should be enough for now. I do wonder if we can use `local` variables for this, and if we can actually avoid the `export`s -- well, that's another blog post for another day, and maybe I'll make a custom shell script to demonstrate that.

## Conclusion

All in all, today we have learned:

1. there is almost always more than one way to do it
1. shell is not that simple, we need to think of execution context before overwriting variables
1. check to see if stdout is redirected, otherwise some output may be missing
1. be careful when adding profiling into code, make sure that return values are saved
