# Decisiones detectadas

**Resumen:** Las decisiones técnicas detectadas incluyen una base Laravel/Inertia en Docker para desarrollo local, autenticación web por sesión sin starter kit y ausencia de configuración productiva.

## Índice
- [Evidencia de decisiones](#evidencia-de-decisiones)
- [Aspectos no determinados](#aspectos-no-determinados)

## Evidencia de decisiones

- Se eligió Laravel con Inertia y React para servir páginas de frontend desde rutas web Laravel; no se detecta un frontend SPA separado ni API de negocio.
- Se eligió Docker Compose para desarrollo local, con PHP-FPM detrás de Nginx y un servicio Node/Vite independiente.
- Compose usa MySQL 8.4 para el entorno local, mientras que PHPUnit usa SQLite en memoria para pruebas.
- Los directorios `vendor` y `node_modules` se gestionan en volúmenes Docker, igual que los datos MySQL en volumen persistente.
- Se implementó autenticación web con el guard de sesión incluido en Laravel, sin añadir un starter kit ni dependencias de autenticación.
- La creación del usuario demo toma email/contraseña del entorno; el password no está fijado en el código.
- Las clases de página son `.jsx` y el resolver Inertia usa rutas sensibles a mayúsculas y minúsculas.

## Aspectos no determinados

Motivos de negocio, alternativas evaluadas, responsables y fecha de aprobación de las decisiones: **Pendiente de documentar**.
