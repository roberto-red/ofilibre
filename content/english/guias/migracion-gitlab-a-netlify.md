---
categories:
- Resources
- Free Software
date: 2025-02-27
image: /images/guias/netlify-logo.png
tags:
title: Migration of a Hugo project from GitLab Pages to Netlify
type: guias
---

Guide: Deploying a Static Site Built with Hugo on Netlify

In this guide, we will explain how to deploy a static site developed with Hugo, whose code is hosted in a GitLab repository and is currently deployed on GitLab Pages.

0. We install the **preliminary material**. In our case, we need the Visual Studio Code (VS Code) code editor, the Git version control software, and Hugo.

1. We make a **copy** (fork) of the current repository and clone it to our **local machine**. Then, we open the root directory in VS Code to make all the changes described in the following steps.

2. We **create the netlify.toml file** in the project root, taking into account our Hugo version, the name of the folder where Hugo will save the generated files (_publish_), and the command that Netlify will use to deploy the site (_command_). Our file would be:

```
[build.environment]
HUGO_VERSION = "0.123.7"
[build]
publish = "public"
command = "hugo"
```

3. We **modify the static/admin/index.html file**, deleting its content and copying the following:

```

<!DOCTYPE html>

<html lang="en">  

  <head>

    <meta charset="UTF-8" />

    <title>Content Manager</title>

    <!-- the script for authentication using Netlify Identity -->

    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

  </head>

  <body>

    <!-- the script that builds the page and powers Netlify CMS -->

    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>

  </body>

</html>

```

This code is the entry point for Netlify CMS (an open-source content management system for editing static sites, offering a user-friendly interface and Git workflows) on our site. Specifically, this file enables Netlify Identity, the authentication system that will be used to access Netlify CMS, and then loads Netlify CMS from the unpkg CDN.

4. We **modify the backend section of the static/admin/config.yml file**, changing

```
backend:  
  name: gitlab  
  repo: ofilibre/ofilibre.gitlab.io  
  branch: master # Branch to update (optional; defaults to master)  
  api\_root: https://gitlab.com/api/v4   
  base\_url: https://gitlab.com  
  auth\_type: pkce  
  app\_id: ba44978a94e18763a29c4f3f365d09e9d6e5b4fdbbb02c271ba13d0cbf0694d5  
  auth\_endpoint: oauth/authorize    
```

to

```
backend:  
  name: git-gateway  
  branch: master
```

This section defines the backend configuration, i.e., how and where changes are stored when users edit content in Netlify CMS. The roles of the _name_ and _branch_ fields will be explained in step 8.

5. **Deploy the Project to Netlify**. Once logged into Netlify, follow these steps:

* Select "Add New Site" then "Import an existing project"
* In the Git provider selector, choose GitLab
* Select the appropriate repository and Team
* Configure the sitename as `OfiLibre`
* Select the correct branch (in our case, master)

6. **Modify the config.toml file**. Back in the project, access the config.toml file (located in the root) and change the baseURL value to the URL provided by Netlify (based on the _sitename_). In our case:

baseURL = "https://ofilibre.netlify.app"

Save changes and update the repository (push). Once changes are reflected (approximately two minutes), you should be able to access your website using the URL https://ofilibre.netlify.app.

7. **Configure Netlify Identity**. Once you've accessed the site admin panel in Netlify, go to the Identity section and select "Enable Identity" to activate Netlify Identity. Once enabled, configure these options as needed:

* Invite Users: If you need to invite users to the site
* External Providers: If you want to authenticate through an external provider (like Google or GitLab). In our case, we needed to use an external provider because we encountered errors creating the Netlify Identity account (the default authentication method)
* Enable Git Gateway: Enable this option to allow integration with GitLab

8. **Configure an Access Token**. GitLab Personal Access Tokens are authentication keys used to interact with the GitLab API or perform Git operations without using your username and password.

Git-Gateway tokens in Netlify are generated keys that allow a user (typically through an interface like Netlify CMS) to interact with a Git repository without directly accessing the Git provider's API - Git-Gateway acts as an intermediary between Netlify CMS and the Git provider. When you log in to Netlify CMS, Git-Gateway authenticates the user and manages repository requests on your behalf in the specified branch (see _backend_ section in step 4).

GitLab version 15.0 removed support for OAuth tokens without expiration dates, meaning any previous tokens (without expiration) became invalid, and OAuth tokens now have a two-hour expiration period.

When enabling Netlify Identity, you're provided with an OAuth token, so after two hours you won't be able to access Netlify CMS. The solution is to create a GitLab personal access token:

