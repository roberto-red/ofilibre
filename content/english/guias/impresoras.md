---
categories:
- Resources
- University
date: 2019-11-19
image: /images/guias/impresoras/impresora.png
tags:
title: Printing from Linux on URJC printers
type: guias
---

This guide refers to the printers accessible through the URJC printing portal. These are the printers installed in departmental buildings, management buildings, etc., available to university staff.

The instructions provided here have been tested on Ubuntu 19.04 and 18.04, and on Debian 10.

## What we're going to do

We're going to install the printing service as a virtual print queue via SMB. Jobs sent to this queue can be collected later at any printer managed by the URJC printing portal, by swiping your card at the printer's front panel, just below the screen.

The printing service is configured at the address `iveco.urjc.es`. Depending on how you have DNS configured on your Linux box, you may or may not have direct access to it. See the "[DNS Configuration](#dns-configuration)" section at the end.

## Installing necessary packages

To install the virtual print queue, we start by installing the necessary packages: `python3-smbc` and `smbclient`.

```
$ sudo apt install python3-smbc smbclient
```

On Debian, it's also convenient to install `system-config-printer` to configure CUPS printers (alternatively, you can configure them from the web interface):

```
$ sudo apt install system-config-printer
```

Depending on the exact operating system you have, you may be asked during the installation process whether to use information from WINS servers received via DHCP. In principle, in our case, it doesn't seem that the answer to this question has an effect on the rest of the process.

In some cases (e.g., on Ubuntu 16.04), you may also need to edit the `/etc/samba/smb.conf` file, adding the following lines to the `global` section, usually at the beginning of the file:

```
client min protocol = SMB2
client max protocol = SMB3
```

If you do this, you'll need to restart the service:

```
$ sudo service smbd restart
```

## Printer configuration

The printer is a Konica Minolta bizhub C458, which we'll configure as "C759SeriesPS(P) BEU". We start by downloading the necessary files from the [bizhub C458](https://kmbs.konicaminolta.us/kmbs/technology/multifunction/color-multi-function/bizhub-c458) page: "Drivers", "Linux", "Version 1.21" (the latest version at the time of writing this guide, 1.21; the file names will change if new versions appear), and download the three files offered:

* GenericBeuUXv1_21_multi_language.tar.gz
* BEU Linux CUPS Driver Guide.pdf
* KMbeuUXv1_21_multi_language.tar.gz

Save all three files in the same directory.

From here, we can use two alternative procedures.

### More automated procedure

We start by using the first of the downloaded files, uncompressing it:

```
$ tar xvzf GenericBeuUXv1_20_multi_language.tar.gz
```

Once unzipped, we'll see a `GenericBeuUXv1_20_multi_language` directory containing an installation file (requires Perl to be installed), which we'll execute. After finishing, we'll restart the CUPS service with the new configuration:

```
$ cd GenericBeuUXv1_20_multi_language
$ sudo ./install.pl
$ sudo /etc/init.d/cups restart
```

This process will install the PPD files (printer descriptors for CUPS) for the printer.

Next, we run the `system-config-printer` program (in Ubuntu, configuration panel, "Printers" option), or open the [CUPS configuration page](http://localhost:631/admin) in a browser. In the program, select "Add", "Network Printer", "Windows Printer via SAMBA". When asked for the printer address, enter `smb://<domain>/iveco.urjc.es/URJC_IMPRESORA_VIRTUAL`.

The `<domain>` is the WINS domain you're in, which may be `people`, `escet`, `cct`, or others (see below "[What domain am I in](#domain)").

Also, make sure to check "Notify user if authentication is required" (or, if you prefer, save your username and password) and then select the printer `KONICA MINOLTA C759SeriesPS(P) BEU v1.1 (color)` from the corresponding menu.

### More manual procedure

Alternatively, you can install these files manually, using the `KMbeuUXv1_20_multi_language.tar.gz` file:

```
$ tar xvzf KMbeuUXv1_20_multi_language.tar.gz
$ cd KMbeuUXv1_20_multi_language
$ sudo cp KMbeuEmpPS.pl /usr/lib/cups/filter/
$ sudo chown root:root /usr/lib/cups/filter/KMbeuEmpPS.pl
$ sudo chmod 755 /usr/lib/cups/filter/KMbeuEmpPS.pl
```

Next, add the printer using the `system-config-printer` program (in Ubuntu, configuration panel, "Printers" option), or the [CUPS configuration page](http://localhost:631/admin), with the same data and procedure as in the automated option (`smb://<domain>/iveco.urjc.es/URJC_IMPRESORA_VIRTUAL` as the printer address, and check "Notify user if authentication is required"). But now, instead of selecting the printer directly, choose "Configure from PPD file". When asked to select the file, choose the one in the directory for this configuration, named `KMbeuC759ux.ppd`.

## How to print

With either procedure, you should have finished installing the printer, and now you should be able to use it. To print, use the application of your choice and select the printer you just installed. This will put the job in the print queue, pending authentication.

In the print queue (accessible via the [CUPS page](http://localhost:631)), you can authenticate the job. You can also save your username and password if you prefer (and consider your machine secure enough for that).

The credentials you'll be asked for authentication are:

* Username: your URJC email address (unique domain name) without `@urjc.es`
* Password: your domain password

**Note**: Your username may not always be determined in this way. See below "[What domain am I in, what username do I have](#domain)" for more information on how to find out your username and what to do if it doesn't work as expected.

## <a name="dns-configuration"></a>DNS Configuration

Before starting, make sure you can reach `iveco.urjc.es`. The problem is that the name may not be in DNS.

In a terminal, run:

dig +noall +answer iveco.urjc.es

and it should give you the IP address. If it doesn't, you'll need to add it. To add it, edit the `/etc/hosts` file as root:

sudo vi /etc/hosts

and add the line:

192.168.46.181 iveco.urjc.es

## <a name="domain"></a>What domain am I in, what username do I have

Normally, your username will be your unique domain name without `@urjc.es`. For example, if your unique domain name is `firstName.lastName@urjc.es`, your username will usually be `firstName.lastName`. But if your username (unique domain name without `@urjc.es`) is more than 20 characters long, it's very likely that the username you'll need to use will be the first 20 characters. In some exceptional cases, your username may be different from your unique domain name. In general, we've seen that the username you can see on the printer screen when you've authenticated with your card is the one you'll need to use (you can see it on the printer screen right after authenticating).

You'll also need to know what domain (workgroup) you're in. There are several separate domains, including `people`, `cct`, and others. Apparently, each user is in one of these, so you'll need to find out which one you're in, or try them out.

One way to test is using the `smbclient` program. For example, if your unique domain name is `nombre.apellidos@urjc.es`, you can try to see if you're in the `people` domain like this:

```
$ smbclient -U nombre.apellidos -W people -L iveco.urjc.es
Enter PEOPLE\nombre.apellidos's password:

    Sharename       Type      Comment
    ---------       ----      -------
    ....
    URJC_IMPRESORA_VIRTUAL Printer   Virtual printing on all URJC campuses
```

This way, you're actually testing the combination of username and domain, so you can use it to validate both.

If you can't find a combination that works, you can open an incident at the [URJC CAU](https://cau.urjc.es) and ask for your username and Windows domain (workgroup).