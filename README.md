# Carlos García Huerta — Portafolio

**Software Developer** especializado en Android nativo (Kotlin + Jetpack Compose), con experiencia en desarrollo web full‑stack, visión por computadora y ciencia de datos.

🔗 **Sitio en vivo:** [www.korwork.org](https://www.korwork.org)

[![Sitio en vivo](https://img.shields.io/badge/sitio-korwork.org-8D6E63?style=flat-square)](https://www.korwork.org)
[![GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-181717?style=flat-square&logo=github)](https://pages.github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Viewer-000000?style=flat-square&logo=three.js&logoColor=white)](#)

---

## 📖 Sobre este repositorio

Este es el código fuente de mi portafolio personal: un sitio estático, sin frameworks ni build step, construido con **HTML, CSS y JavaScript puro (ES Modules)**. No es solo una landing page — es una pequeña colección de tres experiencias conectadas entre sí:

| Página | Descripción |
|---|---|
| [`index.html`](index.html) | Portafolio principal — perfil, stack técnico, apps publicadas, proyectos de GitHub, contacto. |
| [`personal.html`](personal.html) | **"Mundo Interno"** — la parte humana detrás del código: un visor 3D interactivo con escaneos reales renderizados en vivo, y una colección de lo que me define fuera de una terminal. |
| [`pardos.html`](pardos.html) | Landing oficial de **ParDos: Zen Math**, mi puzzle publicado en Google Play, con galería de capturas y demo jugable embebida. |

---

## ✨ Características técnicas destacadas

- **Visor 3D en vivo** ([`js/model-viewer.js`](js/model-viewer.js)) — escaneos reales renderizados con **Three.js** directo en el navegador: sin apps, sin plugins. Incluye auto-rotación, reinicio de cámara, pantalla completa y barra de progreso de carga real.
- **Modelos 3D optimizados para web** — los escaneos originales (~104–138 MB) se comprimieron ~96% (simplificación de geometría + recompresión de texturas) para cargar en segundos sin sacrificar detalle visual.
- **Contenido 100% data-driven** — el stack tecnológico ([`js/skills.js`](js/skills.js)) y los proyectos destacados ([`js/projects.js`](js/projects.js)) se renderizan dinámicamente desde arreglos de datos, no HTML hardcodeado.
- **Demo jugable embebida** — una versión mini de ParDos corre directo en un modal del portafolio ([`js/game.js`](js/game.js)).
- **Carrusel 3D coverflow** en la galería de ParDos, dentro de un marco de dispositivo, sin dependencias externas.
- **Menú de navegación responsivo** compartido entre las tres páginas ([`js/nav.js`](js/nav.js)), con animaciones de aparición basadas en `IntersectionObserver`.
- **Cero build step** — todo se sirve tal cual; los módulos externos (Three.js, Font Awesome) se cargan por CDN.

---

## 🛠️ Stack técnico

| Categoría | Tecnología |
|---|---|
| Estructura & estilos | HTML5, CSS3 (custom properties, Grid, Flexbox, animaciones) |
| Lógica | JavaScript (ES Modules), sin frameworks |
| Gráficos 3D | [Three.js](https://threejs.org/) (GLTFLoader, OrbitControls) |
| Tipografía | [Outfit](https://fonts.google.com/specimen/Outfit) vía Google Fonts |
| Iconografía | [Font Awesome 6](https://fontawesome.com/) |
| Formulario de contacto | [Formspree](https://formspree.io/) |
| Hosting | GitHub Pages + dominio personalizado (`www.korwork.org`) |
| Herramientas de build de assets | [`gltf-transform`](https://gltf-transform.dev/) para compresión de modelos 3D (no es una dependencia de runtime) |

---

## 📁 Estructura del proyecto

```
korkoor.github.io/
├── index.html              # Portafolio principal
├── personal.html           # "Mundo Interno" — visor 3D + lado humano
├── pardos.html              # Landing de ParDos: Zen Math
├── CNAME                    # Dominio personalizado (www.korwork.org)
│
├── css/
│   ├── styles.css           # Design system compartido (variables, nav, hero, tarjetas)
│   ├── personal.css         # Estilos de "Mundo Interno" y el visor 3D
│   ├── pardos.css           # Estilos de la landing de ParDos
│   └── game.css             # Estilos del modal de demo jugable
│
├── js/
│   ├── main.js               # Punto de entrada de index.html
│   ├── nav.js                 # Menú móvil, scroll nav y reveal animations (compartido)
│   ├── model-viewer.js        # Visor 3D (Three.js)
│   ├── personal.js            # Datos y render del grid "Mundo Interno"
│   ├── skills.js              # Datos y render del stack tecnológico
│   ├── projects.js            # Datos y render de proyectos destacados
│   ├── pardos.js               # Carrusel 3D de capturas de ParDos
│   └── game.js                 # Demo jugable embebida
│
└── assets/
    ├── images/
    │   ├── Models/            # Modelos 3D (.glb) para el visor
    │   └── ParDos/              # Capturas y assets del juego
    └── ...
```

---

## 🚀 Cómo correrlo localmente

Es un sitio 100% estático, pero usa **ES Modules** e **import maps**, por lo que necesita servirse por HTTP (no funciona abriendo el HTML directo con `file://`).

```bash
git clone https://github.com/KorKoor/korkoor.github.io.git
cd korkoor.github.io
python -m http.server 8080
```

Luego abre `http://localhost:8080` en el navegador.

---

## 🌐 Despliegue

El sitio se publica automáticamente vía **GitHub Pages** desde la rama `main`. Cualquier cambio mergeado ahí se refleja en [www.korwork.org](https://www.korwork.org) en cuestión de minutos, sin pasos manuales adicionales.

---

## 📬 Contacto

- **Email:** [charliegarcia.it@gmail.com](mailto:charliegarcia.it@gmail.com)
- **GitHub:** [@KorKoor](https://github.com/KorKoor)
- **LinkedIn:** [charliegarcia-it](https://linkedin.com/in/charliegarcia-it)

---

<sub>© 2026 Carlos García Huerta. El código de este repositorio puede consultarse como referencia; el contenido personal (fotos, biografía, modelos 3D) no está disponible para reutilización.</sub>
