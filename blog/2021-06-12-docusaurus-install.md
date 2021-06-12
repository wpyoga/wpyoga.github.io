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










## Changing usernames or organization names

I used to have the username `wpyh`, but I changed it a few weeks ago.

When I had the username `wpyh`, if I had created a repository named `wpyh.github.io`, then GitHub would have made a subdomain for me: `wpyh.github.io`. This is a special repo, which serves as the source of the GitHub Pages site hosted at `wpyh.github.io` from its `main` branch by default.

When I changed my username from `wpyh` to `wpyoga`, I would have had to rename the aforementioned repository to `wpyoga.github.io`. GitHub would have changed the custom subdomain to `wpyoga.github.io`, and the old custom subdomain would have been deleted.







