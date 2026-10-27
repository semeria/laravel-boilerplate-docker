#!/bin/sh
set -eu
cd /var/www/html

checksum="$(sha256sum package.json | cut -d' ' -f1)"
previous="$(cat node_modules/.package-json-sha256 2>/dev/null || true)"
if [ "$checksum" != "$previous" ] || [ ! -x node_modules/.bin/vite ]; then
    echo '==> Instalando dependencias frontend en volumen node_modules_data...'
    npm install --no-audit --no-fund
    echo "$checksum" > node_modules/.package-json-sha256
fi

echo '==> Iniciando Vite con HMR...'
exec npm run dev
