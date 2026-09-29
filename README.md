# 📰 Tech News & Lab | Periódico Digital & Laboratorio Tecnológico

> **Proyecto Front-End & Tecnologías Web**  
> **Entrega 2 – Prototipo Funcional (Semana 5)**  
> **Institución:** Politécnico Grancolombiano  

---

## 📌 Descripción del Proyecto
**Tech News & Lab** es una aplicación web tipo periódico digital y laboratorio tecnológico interactivo. Los usuarios pueden explorar noticias y experiencias sobre desarrollo web moderno, computación en la nube, inteligencia artificial y ciberseguridad, consultar su información detallada, gestionar una lista personalizada de favoritos en el navegador y comunicarse a través de un formulario con validación en tiempo real.

---

## 🚀 Requerimientos y Funcionalidades (Entrega 2)

### 1. 🧱 Desarrollo en HTML, CSS y JavaScript (Nativo)
- **HTML5 Semántico:** Uso de etiquetas `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` y `<footer>`.
- **CSS3 Moderno:** Sistema de diseño responsivo basado en CSS Grid y Flexbox, variables CSS (`:root`), tipografías de Google Fonts (*Outfit* e *Inter*), efectos de desenfoque (*Glassmorphism*) y micro-animaciones suaves.
- **JavaScript Modular (ES6+):** Código estructurado para manipulación del DOM, eventos en tiempo real, consumo asíncrono y persistencia.

### 2. ⚡ Renderizado Dinámico desde JSON Local (`noticias.json`)
- Carga dinámica asíncrona de datos desde el archivo local `noticias.json`.
- Renderizado de tarjetas (*cards*) con imagen representativa, categoría (*badge*), autor, fecha, tiempo de lectura y enlaces directos a la vista de detalle.
- Filtros interactivos por categorías temáticas (*Desarrollo Web*, *IA*, *Ciberseguridad*, *Cloud & DevOps*, *Experiencias Tech*).
- Buscador en vivo por título, contenido o autor con contador dinámico de resultados.

### 3. ⭐ Funcionalidad de Favoritos (LocalStorage)
- Almacenamiento 100% local en el navegador del usuario mediante la API de `localStorage`.
- Posibilidad de guardar o remover noticias con un solo clic.
- Contador de favoritos actualizado en tiempo real en la barra de navegación de todas las páginas.
- Vista dedicada (`favoritos.html`) con gestión individual, opción de vaciar la lista y estado vacío amigable (*Empty State*).

### 4. 📝 Formularios con Validaciones
- **Página de Contacto (`contacto.html`):**
  - Validación en tiempo real de campos obligatorios.
  - Validación de estructura de correo electrónico institucional o personal mediante expresiones regulares (*Regex*).
  - Contador de caracteres en tiempo real para el campo de mensaje.
  - Mensaje visual de confirmación tras el envío exitoso.
- **Gestión Básica (Mini CRUD en `gestion.html`):**
  - Formulario para redactar y publicar nuevas noticias con validación de datos.
  - Tabla interactiva para visualizar y eliminar noticias con sincronización instantánea.

### 5. 📂 Estructura Limpia del Proyecto

```text
Tech News & Lab/
├── img/              # Recursos gráficos locales e ilustraciones vectoriales SVG
│   ├── logo-white.svg
│   ├── microservices-architecture.svg
│   ├── web-development.svg
│   ├── angular-signals.svg
│   ├── ai-apis.svg
│   ├── cybersecurity-zerotrust.svg
│   ├── cloud-wasm.svg
│   └── digital-twins.svg
├── index.html        # Página de inicio (Hero, destacados, métricas, testimonios)
├── catalogo.html     # Catálogo dinámico con buscador y filtros
├── detalle.html      # Vista detallada de la noticia y artículos relacionados
├── favoritos.html    # Gestión de noticias guardadas (LocalStorage)
├── gestion.html      # Experiencias Dev (Panel para publicar y gestionar noticias)
├── contacto.html     # Formulario de contacto validado y preguntas frecuentes (FAQ)
├── noticias.json     # Base de datos local en formato JSON
├── styles.css        # Hoja de estilos unificada y responsive
├── script.js         # Lógica centralizada y controladores de eventos
└── README.md         # Documentación oficial del proyecto
```

---

## 💻 Instrucciones de Ejecución Local

1. **Enlace al Repositorio Oficial:**
   - 🔗 [https://github.com/dropepavp/tech-news-lab](https://github.com/dropepavp/tech-news-lab)

2. **Demostración en Vivo (GitHub Pages):**
   - 🌐 [https://dropepavp.github.io/tech-news-lab/](https://dropepavp.github.io/tech-news-lab/)

3. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/dropepavp/tech-news-lab.git
   ```
4. **Abrir el proyecto:**
   - Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox).
   - O utilizar la extensión **Live Server** de Visual Studio Code.

---

## 👥 Integrantes del Subgrupo 19
- **Sonia Homez Homez**
- **Santiago Isaza Lema**
- **Pedro Alejandro Varela Pinzón**

- **Docente:** Prof. John Olarte Ramos
- **Asignatura:** Front End (Grupo B01) &bull; Politécnico Grancolombiano
- **Año:** 2026
- **Subgrupo 19** 

