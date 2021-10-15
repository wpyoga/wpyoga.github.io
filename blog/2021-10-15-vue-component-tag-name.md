---
title: Vue.js Component vs HTML Tag Names
tags: [vue, component, html, tag, pascalcase, kebabcase]
---

So, here's a snippet taken from a Vue.js project:

```js
export default {
	name: 'Room',
	components: {
		InfiniteLoading,
		Loader,
		SvgIcon,
        ...
```

But we don't see `SvgIcon` anywhere in the HTML template. We see this instead:

```html
    <svg-icon name="emoji" :param="emojiReaction ? 'reaction' : ''" />
```

How does `SvgIcon` become `svg-icon`? By magic, it [seems](https://vuejs.org/v2/guide/components-registration.html#Name-Casing).

Oh, how I love C and its (almost) no-surprises syntax!