* Access your GitLab profile, specifically the Edit profile section
* Select Access tokens then Add new token
* Configure the token name, description and expiration date
* Configure token permissions, ensuring the api, read_api, read_repository and write_repository options are enabled
* Copy the token and go to Netlify settings
* Paste the GitLab Personal Access Token in the Netlify Identity settings to allow authentication between Netlify and GitLab

9. **Test Netlify CMS**. The current configuration allows publishing and editing blogs and guides.

10. **Modify the static/admin/config.yml file** to allow editing and publishing of records and presentations, adding the corresponding fields to each collection. Also modify attachment management through the media_folder and public_folder attributes. The resulting _collections_ section would be:

```
collections:
  - name: 'blog'
    label: 'Blog'
    folder: 'content/espanol/blog'
    create: true
    slug: '{{year}}-{{month}}-{{day}}-{{slug}}'
    media_folder: '/../../../static/blog/{{slug}}'
    public_folder: '/blog/{{slug}}'
    editor:
      preview: true
    fields:
      - { label: 'Título', name: 'title', widget: 'string' }
      - { label: 'Fecha de publicación', name: 'date', widget: 'date' }
      - { label: 'Descripción', name: 'description', widget: 'string' }
      - { label: 'Tipo', name: 'type', widget: 'hidden', default: 'post'}
      - { label: 'Categorías', name: 'categories', widget: 'hidden', default: ["OfiLibre"]}
      - { label: 'Etiquetas', name: 'tags', widget: 'list'}
      - { label: 'Fondo (alargado)', name: 'bg_image', widget: 'image', default: '/images/backgrounds/page-title.jpg'}
      - { label: 'Logo (cuadrado)', name: 'thumb', widget: 'image', default: '/images/logo-ofilibre-2025.jpg'}
      - { label: 'Cuerpo', name: 'body', widget: 'markdown' }
      - label: 'Archivos adjuntos'
        name: 'files'
        widget: 'list'
        media_folder: '/../../../static/documentos/{{slug}}'
        public_folder: '/documentos/{{slug}}'
        fields:
          - { label: 'Archivo', name: 'file', widget: 'file' }

  - name: 'guias'
    label: 'Guías'
    folder: 'content/espanol/guias'
    create: true
    slug: '{{slug}}'
    media_folder: '/../../../static/images/guias/{{slug}}'
    public_folder: '../../images/guias/{{slug}}'
    editor:
      preview: true
    fields:
      - { label: 'Título', name: 'title', widget: 'string' }
      - { label: 'Fecha de publicación', name: 'date', widget: 'date' }
      - { label: 'Descripción', name: 'description', widget: 'string' }
      - { label: 'Logo', name: 'logo', widget: 'image' }
      - { label: 'Fondo', name: 'feature', widget: 'image', required: false }
      - { label: 'Categorías', name: 'categories', widget: 'hidden', default: ["OfiLibre"]}
      - { label: 'Etiquetas', name: 'tags', widget: 'list'}
      - { label: 'Tipo', name: 'type', widget: 'hidden', default: 'guias'}
      - { label: 'Cuerpo', name: 'body', widget: 'markdown' }
      - label: 'Archivos adjuntos'
        name: 'files'
        widget: 'list'
        media_folder: '/../../../static/documentos/{{slug}}'
        public_folder: '/documentos/{{slug}}'
        fields:
          - { label: 'Archivo', name: 'file', widget: 'file' }

  - name: 'fichas'
    label: 'Fichas'
    folder: 'content/espanol/fichas'
    create: true
    slug: '{{slug}}'
    media_folder: '/../../../static/images/fichas/{{slug}}'
    public_folder: ''
    editor:
      preview: true
    fields:
      - { label: 'Título', name: 'title', widget: 'string' }
      - { label: 'Fecha de publicación', name: 'date', widget: 'date' }
      - { label: 'Logo', name: 'logo', widget: 'image' }
      - { label: 'Fondo', name: 'feature', widget: 'image', required: false }
      - { label: 'Página web', name: 'website', widget: 'string' }
      - { label: 'Página web (español)', name: 'website_es', widget: 'string', required: false }
      - label: 'Licencias'
        name: 'licenses'
        widget: 'list'
        fields:
          - { label: 'Nombre', name: 'name', widget: 'string' }
          - { label: 'URL', name: 'url', widget: 'string' }
      - { label: 'MyApps', name: 'myapps', widget: 'boolean', default: false }
      - { label: 'Código fuente (URL)', name: 'source', widget: 'string' }
      - label: 'Guías de instalación'
        name: 'installs'
        widget: 'list'
        fields:
          - { label: 'Nombre', name: 'name', widget: 'string' }
          - { label: 'URL', name: 'url', widget: 'string' }
          - { label: 'Formato', name: 'kind', widget: 'string', required: false }
      - label: 'Tutoriales'
        name: 'tutorials'
        widget: 'list'
        fields:
          - { label: 'Nombre', name: 'name', widget: 'string' }
          - { label: 'URL', name: 'url', widget: 'string' }
          - { label: 'Formato', name: 'kind', widget: 'string', required: false }
      - label: 'Extras'
        name: 'others'
        widget: 'list'
        required: false
        fields:
          - { label: 'Nombre', name: 'name', widget: 'string' }
          - { label: 'URL', name: 'url', widget: 'string' }
      - label: 'Capturas de pantalla'
        name: 'screenshots'
        widget: 'list'
        fields:
          - { label: 'Nombre', name: 'name', widget: 'string' }
          - { label: 'Archivo', name: 'file', widget: 'image' }
          - { label: 'Atribución', name: 'attribution', widget: 'string', required: false }
      - { label: 'Tipo', name: 'type', widget: 'hidden', default: 'fichas' }
      - { label: 'Cuerpo', name: 'body', widget: 'markdown' }
      - label: 'Archivos adjuntos'
        name: 'files'
        widget: 'list'
        media_folder: '/../../../static/documentos/{{slug}}'
        public_folder: '/documentos/{{slug}}'
        fields:
          - { label: 'Archivo', name: 'file', widget: 'file' }

  - name: 'pres'
    label: 'Presentaciones'
    folder: 'content/espanol/pres'
    create: true
    slug: '{{slug}}'
    media_folder: '/../../../static/pres/{{slug}}'
    public_folder: ''
    editor:
      preview: true
    fields:
      - { label: 'Título', name: 'title', widget: 'string' }
      - { label: 'Fecha de publicación', name: 'date', widget: 'date' }
      - { label: 'Descripción', name: 'description', widget: 'string' }
      - { label: 'Imagen destacada', name: 'feature', widget: 'image' }
      - { label: 'Imagen teaser', name: 'teaser', widget: 'image' }
      - label: 'Transparencias'
        name: 'transpas'
        widget: 'object'
        fields:
          - { label: 'Archivo PDF', name: 'pdf', widget: 'file' }
          - { label: 'Archivo ODP', name: 'odp', widget: 'file' }
      - label: 'Extras'
        name: 'extras'
        required: false
        widget: 'list'
        fields:
          - { label: 'Nombre', name: 'name', widget: 'string' }
          - { label: 'URL', name: 'url', widget: 'string' }
      - { label: 'Tipo', name: 'type', widget: 'hidden', default: 'pres' }
      - { label: 'Cuerpo', name: 'body', widget: 'markdown' }
```

