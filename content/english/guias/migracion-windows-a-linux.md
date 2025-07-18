---
categories:
- Resources
- Free Software
date: 2025-03-11
image: /images/guias/logo-ubuntu.png
tags:
title: Migration from Windows to Linux
type: guias
---

In this guide, we will describe the process we followed to install Linux (as the only operating system) on the office computer.

1. We selected the **GNU/Linux distribution to use**. In our case, we chose **Ubuntu** due to its simplicity and versatility, making it a suitable distribution for taking your first steps with Linux.

2. We **downloaded the ISO file** of the chosen distribution. In our case, we did it from the [Ubuntu download page](https://ubuntu.com/download/desktop), selecting version 24.04.1 LTS.

3. We **downloaded the application to create the bootable USB**. In our case, it was balenaEtcher, which we obtained from its [official page](https://etcher.balena.io/).

4. We **prepared the bootable USB**. To do this, we connected the USB, opened balenaEtcher, selected the ISO file in the _Flash from file_ option and the corresponding USB in the _Select target_ option (remember that this procedure will erase the USB's content) and selected _Flash!_ This procedure may take a few minutes.

5. We **accessed the BIOS to modify the boot options**. To do this, we disconnected the USB, reconnected it, and restarted the computer. On the boot screen, we were indicated which button (which may vary depending on the computer, in our case it was F11) to press to enter the _Boot Menu_. This boot menu allows you to start the computer directly from the hard drive, where you have your conventional operating system, or from any other external unit. We modified the boot options so that the USB is the first, i.e., the priority, and exited the BIOS.

6. In the menu that appears, we **selected _Try or Install Ubuntu_**. In the following menu, we configured the language and **chose the _Install Ubuntu_ option**. Subsequently, we were asked to configure the keyboard layout and wireless network (WiFi) connection. In the following step, we selected the most suitable options for our context, although it is recommended to mark the options:

*   _Normal installation_
*   _Download updates while installing Ubuntu_
*   _Install third-party software for graphics and WiFi hardware and additional multimedia formats_

In the following menu, which is the most important for the type of installation we are doing, we **selected _Erase disk and install Ubuntu_**. In the subsequent steps, we were asked to configure the disk partitions and system users, thus completing the installation process.