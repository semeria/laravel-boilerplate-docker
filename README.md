# Laravel 13 + React + Inertia 3 + Tailwind CSS 4 + Docker

Base de desarrollo **sin starter kits**: Laravel 13, PHP 8.4, React 19, Inertia 3, Tailwind CSS 4, Vite 8, MySQL 8.4 y phpMyAdmin. Docker Compose levanta PHP-FPM, Nginx, Node/Vite, MySQL y phpMyAdmin.

> **Qué incluye el ZIP:** estructura Laravel y archivos propios de integración React/Inertia/Docker. **Durante el primer arranque**, Docker ejecuta `composer create-project laravel/laravel ... --no-install` para recuperar directamente la distribución oficial y copiar cualquier archivo base faltante, **sin sobrescribir** los archivos ya configurados. Luego instala `vendor` dentro del volumen Docker. El frontend instala `node_modules` en otro volumen Docker. No se incluye `vendor`, `node_modules` ni los lockfiles generados por las instalaciones (se crearán al iniciar, en el proyecto solo los lockfiles).

## Requisitos

- Docker Desktop con Docker Compose V2 (Windows, macOS o Linux).
- Acceso a Internet en el primer inicio para descargar la base oficial y las dependencias.
- No necesitas instalar PHP, Composer, Node ni MySQL en tu PC.

## Iniciar (Windows PowerShell, CMD, macOS o Linux)

Descomprime el ZIP, abre una terminal **dentro de la carpeta del proyecto**. Antes de iniciar, crea `.env` a partir de `.env.example` y reemplaza `change-me-local` por contraseñas propias para MySQL y root. El archivo `.env` permanece local y no se incluye en GitHub.

```bash
docker compose up -d --build
```

En la primera ejecución se descargan el esqueleto oficial, paquetes PHP y paquetes JavaScript. Verifica el proceso:

```bash
docker compose logs -f app node
```

Cuando ambos servicios estén listos:

| Servicio | Dirección |
| --- | --- |
| App Laravel + React | http://localhost:8080 |
| phpMyAdmin | http://localhost:8081 |
| Vite (HMR) | http://localhost:5173 |
| MySQL desde tu PC | 127.0.0.1:3307 |
| MySQL desde PHP en Docker | db:3306 |

**Acceso phpMyAdmin:** servidor `db`. Usa el usuario y la contraseña definidos en tu archivo local `.env`. Antes de iniciar, copia `.env.example` como `.env` y reemplaza `change-me-local` por contraseñas propias. No publiques el archivo `.env` ni uses estas credenciales de desarrollo en producción.

## Migraciones

```bash
docker compose exec app php artisan migrate
```

El login utiliza la tabla `users`, así que ejecuta las migraciones antes de iniciar sesión. En desarrollo, las sesiones, la caché y las colas usan `SESSION_DRIVER=file`, `CACHE_STORE=file` y `QUEUE_CONNECTION=sync`.

## Acceso de demostración

La aplicación incluye login por sesión y un dashboard de prueba protegido. Después de iniciar los contenedores y migrar la base:

1. En tu archivo local `.env`, configura `DEMO_USER_EMAIL=demo@example.test` y define un valor propio para `DEMO_USER_PASSWORD`.
2. Crea o actualiza el usuario demo:

   ```bash
   docker compose exec app php artisan db:seed
   ```

3. Abre http://localhost:8080/login e inicia sesión con ese correo y la contraseña configurada en `.env`.

La contraseña no está incluida en el repositorio. Para el flujo de autenticación y las rutas, consulta [`docs/auth.md`](docs/auth.md).

## Comandos habituales (siempre en Docker)

```bash
# Artisan
docker compose exec app php artisan route:list
docker compose exec app php artisan make:controller ProductoController
docker compose exec app php artisan make:model Producto -m
docker compose exec app php artisan migrate
docker compose exec app php artisan db:seed

# Composer (no crea vendor en tu equipo)
docker compose exec app composer require nombre/paquete

# NPM (no crea node_modules en tu equipo)
docker compose exec node npm install nombre-paquete
docker compose exec node npm run build

# Tests
docker compose exec app php artisan test

# Detener contenedores, conservar MySQL y dependencias
docker compose down

# CUIDADO: elimina base de datos y dependencias de los volúmenes
docker compose down -v
```

## Dónde editar

```text
app/
  Http/Controllers/Auth/AuthenticatedSessionController.php
  Http/Middleware/HandleInertiaRequests.php
  Models/User.php
  Providers/AppServiceProvider.php
bootstrap/
config/
database/
  factories/
  migrations/
  seeders/
docker/
  nginx/default.conf
  node/entrypoint.sh
  php/Dockerfile
  php/entrypoint.sh
public/
resources/
  css/app.css
  js/app.jsx
  js/Pages/Auth/Login.jsx
  js/Pages/Dashboard.jsx
  js/Pages/Home.jsx
  views/app.blade.php
routes/
  console.php
  web.php
storage/
tests/
.env / .env.example
artisan / composer.json / package.json / vite.config.js
compose.yaml
```

La ruta `/` dirige al dashboard; las visitas sin autenticar son enviadas al login. El proyecto implementa login/logout por sesión y un dashboard de prueba, sin registro público, roles ni autorización de negocio. No se ha instalado Breeze, Jetstream, Fortify ni componentes de UI de terceros. Para empezar a personalizar la portada, edita `resources/js/Pages/Home.jsx`.

## Sobre `vendor` y `node_modules`

- Laravel se instala en un volumen nombrado `vendor_data` montado en `/var/www/html/vendor` **solo dentro de la aplicación PHP**.
- React, Vite, Tailwind e Inertia cliente se instalan en `node_modules_data` montado en `/var/www/html/node_modules` **solo dentro del contenedor Node**.
- El código del proyecto sí se monta desde tu PC para tener cambios inmediatos y HMR; los archivos `composer.lock` y `package-lock.json` pueden aparecer en el directorio local, y **deben mantenerse** para reproducibilidad.
- Docker Desktop puede mostrar carpetas de montaje vacías en tu host según su implementación. Los **paquetes instalados no se guardan en ellas**.

## Cambiar puertos y credenciales

Edita `.env` antes del primer arranque. Puertos: `APP_PORT=8080`, `VITE_PORT=5173`, `PMA_PORT=8081`, `MYSQL_PORT=3307`. La configuración Vite usa 5173 y localhost de forma fija, así que si cambias `VITE_PORT`, actualiza también `vite.config.js` (propiedades `server.hmr` y `server.origin`).

Las variables de MySQL son consumidas por Compose en el primer arranque del volumen. Al cambiar usuario/base/contraseña después de crear MySQL, debes administrar las credenciales existentes o recrear voluntariamente el volumen `mysql_data`; no basta con editar `.env`.

**No utilices este Compose como despliegue de producción.** Incluye `APP_DEBUG=true`, contraseñas locales, puertos de desarrollo y hot reload.

## Versión y fuente oficial

- Esqueleto: `laravel/laravel` 13.x desde Packagist en el primer inicio.
- Framework: `laravel/framework` compatible con 13.x (resuelto por Composer al primer inicio).
- Inertia Laravel: 3.x; React: 19.x; Tailwind: 4.x.
- Documentación: https://laravel.com/docs/13.x y https://inertiajs.com/
