---
title: Problem with inotifywait, VSCode, and Maven
tags: [inotifywait, vscode, maven]
---

When doing some Java development on VSCode, I wanted to use inotifywait to watch for source file changes and automatically build the project when a source file is changed.

It seemed like a neat and simple idea. However, as soon as I set up inotifywait to watch the source directory, I ran into problems and had to abandon the idea (for the time being).

<!--truncate-->

So the project is built using Maven. The problems are:

- VSCode cannot resolve source package files: the IDE shows errors on imports from source packages inside the source tree. Imports from the Java library work fine though.

- Maven doesn't build source package files: the produced jar file doesn't contain the class files anymore.

It's like the files just went missing -- what did inotifywait do to cause this problem? Reading the manpage, it seems that inotifywait does little more than put inotify(7) watches recursively on the `src` directory.
