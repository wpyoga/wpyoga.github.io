---
title: Deploying Docusaurus site to GitHub the easy way
tags: [docusaurus, blog]
---

Before, we need to run this command to deploy a Docusaurus site to GitHub Pages:

```shell-session
$ GIT_USER=wpyoga DEPLOYMENT_BRANCH=gh-pages USE_SSH=true yarn deploy
```

If we don't use SSH, we will be prompted for a password. Right now I don't even know my own password (it's stored in my password manager), so this is not a good idea. And I already use SSH to work on GitHub repositories anyway. So this is not a good way to do things.

<!-- truncate -->

But wait -- if we already use SSH, why do we need to specify GIT_USER again? That's exactly... what another user mentioned in [Docusaurus#3454](https://github.com/facebook/docusaurus/issues/3454).

Let's take this a few steps further:

- If we use SSH, our remote origin URL looks like this: `git@github.com:wpyoga/wpyoga.github.io.git`
    ```shell-session
    $ git config --get remote.origin.url
    git@github.com:wpyoga/wpyoga.github.io.git
    ```
    So why do we need to specify `USE_SSH=true`?

- And if we use SSH, when pushing to the upstream branch, we don't even need to specify the username -- git takes care of this for us. So why do we need to specify `GIT_USER`?

- As for the deployment branch: yes, the default is `master` for the special repository `_username_.github.io`, but I don't like this pattern, and I want to use `gh-pages` for my `wpyoga.github.io` repo. This configuration is usually static, so let's store it inside `docusaurus.config.js`:
    ```js
    module.exports = {
      // ...
      projectName: 'wpyoga.github.io',
      deploymentBranch: 'gh-pages',
      // ...
    ```

Now, `docusaurus deploy` doesn't understand these new mechanisms. And since I don't have a working TypeScript development environment (I'm not there yet...) I can only edit the generated JavaScript by hand. The functionality is in the file `node_modules/@docusaurus/core/lib/commands/deploy.js`.

So I made a backup at `node_modules/@docusaurus/core/lib/commands/deploy.js.orig` and made a few changes:

```diff
--- node_modules/@docusaurus/core/lib/commands/deploy.js.orig	2021-06-12 11:49:51.340710466 +0700
+++ node_modules/@docusaurus/core/lib/commands/deploy.js	2021-06-12 12:51:51.064280040 +0700
@@ -42,8 +42,16 @@
     if (!shelljs_1.default.which('git')) {
         throw new Error('Git not installed or on the PATH!');
     }
+    var _useSSH = process.env.USE_SSH || 'false'; // make sure useSSH is always defined
+    if (_useSSH !== 'true') {
+        const remoteOriginUrl = shelljs_1.default.exec('git config --get remote.origin.url').stdout.trim();
+        if (remoteOriginUrl.match(/^ssh:\/\//) !== null || remoteOriginUrl.match(/^([\w\-]+@)?[\w.\-]+:[\w.\-\/_]+\.git/) !== null) {
+            _useSSH = 'true';
+        }
+    }
+    const useSSH = _useSSH === 'true' ? 'true' : 'false';
     const gitUser = process.env.GIT_USER;
-    if (!gitUser) {
+    if (!gitUser && useSSH.toLocaleLowerCase() !== 'true') {
         throw new Error('Please set the GIT_USER environment variable!');
     }
     // The branch that contains the latest docs changes that will be deployed.
@@ -71,6 +79,7 @@
     }
     // github.io indicates organization repos that deploy via master. All others use gh-pages.
     const deploymentBranch = process.env.DEPLOYMENT_BRANCH ||
+        siteConfig.deploymentBranch ||
         (projectName.indexOf('.github.io') !== -1 ? 'master' : 'gh-pages');
     console.log(`${chalk_1.default.cyan('deploymentBranch:')} ${deploymentBranch}`);
     const githubHost = process.env.GITHUB_HOST || siteConfig.githubHost || 'github.com';
@@ -80,7 +89,6 @@
     if (gitPass) {
         gitCredentials = `${gitCredentials}:${gitPass}`;
     }
-    const useSSH = process.env.USE_SSH;
     const remoteBranch = buildRemoteBranchUrl_1.buildUrl(githubHost, githubPort, gitCredentials, organizationName, projectName, useSSH !== undefined && useSSH.toLowerCase() === 'true');
     console.log(`${chalk_1.default.cyan('Remote branch:')} ${obfuscateGitPass(remoteBranch)}`);
     // Check if this is a cross-repo publish.
```

But then `yarn build` complains:

```shell-session
$ yarn build
yarn run v1.22.10
$ docusaurus build

A validation error occured.
The validation system was added recently to Docusaurus as an attempt to avoid user configuration errors.
We may have made some mistakes.
If you think your configuration is valid and should keep working, please open a bug report.

Error: These field(s) ["deploymentBranch",] are not recognized in docusaurus.config.js.
If you still want these fields to be in your configuration, put them in the 'customFields' attribute.
See https://docusaurus.io/docs/docusaurus.config.js/#customfields
    at Object.validateConfig (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/lib/server/configValidation.js:118:15)
    at Object.loadConfig [as default] (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/lib/server/config.js:18:31)
    at Object.loadContext (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/lib/server/index.js:38:47)
    at build (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/lib/commands/build.js:45:36)
    at /home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/bin/docusaurus.js:94:5
    at Command.<anonymous> (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/bin/docusaurus.js:126:23)
    at Command.listener [as _actionHandler] (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/node_modules/commander/index.js:413:31)
    at Command._parseCommand (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/node_modules/commander/index.js:914:14)
    at Command._dispatchSubcommand (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/node_modules/commander/index.js:865:18)
    at Command._parseCommand (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/node_modules/commander/index.js:882:12)
    at Command.parse (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/node_modules/commander/index.js:717:10)
    at run (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/bin/docusaurus.js:319:7)
    at Object.<anonymous> (/home/william/Documents/wpyoga/wpyoga.github.io/node_modules/@docusaurus/core/bin/docusaurus.js:326:1)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

So we patch another file:

```diff
--- ./node_modules/@docusaurus/core/lib/server/configValidation.js.orig	2021-06-12 12:41:58.223529946 +0700
+++ ./node_modules/@docusaurus/core/lib/server/configValidation.js	2021-06-12 12:42:10.131464512 +0700
@@ -69,6 +69,7 @@
         .default(exports.DEFAULT_CONFIG.onDuplicateRoutes),
     organizationName: utils_validation_1.Joi.string().allow(''),
     projectName: utils_validation_1.Joi.string().allow(''),
+    deploymentBranch: utils_validation_1.Joi.string().allow(''),
     customFields: utils_validation_1.Joi.object().unknown().default(exports.DEFAULT_CONFIG.customFields),
     githubHost: utils_validation_1.Joi.string(),
     plugins: utils_validation_1.Joi.array().items(PluginSchema).default(exports.DEFAULT_CONFIG.plugins),
```

And now `yarn build` succeeds:

```shell-session
$ yarn build
yarn run v1.22.10
$ docusaurus build

[en] Creating an optimized production build...

✔ Client
  

✔ Server
  Compiled successfully in 9.46s


✔ Client
  

● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
 stored

Success! Generated static files in build.

Use `npm run serve` to test your build locally.

Done in 12.32s.
```

And `yarn deploy` also succeeds:

```shell-session
$ yarn deploy
yarn run v1.22.10
$ docusaurus deploy
Deploy command invoked ...
git@github.com:wpyoga/wpyoga.github.io.git
master
organizationName: wpyoga
projectName: wpyoga.github.io
deploymentBranch: gh-pages
Remote branch: git@github.com:wpyoga/wpyoga.github.io.git
git@github.com:wpyoga/wpyoga.github.io.git
77dc4151c656e3239bd9742f912a45db18bcb462
CMD: git rev-parse HEAD (code=0)

[en] Creating an optimized production build...

✔ Client
  

✔ Server
  Compiled successfully in 9.22s


✔ Client
  

● Server █████████████████████████ cache (99%) shutdown IdleFileCachePlugin
 stored

Success! Generated static files in build.

Use `npm run serve` to test your build locally.

Cloning into '/tmp/wpyoga.github.io-gh-pagesSj6zQx'...
CMD: git clone git@github.com:wpyoga/wpyoga.github.io.git /tmp/wpyoga.github.io-gh-pagesSj6zQx (code=0)
master
Note: switching to 'origin/gh-pages'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at ab5aa5e Deploy website - based on 77dc4151c656e3239bd9742f912a45db18bcb462
CMD: git checkout origin/gh-pages (code=0)
Switched to a new branch 'gh-pages'
CMD: git checkout -b gh-pages (code=0)
Branch 'gh-pages' set up to track remote branch 'gh-pages' from 'origin'.
CMD: git branch --set-upstream-to=origin/gh-pages (code=0)
rm '.nojekyll'
rm '404.html'
rm 'assets/css/styles.dc5e9681.css'
rm 'assets/images/docsVersionDropdown-dda80f009a926fb2dd92bab8faa6c4d8.png'
rm 'assets/images/localeDropdown-0052c3f08ccaf802ac733b23e655f498.png'
rm 'assets/js/01a85c17.b9dfffa7.js'
rm 'assets/js/0ae750d7.e3503f7e.js'
rm 'assets/js/0e384e19.ddf5b862.js'
rm 'assets/js/17896441.f57a37b4.js'
rm 'assets/js/18c41134.ec87b176.js'
rm 'assets/js/1be78505.2dfa4c90.js'
rm 'assets/js/1e4232ab.5b4de121.js'
rm 'assets/js/1f391b9e.2de59b39.js'
rm 'assets/js/393be207.8e037661.js'
rm 'assets/js/41215780.ae841bb1.js'
rm 'assets/js/486.57d4378a.js'
rm 'assets/js/486.57d4378a.js.LICENSE.txt'
rm 'assets/js/4bddfbdb.01575b48.js'
rm 'assets/js/50f28d20.45bef03f.js'
rm 'assets/js/533a09ca.48ff7b50.js'
rm 'assets/js/5c868d36.0d5626a9.js'
rm 'assets/js/608.4d5a0579.js'
rm 'assets/js/611.cf04f8c7.js'
rm 'assets/js/631037e5.846f9692.js'
rm 'assets/js/6422631d.05d2e755.js'
rm 'assets/js/6875c492.c165e8d1.js'
rm 'assets/js/796.2b4d523f.js'
rm 'assets/js/822bd8ab.16dcaaf8.js'
rm 'assets/js/935f2afb.721a68e8.js'
rm 'assets/js/9abc614d.1dedaf98.js'
rm 'assets/js/9dfd250b.026c9da7.js'
rm 'assets/js/a6aa9e1f.3d8aec90.js'
rm 'assets/js/a7023ddc.492f117e.js'
rm 'assets/js/a80da1cf.9fe763a5.js'
rm 'assets/js/b2b675dd.ebac9b0c.js'
rm 'assets/js/b85f0a39.51abaa96.js'
rm 'assets/js/bcafcfd6.24ddec43.js'
rm 'assets/js/c4f5d8e4.aa71182e.js'
rm 'assets/js/c623835b.36f855cd.js'
rm 'assets/js/ccc49370.08e8cf99.js'
rm 'assets/js/dff1c289.ae41d539.js'
rm 'assets/js/e44a2883.2df5a1b2.js'
rm 'assets/js/f55d3e7a.012746c9.js'
rm 'assets/js/fd7cafb0.62cfb1d0.js'
rm 'assets/js/main.2654cb24.js'
rm 'assets/js/main.2654cb24.js.LICENSE.txt'
rm 'assets/js/runtime~main.6059adcf.js'
rm 'blog/2021/05/08/inotifywait-problem/index.html'
rm 'blog/2021/06/12/docusaurus-install/index.html'
rm 'blog/atom.xml'
rm 'blog/index.html'
rm 'blog/rss.xml'
rm 'blog/tags/blog/index.html'
rm 'blog/tags/docusaurus/index.html'
rm 'blog/tags/index.html'
rm 'blog/tags/inotifywait/index.html'
rm 'blog/tags/maven/index.html'
rm 'blog/tags/vscode/index.html'
rm 'docs/hello/index.html'
rm 'docs/intro/index.html'
rm 'docs/tutorial-basics/congratulations/index.html'
rm 'docs/tutorial-basics/create-a-blog-post/index.html'
rm 'docs/tutorial-basics/create-a-document/index.html'
rm 'docs/tutorial-basics/create-a-page/index.html'
rm 'docs/tutorial-basics/deploy-your-site/index.html'
rm 'docs/tutorial-basics/markdown-features/index.html'
rm 'docs/tutorial-extras/manage-docs-versions/index.html'
rm 'docs/tutorial-extras/translate-your-site/index.html'
rm 'img/docusaurus.png'
rm 'img/favicon.ico'
rm 'img/logo.svg'
rm 'img/tutorial/docsVersionDropdown.png'
rm 'img/tutorial/localeDropdown.png'
rm 'img/undraw_docusaurus_mountain.svg'
rm 'img/undraw_docusaurus_react.svg'
rm 'img/undraw_docusaurus_tree.svg'
rm 'index.html'
rm 'markdown-page/index.html'
rm 'new-markdown-page/index.html'
rm 'new-react-page/index.html'
rm 'sitemap.xml'
CMD: git rm -rf . (code=0)
CMD: git add --all (code=0)
[gh-pages 1d4c705] Deploy website - based on 77dc4151c656e3239bd9742f912a45db18bcb462
 46 files changed, 209 insertions(+), 131 deletions(-)
 create mode 100644 assets/js/0ae750d7.36dc1408.js
 delete mode 100644 assets/js/0ae750d7.e3503f7e.js
 rename assets/js/{41215780.ae841bb1.js => 41215780.9cfec5e3.js} (82%)
 rename assets/js/{631037e5.846f9692.js => 631037e5.a502de85.js} (75%)
 rename assets/js/{a7023ddc.492f117e.js => a7023ddc.ca586d5f.js} (77%)
 rename assets/js/{a80da1cf.9fe763a5.js => a80da1cf.6a3d81ae.js} (70%)
 rename assets/js/{b2b675dd.ebac9b0c.js => b2b675dd.87aa17ab.js} (60%)
 rename assets/js/{b85f0a39.51abaa96.js => b85f0a39.40fba475.js} (50%)
 rename assets/js/{bcafcfd6.24ddec43.js => bcafcfd6.b73d2137.js} (63%)
 create mode 100644 assets/js/e620ed35.d4befd8b.js
 create mode 100644 assets/js/fba230db.cc24edfc.js
 delete mode 100644 assets/js/fd7cafb0.62cfb1d0.js
 create mode 100644 assets/js/fd7cafb0.6d8981c1.js
 delete mode 100644 assets/js/main.2654cb24.js
 create mode 100644 assets/js/main.72a8bb2f.js
 rename assets/js/{main.2654cb24.js.LICENSE.txt => main.72a8bb2f.js.LICENSE.txt} (100%)
 delete mode 100644 assets/js/runtime~main.6059adcf.js
 create mode 100644 assets/js/runtime~main.e809c4a5.js
 create mode 100644 blog/2021/06/12/docusaurus-deploy/index.html
 rewrite blog/2021/06/12/docusaurus-install/index.html (76%)
 rewrite sitemap.xml (74%)
CMD: git commit -m "Deploy website - based on 77dc4151c656e3239bd9742f912a45db18bcb462" (code=0)
To github.com:wpyoga/wpyoga.github.io.git
   ab5aa5e..1d4c705  gh-pages -> gh-pages
CMD: git push --force origin gh-pages (code=0)
Website is live at https://wpyoga.github.io/
Done in 22.54s.
```

Someday I will submit a proper patch to Docusaurus. Might also be a good way to start learning TypeScript (and JavaScript)!




