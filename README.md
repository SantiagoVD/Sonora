# SONORA

Prototipo frontend académico para descubrir conciertos y artistas emergentes. Construido con React, TypeScript, Vite y Tailwind CSS; no incluye backend ni pagos reales.

## Desarrollo local

```bash
npm install
npm run dev
```

Para generar la versión estática:

```bash
npm run build
npm run preview
```

## Contenido y personalización

- Conciertos y artistas de referencia: `src/data/content.ts`.
- Fotografías: URLs de imágenes de Unsplash definidas en el mismo archivo y en `src/index.css`.
- Colores, tipografías, responsive y animaciones: variables y estilos de `src/index.css`.
- Reservas, favoritos y postulaciones de muestra: se guardan en `localStorage` bajo claves `sonora:*`.

Todos los eventos, perfiles, reservas y postulaciones de este sitio son demostrativos. No se procesan pagos, no se emiten entradas válidas y las postulaciones no se envían a una organización.
