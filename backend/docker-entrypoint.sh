#!/bin/sh
set -e

if [ ! -f .env ]; then
  cp .env.example .env
fi

until pg_isready -h "${DB_HOST:-db}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-laravel}" >/dev/null 2>&1; do
  echo "Waiting for database..."
  sleep 2
done

if ! grep -q '^APP_KEY=base64' .env; then
  php artisan key:generate --force
fi

php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port=8000
