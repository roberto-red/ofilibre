---
categories:
- Resources
- Free Software
date: 2021-03-15
description: Tutorial to create a generic document, such as a letter, email or certificate,
  where personal data changes. We explain how to automate this process using the Mail
  Merge tool in LibreOffice Writer.
draft: false
image: /images/guias/generar-documentos-libreoffice/libreoffice-square.jpg
tags:
title: How to generate documents using a template with LibreOffice
type: guias
---

Sometimes, we may need to write a generic document to send to different people, such as a letter, email, or certificate. Perhaps we want the document to only change in certain points with personal data, such as the name or address of each person. To simplify, we often opt to do this manually, filling them out one by one; but this involves investing a lot of time if the list of recipients is very large. From OfiLibre, we want to show you how to automate this process using the [Mail Merge](https://documentation.libreoffice.org/assets/Uploads/Documentation/en/WG4.2/PDF/WG4211-UsingMailMerge.pdf) tool in LibreOffice Writer.

[LibreOffice](https://es.libreoffice.org) is a complete office suite that is distributed as free software. It has the usual tools found in other office suites, such as a word processor (Writer), spreadsheet (Calc), presentation editor (Impress), a drawing and flowchart application (Draw), a database interface (Base), and a mathematical formula editor (Math). It is compatible with multiple document formats, including those of Microsoft Word and Excel, and with the main operating systems: Windows, Linux, and macOS.

[You can download LibreOffice completely free of charge here.](https://es.libreoffice.org/descarga/libreoffice/)


## The Process

To explain how to automate document creation, we will provide a step-by-step example.
Next, we will show you how to generate a series of certificates in OfiLibre, using two programs: [LibreOffice Calc](https://es.libreoffice.org/descubre/calc/), and [LibreOffice Writer](https://es.libreoffice.org/descubre/writer). We will also need to have [LibreOffice Base](https://es.libreoffice.org/descubre/base/) installed, the database interface, to manage the interconnection between both.

- **The first step is to save all personal data in a CSV document**. This can be done manually, writing a spreadsheet with the Calc application. It can also be used with an existing database or other ways to automate data collection. In OfiLibre, we use [a Python script](https://gitlab.etsit.urjc.es/ofilibre/code/-/blob/master/parse_catalog/parse_catalog.py) that extracts this information from a series of YAML files contained within Markdown documents.

- In this tutorial, we will **create the spreadsheet manually**. The first line should contain the generic names of the attributes, and each subsequent line the values for each individual. In this capture, you can see how we did it:

![captura01](/images/guias/generar-documentos-libreoffice/captura01.png)

- Next, **we save this information with a .csv format** (values separated by commas). To do this, we select the *File > Save as* menu and in the dropdown, we choose the *Text CSV* format. The first time we save as CSV, we may get the following warning message:

![captura02](/images/guias/generar-documentos-libreoffice/captura02.png)

- We choose to continue saving in CSV and can select not to be asked again. Then, we will be asked to choose the document encoding. To preserve the Spanish letters such as Ñ or vowels with tilde, we choose "Western Europe (ISO-8859-1)" and click 'Accept'.

![captura03](/images/guias/generar-documentos-libreoffice/captura03.png)

- Next, we will **write the document template in Writer**. We write the generic text of the letter or certificate, leaving a couple of spaces where we will insert the personal names and other attributes. We can insert images and format, as usual in any document.

- To **import the CSV file**, we select in Writer the *File > Assistants > Data Source* menu and follow the assistant's steps. If this option does not appear in Writer, it is possible that you do not have Base installed. It is necessary for Writer to import databases. As we will see, we can use this assistant to import data from a multitude of different sources. We select *Other external data source*, advance, and open *Configuration*. We select that the source is a *Spreadsheet*, search for the route of our .csv file already created, and test the connection. Since it is a spreadsheet, it will not be necessary to assign fields.

- To **view the data sources** already in Writer, we go to **View > Data Sources**. A box will appear below the toolbar, which allows us to search for our table.

![captura04](/images/guias/generar-documentos-libreoffice/captura04.png)

- To **insert automatic fields into the text**, we select the first cell of each column (which corresponds to the attribute name) and drag it to the desired position in the text. It is possible to modify the text format of the attributes. For example, we have put the data in bold and with a larger size, and the text would look like this:

![captura05](/images/guias/generar-documentos-libreoffice/captura05.png)

- If we also want to **insert a date field that updates with the current date**, *Insert > Field > More fields* and select *Date* and the desired format for the date. (We can also select *Fixed Date* if we do not want it to update).

- We can **preview the autogenerated documents** using: *Tools > Mail Merge Assistant* and selecting *Next > Next > Next > Finish*, without changing anything else. This tool also has many other options and would allow us to import data, but in this case, we will only use it to preview the documents. Above, another toolbar will appear, which allows us to navigate between the generated documents for each person and save the certificates as a single document or individual documents. We can choose to save in the format we want, for example as .pdf, or as .odf (the editable format equivalent to .docx of Word).

![captura06](/images/guias/generar-documentos-libreoffice/captura06.png)

- We can also **export the final documents** by directly going to *File > Print* and clicking '*Yes*' to open the *Mail Merge* box. There, we can choose which rows are exported, and the name, route, and format of the exported documents.

![captura07](/images/guias/generar-documentos-libreoffice/captura07.png)

- And with this, **we would already have our personalized letters or certificates, generated automatically** from a data table.


## Files and Links of Interest

- [Official documentation on the Writer Mail Merge tool.](https://documentation.libreoffice.org/assets/Uploads/Documentation/en/WG4.2/PDF/WG4211-UsingMailMerge.pdf)

- [Free download of LibreOffice.](https://es.libreoffice.org/descarga/libreoffice/)

Next, we provide you with the test files we used to perform this tutorial:

- [CSV file with test data.](/documentos/generar-documentos-libreoffice/Materiales_ejemplo.csv) 
- [ODT document with the certificate template.](/documentos/generar-documentos-libreoffice/Modelo_certificado.odt)
- [Examples of generated certificates in PDF.](/documentos/generar-documentos-libreoffice/Certificados_ejemplo.pdf)
- [The Python script to automatically generate the CSV from Markdown files.](https://gitlab.etsit.urjc.es/ofilibre/code/-/blob/master/parse_catalog/parse_catalog.py)