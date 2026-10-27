# Entorno y ejecución

**Resumen:** `compose.yaml` define el entorno local de desarrollo con PHP-FPM, Nginx, Node/Vite, MySQL y phpMyAdmin. No se detecta configuración de despliegue de producción.

## Índice
- [Servicios Compose](#servicios-compose)
- [Puertos](#puertos)
- [Variables de entorno](#variables-de-entorno)
- [Persistencia y arranque](#persistencia-y-arranque)
- [Producción](#producción)

## Servicios Compose

- `app`: imagen local construida con `docker/php/Dockerfile`, PHP-FPM y Composer; el entrypoint prepara `.env`, puede importar archivos faltantes del esqueleto Laravel, instala Composer en volumen si hace falta y genera `APP_KEY` si no existe.
- `nginx`: imagen `nginx:1.28-alpine`, sirve `public/` y reenvía PHP-FPM a `app:9000` según `docker/nginx/default.conf`.
- `node`: `node:22-alpine`; el entrypoint instala NPM en volumen cuando cambia el hash de `package.json` o falta Vite, y luego inicia Vite.
- `db`: `mysql:8.4`, con healthcheck y datos en `mysql_data`.
- `phpmyadmin`: `phpmyadmin:5.2-apache`, conectado al servicio `db`.

## Puertos

Publicaciones locales por defecto, configurables con variables de entorno: aplicación `8080`, Vite `5173`, phpMyAdmin `8081` y MySQL `3307`. En red Docker, Laravel conecta a MySQL en `db:3306`. Vite fija `5173` y `localhost` en `vite.config.js`, y permite solicitudes CORS desde `http://localhost:8080`. Si se cambia `APP_PORT`, hay que actualizar también el origen CORS; cualquier cambio de `VITE_PORT` debe coordinarse con Vite.

## Variables de entorno

Variables declaradas en `.env.example` y/o consumidas por Compose:

- Aplicación: `APP_NAME`, `APP_ENV`, `APP_KEY`, `APP_DEBUG`, `APP_URL`, `APP_LOCALE`, `APP_FALLBACK_LOCALE`, `APP_FAKER_LOCALE`, `APP_MAINTENANCE_DRIVER`, `PHP_CLI_SERVER_WORKERS`, `BCRYPT_ROUNDS`.
- Base de datos: `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`; Compose consume también `MYSQL_ROOT_PASSWORD` y `MYSQL_PORT`.
- Servicios Laravel: `SESSION_DRIVER`, `SESSION_LIFETIME`, `SESSION_ENCRYPT`, `SESSION_PATH`, `SESSION_DOMAIN`, `QUEUE_CONNECTION`, `CACHE_STORE`, `BROADCAST_CONNECTION`, `FILESYSTEM_DISK`.
- Correo y frontend: variables `MAIL_*` y `VITE_APP_NAME` declaradas en `.env.example`.
- Usuario de desarrollo opcional: `DEMO_USER_EMAIL` y `DEMO_USER_PASSWORD`, usados por el seeder del usuario demo cuando ambos tienen valor.
- Puertos de servicios: `APP_PORT`, `VITE_PORT`, `PMA_PORT`, `MYSQL_PORT`.

Los valores efectivos dependen del `.env` local, cuyo contenido no se documenta aquí. Las variables adicionales admitidas por configuración Laravel, pero no definidas en `.env.example`, son **Pendiente de documentar**.

## Persistencia y arranque

Los volúmenes nombrados `mysql_data`, `vendor_data` y `node_modules_data` conservan la base y dependencias. El código del repositorio se monta dentro de los contenedores; `vendor` y `node_modules` se alojan en sus volúmenes Docker. El README documenta el arranque con `docker compose up -d --build`, migraciones con `docker compose exec app php artisan migrate` y el comando `docker compose down` sin eliminar volúmenes.

## Producción

No hay archivos o perfiles de producción detectados. El README declara que Compose es para desarrollo local y que no se use como despliegue de producción.
