# Proyecto
Laravel 13 + React + Inertia + Docker (`laravel13-inertia`).

# Objetivo
Base de desarrollo para crear una aplicación a medida con Laravel, React e Inertia, ejecutada mediante Docker Compose.

# Stack detectado
- Backend: PHP 8.3+ y Laravel 13; Composer administra las dependencias PHP.
- Frontend: React 19 con JSX, Inertia.js 3 y Vite 8; GSAP anima el dashboard y Lucide React proporciona sus iconos.
- Estilos: Tailwind CSS 4 mediante el plugin de Vite.
- Persistencia configurada: MySQL 8.4; Eloquent, migraciones, factories y seeders de Laravel.
- Entorno local: Docker Compose con PHP-FPM, Nginx, Node/Vite, MySQL y phpMyAdmin. Dependencias PHP y Node se alojan en volúmenes Docker.
- Pruebas: PHPUnit 12 y Laravel `artisan test`; formato PHP con Laravel Pint.
- Autenticación: sesión web de Laravel con login/logout y dashboard protegido; no hay registro, roles ni autorización de negocio. Detalles en `/docs/auth.md`.
- No se detectó una configuración de despliegue de producción. El Compose actual está destinado al desarrollo local.

# Convenciones de código
- Sigue PSR-4 y el estilo Laravel existente: clases PHP en `app/`, rutas en `routes/`, configuración en `config/` y cambios de esquema en `database/migrations/`.
- Mantén nombres de páginas Inertia alineados con archivos bajo `resources/js/Pages/`; la resolución actual busca archivos `.jsx` con rutas sensibles a mayúsculas y minúsculas.
- Usa componentes funcionales React y JSX en el frontend, manteniendo la integración existente `@inertiajs/react`.
- Divide las interfaces compuestas en componentes React reutilizables, cada uno en su propio archivo; las páginas deben componerlos en lugar de concentrar toda la UI en un único componente.
- Conserva la separación Laravel (rutas, controladores, modelos) / frontend Inertia y usa props para pasar datos del servidor a las páginas.
- Mantén el formato y las comillas observados: indentación de cuatro espacios en PHP/JS, imports al inicio y sintaxis moderna compatible con el stack.
- Mantén dependencias y scripts coherentes con `composer.json` y `package.json`; conserva ambos lockfiles al modificar dependencias.
- Los estilos globales están en `resources/css/app.css`; Tailwind descubre Blade y fuentes JS/JSX desde sus directivas `@source`.

# Arquitectura frontend
- `resources/js/app.jsx` resuelve páginas desde `resources/js/Pages/**/*.jsx`; conserva mayúsculas y nombres para que coincidan con `Inertia::render()` (por ejemplo, `Dashboard` y `Auth/Login`).
- Excluye del glob de páginas los JSX bajo carpetas locales `Components/`, para que los componentes de un módulo no se registren como páginas Inertia.
- Mantén las páginas Inertia en `Pages/`. Coloca componentes, datos y hooks exclusivos de un módulo junto a su página, bajo una carpeta del módulo; actualmente Dashboard usa `Pages/Dashboard.jsx` como entrada y `Pages/Dashboard/` para sus recursos locales.
- Usa `resources/js/Components/` para componentes que realmente se reutilicen entre páginas. Antes de extraer o duplicar uno, busca usos existentes; no conviertas cada pieza visual en una abstracción global.
- Reserva `resources/js/hooks/` y `resources/js/data/` para lógica y datos compartidos. Mantén helpers y hooks específicos dentro del módulo que los consume.
- Crea layouts compartidos solo cuando varias páginas compartan estructura y comportamiento. No muevas componentes de un módulo a layouts por motivos únicamente visuales.
- El proyecto usa JavaScript/JSX, no TypeScript ni aliases configurados. Conserva componentes funcionales, props explícitas, imports al inicio y nombres PascalCase para componentes; usa Tailwind y mantén clases visuales al hacer refactorizaciones estructurales.
- Laravel conserva rutas, autenticación, validación y datos del servidor; React/Inertia presenta las páginas y gestiona la interacción cliente. No alteres nombres de página, props ni rutas como efecto de reorganizar archivos.
- Mantén formularios y estado local en la página o componente que los controla; crea hooks cuando encapsulen lógica reutilizable o un ciclo de vida complejo, no para funciones simples.
- Para cambios de frontend, valida con `docker compose exec node npm run build`. Las pruebas se ejecutan con `docker compose exec app php artisan test`; PHP puede comprobarse con `docker compose exec app ./vendor/bin/pint --test`. `package.json` no define un script de lint.

# Buenas prácticas
- Revisa las rutas, middleware, configuración y componentes relacionados antes de cambiar un flujo.
- Usa migraciones para cambios de esquema y conserva compatibilidad con MySQL configurado en Compose.
- Añade o adapta pruebas en `tests/Feature` o `tests/Unit` cuando cambie comportamiento; ejecuta `php artisan test` en el contenedor `app`.
- Ejecuta `npm run build` en el contenedor `node` para verificar cambios de frontend.
- Ejecuta comandos PHP, Composer y NPM en sus contenedores según el flujo documentado; evita instalar `vendor` o `node_modules` en el host.
- Lee `.env.example` para conocer variables disponibles. Nunca publiques secretos ni dependas de valores locales de `.env` en el código.
- Mantén los cambios de Docker y Vite coherentes entre `compose.yaml`, `docker/` y `vite.config.js`.
- Trata los datos de los volúmenes Docker como persistentes; no elimines volúmenes ni bases de datos como parte de tareas rutinarias.

# Qué nunca debe hacer un agente
- No inventar frameworks, servicios, autenticación, roles, APIs o mecanismos de despliegue que no estén implementados.
- No añadir un starter kit de autenticación u otra dependencia sin que la tarea lo requiera expresamente.
- No guardar credenciales o datos sensibles en el repositorio ni mostrar el contenido de `.env`.
- No ejecutar `docker compose down -v`, ni borrar volúmenes, datos, migraciones o archivos de usuario sin autorización explícita.
- No cambiar puertos, configuración de HMR o variables de entorno de forma aislada; mantener coordinados Compose y Vite.
- No considerar el Compose de desarrollo una configuración de producción.
- No duplicar documentación extensa en este archivo; documentar dentro de `/docs`.

# Flujo recomendado para modificar código
1. Identifica las capas y archivos implicados; comprueba la implementación actual antes de decidir el cambio.
2. Haz el cambio mínimo coherente con Laravel, Inertia y los patrones del repositorio.
3. Si cambia el esquema, crea una migración; si cambia el comportamiento, añade o actualiza pruebas pertinentes.
4. Verifica con los comandos adecuados dentro de Docker: `docker compose exec app php artisan test` y/o `docker compose exec node npm run build`.
5. Revisa el diff para confirmar que solo contiene cambios necesarios y que no incluye secretos ni artefactos locales.
6. Actualiza la documentación afectada dentro de `/docs`.

# Ubicación de la documentación
Toda la documentación del proyecto vive dentro de `/docs`.

## Uso de la documentación

Antes de responder o modificar código:

1. Identifica qué área del proyecto está involucrada.
2. Lee únicamente el documento correspondiente dentro de /docs.
3. No cargues documentos que no sean necesarios.
4. Si modificas el proyecto, actualiza únicamente el documento afectado.
5. Mantén AGENTS.md como un archivo breve de reglas; toda la documentación técnica debe permanecer en /docs.
6. Carga bajo demanda las Skills de `.opencode/skills/` solo cuando la tarea coincida; no dupliques en ellas estas reglas globales ni el contenido de `/docs`.
