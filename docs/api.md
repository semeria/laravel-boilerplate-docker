# Rutas HTTP

**Resumen:** No existe una API REST declarada. Las rutas disponibles son páginas y acciones web Inertia para login y dashboard, además del health check `/up` de Laravel.

## Índice
- [Rutas declaradas](#rutas-declaradas)
- [API](#api)
- [Contratos pendientes](#contratos-pendientes)

## Rutas declaradas

| Método | Ruta | Implementación | Respuesta |
| --- | --- | --- | --- |
| `GET` | `/` | `routes/web.php` | Redirige a `/dashboard`. |
| `GET` | `/login` | `AuthenticatedSessionController::create` (`guest`) | Renderiza `Auth/Login`. |
| `POST` | `/login` | `AuthenticatedSessionController::store` (`guest`, throttle 6/min) | Inicia sesión; redirige al dashboard o devuelve error de validación. |
| `GET` | `/dashboard` | `routes/web.php` (`auth`) | Renderiza `Dashboard` con nombre/correo y versiones Laravel/PHP. |
| `POST` | `/logout` | `AuthenticatedSessionController::destroy` (`auth`) | Cierra la sesión y redirige a `/login`. |
| `GET` | `/up` | `bootstrap/app.php` | Health check integrado de Laravel. |

## API

No se encontró `routes/api.php`, rutas JSON de negocio ni controladores API. Estas rutas usan el grupo web y sesiones/cookies; no son una API tokenizada.

## Contratos pendientes

Versionado y endpoints de negocio: **Pendiente de documentar**.
