#!/bin/sh
set -eu
cd /var/www/html

if [ ! -f .env ]; then
    cp .env.example .env
fi

# El primer inicio importa de la distribución oficial los archivos base que
# no formen parte todavía del ZIP, sin sobrescribir personalizaciones.
if [ ! -f storage/framework/.official_skeleton_ready ]; then
    echo '==> Obteniendo el esqueleto oficial Laravel 13 (sin vendor)...'
    workdir="$(mktemp -d)"
    composer create-project laravel/laravel "$workdir/base" '^13.0' \
        --no-install --no-scripts --no-interaction --prefer-dist
    (cd "$workdir/base" && find . -type f ! -path './.git/*' -print) | while IFS= read -r file; do
        if [ ! -e "/var/www/html/$file" ]; then
            mkdir -p "$(dirname "/var/www/html/$file")"
            cp "$workdir/base/$file" "/var/www/html/$file"
        fi
    done
    rm -rf "$workdir"
    touch storage/framework/.official_skeleton_ready
    echo '==> Esqueleto Laravel 13 importado; archivos existentes conservados.'
fi

if [ ! -f vendor/autoload.php ]; then
    echo '==> Instalando dependencias PHP dentro del volumen vendor_data...'
    composer install --no-interaction --prefer-dist --no-progress
fi

if ! grep -Eq '^APP_KEY=base64:.+' .env; then
    echo '==> Creando APP_KEY...'
    php artisan key:generate --force --no-interaction
fi

mkdir -p storage/app/private storage/framework/cache/data storage/framework/sessions \
    storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache

echo '==> PHP-FPM listo.'
exec "$@"
