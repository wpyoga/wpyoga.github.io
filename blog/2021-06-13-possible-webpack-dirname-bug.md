---
title: Possible dirname bug in Webpack
tags: [docusaurus, blog]
---

I got an error while trying to build this blog in a temporary directory. This might be a webpack bug -- or not.

<!-- truncate -->

```console
$ yarn build --out-dir "${TMPDIR}"
yarn run v1.22.10
$ docusaurus build --out-dir /tmp/tmp.pEBNPFYg2h

[en] Creating an optimized production build...

✔ Client
  

● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
 stored

Error: EISDIR: illegal operation on a directory, open '/tmp/tmp.pEBNPFYg2h'
error building locale=en
Error: EISDIR: illegal operation on a directory, open '/tmp/tmp.pEBNPFYg2h'
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

So I started investigating -- first figuring out where the problem is.
I thought it was due to permissions, but I changed the directory permissions to `0775` and it still didn't work.
I thought it was due to the temporary directory being outside of the source directory, so I tried using `mktemp -d -p .` to make the temporary in the current directory instead -- but it still failed. This is when I realized that the trigger is the dot character in the directory name.

I found the script executing the `build` command at `node_modules/@docusaurus/core/lib/commands/build.js`. I added a few checkpoints, and re-ran the script:

```console
$ yarn build --out-dir test.dir
yarn run v1.22.10
$ docusaurus build --out-dir test.dir

[en] Creating an optimized production build...
check 100
check 200
check 300

✔ Client

● Client █████████████████████████ cache (99%)  

✔ Client
  

● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
 stored

Error: EISDIR: illegal operation on a directory, open '/home/william/Documents/wpyoga/wpyoga.github.io/test.dir'
error building locale=en
Error: EISDIR: illegal operation on a directory, open '/home/william/Documents/wpyoga/wpyoga.github.io/test.dir'
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

This is where it failed:

```js
console.log("check 300");
    // Run webpack to build JS bundle (client) and static html files (server).
    await utils_1.compile([clientConfig, serverConfig]);
console.log("check 350");
```

It turned out, `utils_1` is a webpack wrapper (??? maybe, not sure, I don't know the pattern):

```js
const utils_1 = require("../webpack/utils");
```

In the file `node_modules/@docusaurus/core/lib/webpack/utils.js`, there is a function `compile()`:

```js
function compile(config) {
    return new Promise((resolve, reject) => {
        const compiler = webpack_1.default(config);
        compiler.run((err, stats) => {
```

And `webpack_1` is:

```js
const webpack_1 = tslib_1.__importDefault(require("webpack"));
```

It looks like a bug (or feature, keep reading) in webpack. I haven't tried to debug this yet.

## Possibly a feature

Some googling led me to this page: https://stackoverflow.com/questions/37070141/webpack-dev-server-allow-paths-with-dot-in-them

It seems that webpack, or one of its plugins, try to differentiate files from directories by checking whether it has a dot in its name. So when it sees a dot, it assumes that the entity is a file instead of a directory.

These commands work though, because the file name does not contain a dot. Only the pathname does, and the preceding path components cannot be files.

```console
$ yarn build --out-dir tmp.123/aaa
$ yarn build --out-dir /tmp/tpm.123456/bbb
```










