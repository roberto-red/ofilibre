---
categories:
- Resources
- Open Courses
- Calls
date: 2022-09-06
image: /images/guias/software-libre/logo.png
tags:
title: 'Call for Open Subjects: Software for Teaching'
type: guias
---

[Draft: non-definitive document, under review]

The call for [Recognition of Open Publication of Subjects](/en/guias/convocatoria-asignaturas-abierto) allows teachers to contribute software (computer programs) used in teaching, such as solved practices, example programs, and programs designed to facilitate understanding of aspects of the subject, etc. This guide provides some recommendations on how to present this type of software for consideration in the call.

## Characteristics

To be considered among the open access materials submitted for consideration of a subject (category "Other materials"), following the principles of the call, the following characteristics must be met:

* The software is available in a public repository, in one of the formats accepted by [Software Heritage](https://softwareheritage.org) (e.g., git, svn, or bzr).
* The software is used in the subject being presented to the call during the 2022-2023 academic year.
* At least one of the teachers teaching the subject is also the author of the software being presented.
* The software includes instructions on how to use it, or these instructions are in another open access material used in the subject.
* The source code of all software being presented is included in the deposit, and is correctly licensed with a license recognized by OSI.

## Deposit

Steps to deposit software, so it can be considered in the "Other materials" category of the Call for Recognition of Open Subjects:

* Prepare the repository, including a `README.md` file.
* Deposit in [Software Heritage](https://softwareheritage.org).
* Obtain the Software Heritage identifier for the version being presented, and a compressed file with the corresponding contents.
* Upload to [BURJC Digital](https://burjcdigital.urjc.es) (DSpace) the `README.md` file in PDF format, with the compressed file as an attachment, including the Software Heritage identifier and the URL of the public repository in the metadata.

Once this process is complete, you can include the software deposit data in the call application form (see the end of this guide).

NOTE: Both the deposit in Software Heritage and the obtaining of the identifier and compressed file can be done more comfortably with the [Software Heritage browser extension](https://www.softwareheritage.org/browser-extensions/).

The following details these steps.

## Preparing the Repository

Before depositing the software, you need to prepare a public repository that will be archived and deposited:

* If the software is already in a public repository on a software hosting service (such as [GitHub](https://github.com) or [GitLab](https://gitlab.com), for example), you can prepare that repository, following the instructions detailed below. If not, you will first need to upload the software to one of these services. If you don't know how to do it, you can follow the mini-course on GitHub ["Uploading your project to GitHub"](https://lab.github.com/githubtraining/uploading-your-project-to-github) or the [GitLab "Repository" documentation](https://docs.gitlab.com/ee/user/project/repository/).

* Prepare a `README.md` file in Markdown format (or simply in plain text format) describing the contents of the repository, so that its educational function can be understood, and it can be used by someone interested in using it to learn.

* Prepare a `LICENSE` or `COPYING` file, with the license used, which must be one of the licenses recognized by [OSI (Open Source Initiative)](https://opensource.org/) as an "open source" license (see [list of licenses recognized by OSI](https://opensource.org/licenses/category)). To the extent that it is appropriate for the specific case, it is recommended to use a license from the "popular and widely-used or with strong communities" category.

* Recommendation: Mark the header of all source files with a copyright notice indicating the date and authorship, and the [SPDX identifier](https://spdx.org/licenses/) of the license used. For example, for a Python file distributed under the GNU GPL 3.0 or later license:

```
__copyright__ = "Copyright (C) 2022 Name Surname"
__license__ = "GPL-3.0-or-later"
```

* Recommendation: Organize the contents of the repository in directories, in a way that is suitable for its use, and include documentation or references to the software documentation.

## Deposit in Software Heritage:

The deposit in Software Heritage will begin by checking if it is already deposited there (because it is very possible that it has already been done automatically), in the specific version being presented to the call. If not, you will force the deposit:

* If the software is already in a GitHub or GitLab repository, it is very likely that it is already archived in Software Heritage, with which you may not need to perform this step. In any case, to ensure that it is archived correctly, it is better to update the repository first and then perform the deposit in Software Heritage.

* Follow the instructions in ["Save code now"](https://archive.softwareheritage.org/save/) to deposit the software.

## Obtaining the Identifier and Compressed File

To obtain the SWHID of the version being presented to the call, and a compressed file with the deposited contents:

* Once deposited in Software Heritage, search for the repository in the [Software Heritage search form](https://archive.softwareheritage.org/browse/search). Locate the version you want to present to the call: Click on "History" to see all the archived versions (commits) in Software Heritage, and locate the one you want to present to the call.

* Once you have located the specific version, click "Download". In a moment, the download of a file with a `.tar.gz` extension will begin, which will contain all the files deposited in that version, compressed. This is the compressed file you will need to upload to BURJC Digital. The file name will give you the SWHID: it will be the name of the file generated by Software Heritage, removing `.tar.gz` and replacing "_" with ":". For example, this is a SWHID: `swh:1:dir:46dfa1d1d13ae5a725c4ff53f2714f1d237fff7d`.

## Upload to BURJC Digital

To complete the process, you will need to upload the compressed file to [BURJC Digital](https://burjcdigital.urjc.es), the Open Archive of the URJC:

* Create a PDF file that has the same contents as the `README.md` file (or README) of the version of the repository you are uploading. You can do it in many ways:

  * Using a conversion service, such as [MARKDOWNtoPDF](https://www.markdowntopdf.com/).

  * Copying the text into an editor and saving it as a PDF (in this case, it's better to copy the HTML version provided by GitLab or GitHub).

  * From the IDE, if you have the option to save as a PDF document (you may need to install an extension).

  * Using [pandoc](https://pandoc.org/). After installing it, execute:
```
pandoc README.md -s  -f gfm -V colorlinks=true -o README.pdf
```

* Follow the [BURJC Digital instructions](https://burjcdigital.urjc.es/page/howtopublish) to perform the deposit:

  * Choose the "Teaching materials" collection, and in the "Summary" field, write a summary about the software you are uploading, and end with these two lines (substituting, of course, with the Software Heritage identifier of your version, and the URL of your public repository):

```
> SWHID: {Software Heritage identifier}
> Repository: {URL of the public repository}
```

  * Upload the PDF file you generated earlier as the document to be deposited.

  * Include the compressed file downloaded from Software Heritage as an attachment.

## Reference in the Application Form:

In the application form of the Call for Recognition of Open Subjects, in the section corresponding to the "Other materials" category:

* Write the URL of BURJC Digital.

* Write a text explaining how you believe the software meets the evaluation criteria, as you would with, for example, the subject notes.

## Software Heritage Browser Extension

You can install the [Software Heritage browser extension](https://www.softwareheritage.org/browser-extensions/) in Firefox or Chrome, which allows you to comfortably check the archiving status of a repository hosted on GitHub or GitLab, request an update of the archive, obtain its SWHID, or even the compressed file with its contents.

## References

It may be useful, before composing the repository, to consult the guide [Publishing Free Software](/en/guias/publicar-software-libre).