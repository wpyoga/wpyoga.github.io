---
title: Making a new blog with Docusaurus v2
tags: [docusaurus, blog]
---

To make a new blog with the upcoming Docusaurus 2, we need understand how GitHub Pages works, and also pay attention to several caveats.

<!--truncate-->

# How GitHub Pages works

GitHub Pages sites serve its root as static content from a subdirectory on a selected branch of the special repository `_username_.github.io` or `_organization_.github.io`.

For example, I have the username `wpyoga` on GitHub. My GitHub Pages site is `wpyoga.github.io`, and it serves its root `https://wpyoga.github.io/` as static content from the `master` branch of the repository `wpyoga.github.io` in my account.

Note that this main branch contains the static content only. So if you're like me, and you use Docusaurus (or Jekyll) to generate the static site from Markdown documents, then the main branch should not contain the sources, only the generated (built) content. For Docusaurus, the generated content is located in the `build` directory of the source tree. So, one of the recommended ways to organize things, is to have separate branches:

- `master` for generated static content

- `source` for the source tree

In this case, Docusaurus can actually deploy the site with a command, as described [here](https://docusaurus.io/docs/deployment#deploying-to-github-pages)

I find this a bit clunky, and there is actually another option: use the same branch for both source and generated content, and use the `docs` subdirectory to serve the root of the GitHub Pages site. However, `docs` is not an intuitive for a website root, so... no, I won't use this option.

Another possibility offered by GitHub is to use the `master` branch for the source tree, and push my generated content to a special `gh-pages` branch. I've heard that this special branch, when created, also triggers the publishing of a GitHub Pages site.

Since I already have the `master` and `source` branches above, I would need to delete the `master` branch. The problem is, GitHub didn't want to delete the `master` branch:

```console
$ git push origin --delete master
To github.com:wpyoga/wpyoga.github.io.git
 ! [remote rejected] master (refusing to delete the current branch: refs/heads/master)
error: failed to push some refs to 'git@github.com:wpyoga/wpyoga.github.io.git'
```

It turns out that GitHub just doesn't want to delete the default branch. Note that this concept of "default branch" is not from git, but rather from GitHub.

Anyway, I changed the [default branch](https://github.com/wpyoga/wpyoga.github.io/settings/branches) to `source` for now, and now I can delete the `master` branch:

```console
$ git push origin --delete master
To github.com:wpyoga/wpyoga.github.io.git
 - [deleted]         master
```

Then I want to rename the `source` branch to `master`:

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

At this point the `source` branch is useless, so I changed the default branch to `master` again, then deleted the remote `source` branch:

```console
$ git push origin --delete source
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

Now we're set!

Build the site:

```console
$ yarn build
```

Then push the `build` directory to a new `gh-pages` branch:

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






## Changing usernames or organization names

I used to have the username `wpyh`, but I changed it a few weeks ago.

When I had the username `wpyh`, if I had created a repository named `wpyh.github.io`, then GitHub would have made a subdomain for me: `wpyh.github.io`. This is a special repo, which serves as the source of the GitHub Pages site hosted at `wpyh.github.io` from its `main` branch by default.

When I changed my username from `wpyh` to `wpyoga`, I would have had to rename the aforementioned repository to `wpyoga.github.io`. GitHub would have changed the custom subdomain to `wpyoga.github.io`, and the old custom subdomain would have been deleted.







