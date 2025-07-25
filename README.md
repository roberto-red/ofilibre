# Guía de mantenimiento y estructura del sitio Ofilibre

Este documento está pensado para que cualquier persona pueda mantener y actualizar la web, aunque no la haya montado originalmente.

---

## Requisitos previos y herramientas necesarias

- El sitio está hecho con **Hugo**. Se recomienda usar la versión v0.147.2 o superior. Puedes descargarla desde [https://gohugo.io/getting-started/installing/](https://gohugo.io/getting-started/installing/).
- Es necesario tener **Git** instalado para clonar el repositorio y subir cambios.
- Se recomienda usar un editor de texto como **Visual Studio Code**.
- El despliegue y el CMS están gestionados a través de **Netlify**. La cuenta utilizada es la de **Ofilibre**. Si necesitas acceso, contacta con el responsable de Ofilibre para que te añada como usuario.

---

## Cómo instalar y probar en local

1. Clona el repositorio:
   ```bash
   git clone https://gitlab.com/ofilibre/ofilibre.gitlab.io.git
   cd ofilibre.gitlab.io
   ```
2. Instala Hugo si no lo tienes:
   - Descárgalo desde [https://gohugo.io/getting-started/installing/](https://gohugo.io/getting-started/installing/)
   - Comprueba la instalación con:
     ```bash
     hugo version
     ```
3. Lanza el servidor local:
   ```bash
   hugo serve
   ```
4. Abre tu navegador y accede a [http://localhost:1313](http://localhost:1313) para ver la web en local.

---

## Enlace al estilo original

El sitio utiliza el tema **Navigator Hugo**.
- Demo y documentación original: [https://demo.gethugothemes.com/navigator/](https://demo.gethugothemes.com/navigator/)
- Repositorio del tema: [https://github.com/gethugothemes/navigator-hugo](https://github.com/gethugothemes/navigator-hugo)

---

## Cambios y personalizaciones realizadas

- **Estructura de carpetas adaptada** para separar contenido por idioma y sección.
- **Plantillas personalizadas** en `layouts/` para ajustarse a las necesidades de Ofilibre.
- **Integración con Netlify CMS** para edición sencilla de contenido.
- **Archivos estáticos** organizados en `static/` (imágenes, PDFs, documentos, etc.).
- **Configuración multilingüe** y menús adaptados.
- **Ajustes en `config.toml`** para personalización de la web, idiomas, menús, etc.

---

## Estructura del proyecto

- `content/english/` y `content/spanish/`:  
  Contenido de la web, organizado por idioma y sección (`blog/`, `guias/`, `pres/`, etc.).
- `static/`:  
  Archivos estáticos accesibles desde la web (imágenes, PDFs, etc.).
- `layouts/`:  
  Plantillas HTML personalizadas.
- `data/`:  
  Archivos de datos estructurados (equipo, actividades, etc.).
- `config.toml`:  
  Configuración principal del sitio.
- `static/admin/`:  
  Configuración y acceso al CMS de Netlify.

---

## ¿Cómo añadir o modificar contenido?

  - A la hora de localizar o añadir contenido se debe recordar que el link para el sitio en español (por defecto) tiene esta estructura `ofilibre.urjc.es/blog` por ejemplo.
  - En cambio, el sitio en inglés contiene las siglas "en" de esta forma `ofilibre.urjc.es/en/blog`.

### A. Manualmente (Markdown)

1. Elige la carpeta adecuada en `content/idioma/sección/` (por ejemplo, `content/spanish/blog/`).
2. Crea un archivo `.md` siguiendo la estructura:
   ```markdown
   ---
   title: "Título"
   date: YYYY-MM-DD
   description: "Breve descrpción"
   image: /images/"ejemplo"
   categories:
      - "Categoría 1"
      - "Categoría 2"
   tags:
      - "Tag 1"
      - "Tag 2"
   ---
   Contenido en Markdown.
   ```
3. Sube imágenes o archivos a `static/images/` o `static/documentos/` y enlázalos desde el Markdown.
4. Haz commit y push a la rama principal.

### B. Usando el CMS de Netlify

1. Accede a [https://ofilibre.urjc.es/admin](https://ofilibre.urjc.es/admin) e inicia sesión.
2. Elige la colección (blog, guías, presentaciones, etc.).
3. Crea o edita la entrada rellenando los campos del formulario.
4. Guarda y publica. El CMS generará el archivo Markdown y lo subirá al repositorio.

---

## ¿Cómo añadir archivos estáticos?

- Sube imágenes a `static/images/`.
- Sube documentos a `static/documentos/` o la carpeta correspondiente.
- Enlaza estos archivos desde los archivos Markdown usando rutas relativas, por ejemplo:  
  `/images/mi-imagen.jpg` o `/documentos/mi-archivo.pdf`

---

## Enlazar y configurar el CMS de Netlify

- El CMS está configurado en `static/admin/config.yml`.
- Si necesitas añadir nuevas colecciones o campos, edita ese archivo.
- Otro archivo necesario es `netlify.toml`.
- El acceso es mediante Git Gateway o autenticación de Netlify Identity (según configuración actual).
- El CMS genera archivos Markdown en las carpetas correspondientes de `content/`.
- Para más información sobre Netlify visita [esta gúia paso a paso](https://ofilibre.urjc.es/guias/migracion-gitlab-a-netlify/) donde se explica cómo fue la migración.

---

## Despliegue y hosting

- El sitio está pensado para desplegarse automáticamente en Netlify tras cada push a la rama principal.
- Si necesitas desplegar manualmente, sigue las instrucciones de Netlify o ejecuta `hugo` para generar el sitio estático en `public/`.

---

<<<<<<< HEAD
## Citar imágenes (/shortcodes/image.html)

Para insertar imágenes con atribución y licencia de forma estandarizada, se ha implementado la plantilla `/shortcodes/image.html`. Para utilizarlo se incluye un fragmento HTML en el Markdown correspondiente, de la siguiente manera:

```
{{< image
  src="/images/blog/mooc/foto-blog-3.jpg"
  alt="Set de grabación. En la mesa están sentados, de izquierda a derecha, Jesús M. González Barahona, Florencia Claes y Tomás Zarza."
  title="Grabación del MOOC"
  author="OfiLibre"
  license="CC BY-SA 4.0"
  licenseUrl="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
>}}
```

**Parámetros:**

- src: Ruta relativa de la imagen.
- alt: Texto alternativo (para accesibilidad).
- title: Título o pie de foto.
- author: Autoría de la imagen.
- license: Tipo de licencia.
- licenseUrl: Enlace a la licencia correspondiente.
- source: Fuente (url) de la imagen.

Este shortcode asegura que la imagen se muestre correctamente y que los créditos y licencias estén bien citados.

---

=======
>>>>>>> 5c60fb4aa3da8c30a0c00697bdcfbf59189f5953
## Notas y recomendaciones

- Si añades una nueva sección, crea la carpeta en `content/idioma/` y la plantilla en `layouts/` si es necesario.
- Revisa la documentación de Hugo para personalizaciones avanzadas: [https://gohugo.io/documentation/](https://gohugo.io/documentation/)
- Si tienes dudas sobre el tema visual, consulta el repositorio original del tema Navigator.
