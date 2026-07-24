# APM Gestio Web

Monorepo con frontend en **Vite + React + TypeScript** y backend en **Laravel**, orquestados con **Docker Compose**.

## Estructura

```
.
├── frontend/          # Vite + React + TypeScript (puerto 5173)
├── backend/           # Laravel API (puerto 8000)
└── docker-compose.yml # Orquesta frontend, backend y PostgreSQL
```

## Requisitos

- Docker Desktop

## Levantar el proyecto

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend (API): http://localhost:8000
- Endpoint de prueba: http://localhost:8000/api/health
- PostgreSQL: localhost:5432 (usuario `laravel`, password `secret`, base `laravel`)

Al arrancar, el backend espera a que la base de datos esté lista, genera `APP_KEY` si falta y ejecuta las migraciones automáticamente.

## Desarrollo

Ambos servicios montan el código fuente como volumen, por lo que los cambios en `frontend/` y `backend/` se reflejan en caliente (hot reload en Vite, recarga de PHP en cada request).

Comandos útiles:

```bash
# Ejecutar artisan dentro del contenedor backend
docker compose exec backend php artisan migrate

# Instalar una dependencia npm en el frontend
docker compose exec frontend npm install <paquete>

# Instalar una dependencia composer en el backend
docker compose exec backend composer require <paquete>

# Ver logs
docker compose logs -f backend
docker compose logs -f frontend

# Parar todo
docker compose down
```

## Notas

- CORS: Laravel permite por defecto peticiones a `api/*` desde cualquier origen. Si se implementa autenticación con cookies (Laravel Sanctum SPA), habrá que publicar `config/cors.php`, configurar `allowed_origins` a `http://localhost:5173` con `supports_credentials: true`, y habilitar el middleware `statefulApi()` en `bootstrap/app.php`.
- El frontend tiene un proxy configurado en `vite.config.ts` para reenviar peticiones `/api` al backend dentro de la red Docker.
