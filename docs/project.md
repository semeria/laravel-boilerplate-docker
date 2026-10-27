# Proyecto

**Resumen:** `laravel13-inertia` es una base de desarrollo de Laravel preparada para páginas React renderizadas mediante Inertia y ejecutada localmente con Docker Compose.

## Índice
- [Propósito y alcance](#propósito-y-alcance)
- [Stack y dependencias directas](#stack-y-dependencias-directas)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Scripts disponibles](#scripts-disponibles)

## Propósito y alcance

El repositorio proporciona una aplicación inicial para construir un sistema a medida. La página implementada es una portada de demostración. No se detectan módulos de negocio.

## Stack y dependencias directas

- PHP `^8.3`, Laravel `^13.17`, Inertia Laravel `^3.5` y Laravel Tinker `^3.0` (`composer.json`).
- React y React DOM `^19.3.1`, `@inertiajs/react` `^3.9.1`.
- Vite `^8.3.5`, plugin React para Vite `^6.1.2`, Laravel Vite Plugin `^3.2.0`, Tailwind CSS y su plugin Vite `^4.3.3`.
- Herramientas PHP de desarrollo declaradas: PHPUnit `^12.5.12`, Laravel Pint, Mockery, Faker, Collision, Pail y Pao.
- Los lockfiles existentes son `composer.lock` y `package-lock.json`; representan las versiones resueltas y deben mantenerse junto con sus manifiestos.

## Estructura del repositorio

- `app/`: modelo `User`, middleware Inertia, controlador base y proveedor de aplicación.
- `bootstrap/`, `config/`, `routes/`: inicialización, configuración y rutas web/consola.
- `database/`: migraciones, factory de `User` y seeder raíz.
- `resources/`: plantilla Blade de Inertia, página React, entrada JavaScript y estilos.
- `public/`: punto de entrada HTTP y recursos públicos.
- `tests/`: suites Feature y Unit de PHPUnit.
- `docker/` y `compose.yaml`: contenedores y configuración de desarrollo.

## Scripts disponibles

Scripts de `composer.json`:

- `composer setup`: instala dependencias, prepara `.env`, genera la clave, ejecuta migraciones, instala paquetes NPM y construye assets.
- `composer test`: limpia la configuración cacheada y ejecuta `artisan test`.

Scripts de `package.json`:

- `npm run dev`: inicia Vite escuchando en `0.0.0.0`.
- `npm run build`: genera el build de producción de frontend.

El contenedor Node inicia Vite mediante su entrypoint; los pasos de arranque Docker están implementados en `docker/*/entrypoint.sh`.
