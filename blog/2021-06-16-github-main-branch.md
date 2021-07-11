---
title: GitHub `main` branch
tags: [github, politics, political-correctness]
---

I just found out today that GitHub has changed the default name of the `master` branch to "main". This is supposedly done to avoid any references to slavery (master, slave, get it?), but I think it's a load of bullshit.

<!-- truncate -->

## Disclaimer

Do I support slavery? Hell no!

Do I support [political correctness](https://en.wikipedia.org/wiki/Political_correctness)? Fuck no!

Does naming the default branch `master` instead of something else mean you support slavery? Of course not!

Anyway, I have always wondered why when I create a new repo in GitHub, it seems to want me to create a "main" branch instead of the more familiar `master` branch. Now I know why. And now I know how far behind I am on the current state of affairs.

Oh, and by the way, not mentioning `master` and `slave` in everyday life does not protect minorities and people born to slavery. It just makes us forget about humanity's ugly side, and may even lead some to re-enact slavery in the future. When you don't know the pain of being burned in a fire, you don't care when someone wants to start a fire. When you don't know the ugly truth behind slavery, you don't care when someone devises a "cool" way to re-establish slavery.

## Regaining some sanity

If you have accidentally created a "main" branch, you can safely rename it. First, rename the branch locally:

```console
$ git branch --move main master
```

Then, push the `master` branch to GitHub:

```console
$ git push --set-upstream origin master
$ git remote set-head origin master
```

Voilà! Now you have regained sanity, saved a few brain cells, and can work normally again.

## Avoiding hassle of renaming branches

GitHub now changes the default branch name to "main". To avoid the hassle of renaming the `master` branch of future repositories, open the [repository configuration page](https://github.com/settings/repositories) and change the `Repository default branch` setting to `master`, then click `Update`. New repositories will have a `master` branch by default.

## Closing rant

There is a nice comment on [this article](https://www.zdnet.com/article/github-to-replace-master-with-main-starting-next-month/):

> Now I'm gobsmacked (can I say "gobsmacked" or does that offend victims of physical violence?). This is ridiculous, where do you draw the line!?
> Has this terminology even been tested with the people who are expected to be offended by it!?
> i'm all for equality and fully support the BLM movement - ALL people should be treated with the same respect - but actions such as this do nothing to help the movement, they just serve to further divide.
> History is exactly that, it happened. Ceasing to use a word does not erase the action that it may once have been associated with. You can't scrub away all references to poor treatment, if you try, there will be no safe words left.

See also the replies in this [email thread](https://lore.kernel.org/git/CAOAHyQwyXC1Z3v7BZAC+Bq6JBaM7FvBenA-1fcqeDV==apdWDg@mail.gmail.com/t/).

I will not be bullied into changing my repository default branch names to "main". Neither will I deceive myself by thinking that using "main" instead of `master` is better. When `git` changes its default branch to "main", I will follow suit. I hope that day does not come too soon, but with [Linus apologizing for "being a jerk"](https://arstechnica.com/gadgets/2018/09/linus-torvalds-apologizes-for-years-of-being-a-jerk-takes-time-off-to-learn-empathy/), I wonder how soon that day will come.

May humankind survive the incoming onslaught of snowflakes.

