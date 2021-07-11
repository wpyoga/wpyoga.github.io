---
title: Making a new blog with Docusaurus v2
tags: [docusaurus, blog]
---

To make a new blog with the upcoming Docusaurus 2, we need understand how GitHub Pages works, and also pay attention to several caveats.

<!-- truncate -->

## How GitHub Pages works and how to use it

GitHub Pages sites serve its root as static content from a directory on a selected branch of the special repository `_username_.github.io` or `_organization_.github.io`. If there is an `index.html` file, then it will be used. Otherwise, `README.md` will be served -- but see [this note](#how-github-pages-really-works).

For example, I have the username `wpyoga` on GitHub. My GitHub Pages site is `wpyoga.github.io`, and it serves its root `https://wpyoga.github.io/` as static content from the `master` branch of the repository `wpyoga.github.io` in my account.

As of 2021-06-12, the special repository `_username_.github.io` defaults to serving GitHub Pages from the `master` branch, and other repositories default to serving from the `gh-pages` branch. This means that:

- on repositories other than the special repository, if you push to the `gh-pages` branch, and no branch has been configured to serve the GitHub Pages site, then GitHub will automatically designate the `gh-pages` branch for GitHub Pages, and serve the site from the repository's root directory.

- on the special repository, pushing to the `master` branch will trigger the same mechanism. Pushing to the `gh-pages` branch will not trigger this mechanism.

Note that this designated branch contains the generated static content, not the raw Markdown and the sources. So if you use Docusaurus (or Jekyll) to generate the static site from Markdown documents, then the designated branch should not contain the sources, but only the generated (built) content. Docusaurus follows GitHub Pages' convention, so by default it will try to publish the generated content in the `build` directory of the source tree to the designated branch, according to the repository name.

However, my preferred method is to use the `master` branch for the source tree, and push my generated content to the `gh-pages` branch. Note that for the special repository, the `gh-pages` branch doesn't trigger the automatic mechanism above, so I had to [manually configure it](https://github.com/wpyoga/wpyoga.github.io/settings/branches). Alternatively, you can also [follow GitHub conventions](#following-github-conventions).

### Deploy

`yarn deploy` will build and deploy the site:

```console
$ GIT_USER=wpyoga DEPLOYMENT_BRANCH=gh-pages USE_SSH=true yarn deploy
```

It doesn't look pretty, and it's not easy to remember. Fortunately, I have [a better solution](/blog/2021/06/12/docusaurus-deploy).

## Further discussion

### Manually deploying to a branch

First, checkout the site serving branch (`gh-pages` in our example) to a temporary directory:

```console
$ git worktree add --no-checkout /tmp/build gh-pages
```

Generate the site and copy it into the temporary directory:

```console
$ yarn build
$ cp -rT build /tmp/build
```

Notes:
- we cannot use `yarn build --out-dir /tmp/build` because this will remove the `.git` file inside that directory
- with the `-T` option, `cp` copies the contents `build` directory into `/tmp/build`, as opposed to copying the `build` directory itself
- there is a better way if you want to use a script, see the end of this section

Push the files to GitHub:

```console
$ cd /tmp/build
$ git add .
$ git commit -m "new build at $(date)"
$ git push
$ cd -
```

Remove the temporary directory:

```console
$ git worktree remove /tmp/build
```

Here's a script to automate the whole process:

```shell
#!/bin/sh

TMPDIR="$(mktemp -d tmp-XXXXX)"
TMPDIR2="$(mktemp -d tmp-XXXXX)"

git worktree add --force --no-checkout "${TMPDIR}" gh-pages

mv "${TMPDIR}/.git" "${TMPDIR2}"
yarn build --out-dir "${TMPDIR}"
mv "${TMPDIR2}/.git" "${TMPDIR}"
rmdir "${TMPDIR2}"

(cd "${TMPDIR}"; git add .; git commit -m "new build at $(date)"; git push)

ls "${TMPDIR}"
git worktree remove "${TMPDIR}"
```

Note: we use a custom template because there [might be a bug](/blog/2021/06/13/possible-webpack-dirname-bug) that causes `yarn build` to fail.

### Another method of deploying manually doesn't work well

After building the site, push the `build` directory to a new `gh-pages` branch:

```console
$ git subtree split -P build -b gh-pages
Created branch 'gh-pages'
d7d2eaa20128724d8234c817151c16d0931dec98
$ git push origin gh-pages
Enumerating objects: 117, done.
Counting objects: 100% (117/117), done.
Delta compression using up to 4 threads
Compressing objects: 100% (83/83), done.
Writing objects: 100% (117/117), 322.93 KiB | 1.02 MiB/s, done.
Total 117 (delta 29), reused 54 (delta 8)
remote: Resolving deltas: 100% (29/29), done.
remote: 
remote: Create a pull request for 'gh-pages' on GitHub by visiting:
remote:      https://github.com/wpyoga/wpyoga.github.io/pull/new/gh-pages
remote: 
To github.com:wpyoga/wpyoga.github.io.git
 * [new branch]      gh-pages -> gh-pages
```

Because this repository is the special `_username_.github.io` repository, GitHub doesn't treat the `gh-pages` branch here as being special. So I need to [manually specify](https://github.com/wpyoga/wpyoga.github.io/settings/pages) the `gh-pages` branch to serve the site root.

The problem is, now I cannot update the `gh-pages` branch. I need to read Docusaurus' source code in `lib/deploy.ts` and see how they manage to make `yarn deploy` work. Looking at the log output, it seems that Docusaurus clones the `gh-pages` branch to a temporary location, deletes everything, overwrites the content with new files, and then pushes the changes back to the remote branch.

### How GitHub Pages really works

I'm not 100% sure how it works.

Docusaurus mentions that [GitHub will run the generated files through Jekyll](https://docusaurus.io/docs/deployment#deploying-to-github-pages), so a `.nojekyll` file is added to each directory, to prevent the removal of files whose names have a leading `_` (underscore).

I've also tried messing around with the designated repository, renaming index.html and adding README.md, but the Docusaurus site is still being served (a "page not found" message can be seen upon initial loading, but then disappears after a split second).

Since this is a static site, index.php is not served (at all).

### Serving GitHub Pages from a subdirectory

We can actually use a single branch for both the source code and generated content -- GitHub allows us to specify the `/docs` subdirectory as the content location. However, this is not easily adaptable to Docusaurus, where `docs` stores Markdown files, and the generated content is actually in `build`.

Unfortunately, as of 2021-06-12, GitHub doesn't allow the use of any other subdirectory for this purpose.

### Following GitHub conventions

For the special repository, following GitHub's conventions is somewhat counterintuitive. You would usually have the source code in the `master` branch, and in this case you cannot deploy to the `master` branch since it will overwrite all the source code. In this case, the solution is to move the source code to another branch, say `source`, work on that branch, and deploy to the `master` branch.

I pushed the source code from the `master` branch to the `source` branch.

```console
$ git branch source
$ git push --set-upstream origin source
```

Then I would need to delete the `master` branch. The problem is, GitHub didn't want to delete the `master` branch:

```console
$ git push --delete origin master
To github.com:wpyoga/wpyoga.github.io.git
 ! [remote rejected] master (refusing to delete the current branch: refs/heads/master)
error: failed to push some refs to 'git@github.com:wpyoga/wpyoga.github.io.git'
```

It turns out that GitHub just doesn't want to delete the default branch. Note that this concept of "default branch" is not from git, but rather from GitHub.

Anyway, I changed the [default branch](https://github.com/wpyoga/wpyoga.github.io/settings/branches) to `source` for now, and now I can delete the `master` branch:

```console
$ git push --delete origin master
To github.com:wpyoga/wpyoga.github.io.git
 - [deleted]         master
```

Now, `yarn deploy` will push the generated content to the `master` branch of the special repository.

### Moving source code back to the master branch

After I moved the source code from the `master` branch to the `source` branch, I found out that I can actually deploy to another branch instead.
So I wanted to move the source code back to the `master` branch.

I deleted the `master` branch, renamed the `source` branch to `master`, and then pushed the changes:

```console
$ git branch -D master
Deleted branch master (was 67c2b46).
$ git branch -m source master
$ git status
On branch master
Your branch is up to date with 'origin/source'.
$ git push origin HEAD
Total 0 (delta 0), reused 0 (delta 0)
remote: 
remote: Create a pull request for 'master' on GitHub by visiting:
remote:      https://github.com/wpyoga/wpyoga.github.io/pull/new/master
remote: 
To github.com:wpyoga/wpyoga.github.io.git
 * [new branch]      HEAD -> master
```

At this point the `source` branch was useless, so I changed the default branch to `master` again (on GitHub), then deleted the remote `source` branch:

```console
$ git push --delete origin source
To github.com:wpyoga/wpyoga.github.io.git
 - [deleted]         source
```

At this point the remote branch has been deleted, but the local repo still references the old one:

```console
$ git status
On branch master
Your branch is based on 'origin/source', but the upstream is gone.
  (use "git branch --unset-upstream" to fixup)
```

So I dutifully followed the recommendations:

```console
$ git branch --unset-upstream
$ git push --set-upstream origin master
Branch 'master' set up to track remote branch 'master' from 'origin'.
Everything up-to-date
$ git status
On branch master
Your branch is up to date with 'origin/master'.
```

### Changing usernames or organization names

I used to have the username `wpyh`, but I changed it a few weeks ago.

When I had the username `wpyh`, if I had created a repository named `wpyh.github.io`, then GitHub would have made a subdomain for me: `wpyh.github.io`. This is a special repo, which serves as the source of the GitHub Pages site hosted at `wpyh.github.io` from its `main` branch by default.

When I changed my username from `wpyh` to `wpyoga`, I would have had to rename the aforementioned repository to `wpyoga.github.io`. GitHub would have changed the custom subdomain to `wpyoga.github.io`, and the old custom subdomain would have been deleted.
