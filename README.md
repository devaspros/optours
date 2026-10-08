# Puerta de Oro · Tours — prototipo v1

Sitio estático (HTML/CSS/JS, sin build) para un operador turístico en Barranquilla.

- `index.html` — inicio: fondo fijo del Gran Malecón con máscara blanca, monumentos que aparecen a los lados con el scroll, postales de los 4 temas, tira de paradas, footer grande con el Puente Pumarejo.
- `ruta.html` — mapa dibujado (SVG) con las 7 paradas; cada foto lleva a su página.
- `parada.html?id=<id>` — página de cada parada (contenido en `js/data.js`).
- `creditos.html` — atribución de fotos (Wikimedia Commons, CC BY-SA).

Para verlo: `python3 -m http.server 8000` en esta carpeta y abrir http://localhost:8000

Pendiente: foto real del Mirador de Miramar, verificar datos históricos de cada parada, nombre/marca definitivos, precio y WhatsApp reales.