11. **DNS and Domain Configuration**

* Add the custom domain in Netlify (Domain management -> Add a domain -> ofilibre.urjc.es), which is owned by the university
* At this step choose whether to use Netlify DNS as DNS provider or continue with your current provider. We chose the second option, so we'll need to inform the provider about the DNS record changes needed to point our domain to the site deployed on Netlify
* Following Netlify documentation, since we want to register an apex domain, we ask our DNS provider to look up the DNS records for ofilibre.urjc.es and add an ALIAS record with the host field equal to '@' pointing to `apex-loadbalancer.netlify.com`. Changes may take up to 48 hours to propagate
* Request an SSL certificate through the Harica certificate management interface by going to the 'Server' section and filling in fields like FQDN (ofilibre.urjc.es in our case), certificate type (SSL DV) and algorithm (RSA 2048). Also select the option to generate a private key
* When the certificate is approved, you'll receive several files including the certificate itself and intermediate certificate chain. Using these two files plus the private key from the previous step, add the certificate to Netlify (Domain management -> HTTPS -> Set custom certificate) to enable https

12. **Modify the config.toml file and verify DNS changes**. Back in the project, access the config.toml file and change the baseURL value to the final URL:

baseURL = "https://ofilibre.urjc.es"

Finally, verify the DNS change has registered correctly by clearing the cache (`sudo resolvectl flush-caches` on Linux) and using the dig command (`dig ofilibre.urjc.es`) to confirm the domain points to `apex-loadbalancer.netlify.com`.