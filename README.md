# Australia y Nueva Zelanda · Febrero 2027

Sitio estático con el itinerario final del viaje (9 – 28 de febrero de 2027).

## Publicar en GitHub Pages

1. Creen un repositorio nuevo en GitHub (por ejemplo, `viaje-au-nz-2027`).
2. Suban **todo el contenido de esta carpeta** a la raíz del repositorio (`index.html` debe quedar en la raíz).
   ```bash
   git init
   git add .
   git commit -m "Itinerario Australia y Nueva Zelanda"
   git branch -M main
   git remote add origin https://github.com/USUARIO/viaje-au-nz-2027.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. En uno o dos minutos el sitio estará en `https://USUARIO.github.io/viaje-au-nz-2027/`.

No necesita compilación: es HTML, CSS y JavaScript. Las rutas son relativas, así que funciona en cualquier subcarpeta.

## Contenido

- `index.html` · página principal
- `style.css`, `base.css` · estilos
- `app.js` · mapas interactivos (Leaflet, desde unpkg) y navegación
- `assets/routes.js` · rutas por carretera (OSRM / OpenStreetMap)
- `assets/Mapa_*.jpg` · mapas imprimibles en alta resolución
- `.nojekyll` · evita que GitHub Pages procese el sitio con Jekyll

Mapa base: Esri World Topographic Map (Esri, HERE, Garmin, © colaboradores de OpenStreetMap).
