# Changelog - Portafolio Celeste Limeira

**Proyecto Integrador UX/UI - Tecnología Web II - UCB**  
**Autora:** Celeste Limeira Quispe Sarmiento  
**Fecha:** Octubre de 2026  

## Versión UX/UI

### Agregado
- Menú hamburguesa (JavaScript): muestra y oculta el menú en dispositivos móviles.
- Modo oscuro / Cambio de tema: botón interactivo que alterna los estilos visuales en el sitio.
- Validación en tiempo real del formulario de contacto y del nuevo cotizador de servicios.
- Filtro de contenido y buscador con autocompletado en Proyectos y Habilidades.
- Nueva sección de Cotizador de servicios (`cotizador.html`): planes, plazos de entrega, autocompletado y cálculo de totales dinámicos.
- Enlace "Cotizador" integrado en el menú de navegación de todas las páginas.
- Meta description personalizada en cada una de las páginas del portafolio.
- Favicon incrustado mediante URI de datos (*data URI*) para evitar solicitudes HTTP adicionales y errores 404.
- Atributos de accesibilidad ARIA e indicadores visuales de foco para navegación por teclado.
- Optimización de imágenes al formato WebP moderno con atributos explícitos `width` y `height` para prevenir saltos de diseño (CLS de 0).

### Cambiado
- Diseño adaptativo y responsivo estructurado para diferentes resoluciones de pantalla (escritorio y móvil).
- Paleta de colores ajustada para cumplir con los estándares de contraste exigidos en accesibilidad web.
- Estética visual mejorada en tarjetas de presentación, secciones de habilidades, proyectos, experiencia y la tarjeta de bienvenida con foto circular en la página de inicio.
- Espaciado y tipografía optimizados para una lectura limpia y profesional en todas las secciones.

### Corregido
- **Accessibility:** Corrección en el contraste de color en elementos secundarios, textos y botones para superar la relación mínima recomendada de 4.5:1.
- **SEO:** Inclusión de etiquetas `<meta name="description">` faltantes y optimización de metadatos en todas las páginas.
- **Best Practices:** Solución del error 404 en consola asociado a la ausencia del archivo `favicon.ico` mediante el uso de un icono incrustado.
- **Performance:** Optimización del peso y tamaño de la imagen principal de perfil (reemplazo de JPG pesado por WebP optimizado), mejorando drásticamente la métrica LCP (*Largest Contentful Paint*).

### Resultados de Lighthouse (Todas las páginas, Entorno Local y Producción)
- **Performance:** Antes 99, **después 100**
- **Accessibility:** Antes 91, **después 100** 
- **Best Practices:** Antes 100, **después 100**
- **SEO:** Antes 91, **después 100**

detalle de la auditoría está en docs/CelesteLimeiraQuispe.pdf
