---
categories:
- Resources
- Free Software
- Open Access Publication
date: 2022-04-19
image: /images/guias/software-libre/logo.png
tags:
title: Free software publication
type: guias
---

Any member of the university community can want to publish a program they have developed as free software. This guide explains how to do it.

[Clarification: In this guide, the word "program" refers to a computer program or part of it. It can therefore refer to a complete program, a library, or a module.]

## How to Publish Free Software

If you decide to publish a program as free software, the steps to follow are:

* Check that you have intellectual property rights over the program.
* Choose the software distribution license.
* Mark the software as free software.
* Publish the software

Let's take a closer look at these steps.

## Checking Intellectual Property

The first step is to ensure that you have intellectual property rights over the program. You can only publish the program and choose the license if you have intellectual property rights over it.

There are some cases where this is clear:

* If you are a student and have developed the program independently. In particular, if you have created programs for your thesis.

If you have doubts about intellectual property rights, consult with OfiLibre.

## Choosing a License

The next step to publish your program as free software is to choose a free software license.

The person who has intellectual property rights over a program has all rights over it. The person who receives the program can only exercise the rights that the owner has granted. The person who receives the program cannot reproduce, redistribute, or create a derivative work (such as correcting an error or adding functionality), for example, unless they obtain permission from the author.

In the case of publishing as free software, the license is the text that indicates what permissions you are granting to those who receive your program, automatically and without needing to ask for specific permission.
In general, these permissions will include those detailed in the most common definitions of free software: the [Free Software Definition](https://www.gnu.org/philosophy/free-sw.en.html#fs-definition) and the [Open Source Definition](https://opensource.org/osd).

For example, the Free Software Definition states that:

> "Free software" is software that respects the freedom of users and the community. Broadly speaking, it means that users have the freedom to run, copy, distribute, study, modify, and improve the software.

There are many licenses that comply with these definitions. Some of the most common ones are:

* [GNU General Public License (GPL)](https://opensource.org/licenses/GPL-3.0)
* [GNU Lesser General Public License (LGPL)](https://opensource.org/licenses/LGPL-3.0)
* [Apache License](https://opensource.org/licenses/Apache-2.0)
* [MIT License](https://opensource.org/licenses/MIT)
* [BSD License](https://opensource.org/licenses/BSD-3-Clause)

You can also consult the [list of all licenses recognized by OSI](https://opensource.org/licenses/category).

## Marking with the Chosen License

Once we know which license we will use, we need to mark the program with that license. To do this, we normally mark the source code in several ways:

* By putting a text in the headers of all source files that references the license. It is considered good practice to use the [SPDX identifier](https://spdx.dev/ids/) of the license, which can be obtained from the license description in the [OSI license list](https://opensource.org/licenses/category). For example, in the first lines of a Python file:

```
# Copyright 2022 Pepita Menganez
# SPDX-License-Identifier: GPL-3.0
```

* By including a `LICENSE` file in the main directory of the program's source code with the license text.

* If the program has a user interface, including a way to indicate the license in it. For example, if it has a graphical user interface based on menus, you can put an "About" option that shows, among other information, the distribution license.

And with this, we will be ready for the final step.

## Publication

The process ends with the publication of the program. Today, it is common to publish the project on [GitHub](https://github.com) or [GitLab](https://gitlab.com), but any site that has a vocation to remain over time and is archived by collectors like [Software Heritage](https://www.softwareheritage.org/) can serve.

In case the software accompanies an article, a thesis, or any other document, it will be convenient to include the link (URL) to the repository where you have deposited it in that document.

## More Information

This guide is just a very brief summary of some essential steps to publish free software. You can delve deeper into the topic of releasing programs as free software in the following documents:

* [Starting an open source project (Open Source Guide)](https://opensource.guide/starting-a-project/)
* [Starting an open source project (Linux Foundation)](https://www.linuxfoundation.org/tools/starting-an-open-source-project/#where)

There are also many examples of programs published as free software, where you can see how it was done. Just to mention one:

* [GrimoireLab Perceval](https://github.com/chaoss/grimoirelab-perceval)