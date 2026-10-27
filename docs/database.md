# Base de datos

**Resumen:** El entorno Docker configura MySQL 8.4 como base de datos de la aplicación. Las migraciones presentes son las tablas base de Laravel para usuarios, sesiones, caché y colas; no hay entidades de negocio definidas.

## Índice
- [Motor y configuración](#motor-y-configuración)
- [Tablas y colecciones](#tablas-y-colecciones)
- [Modelo y datos semilla](#modelo-y-datos-semilla)
- [Pruebas](#pruebas)

## Motor y configuración

El servicio Compose `db` usa `mysql:8.4` y conserva sus datos en el volumen nombrado `mysql_data`. `.env.example` configura Laravel con conexión MySQL y host `db`. La configuración Laravel también contiene drivers para SQLite, MariaDB, PostgreSQL y SQL Server, pero no hay servicios Compose para ellos.

La suite de pruebas configura SQLite en memoria mediante `phpunit.xml`; por ello las pruebas no usan la base de datos persistente MySQL.

## Tablas y colecciones

No se utiliza una base documental ni se detectan colecciones; el esquema es relacional.

Las migraciones en `database/migrations/` crean:

- `users`: `id`, `name`, `email` único, `email_verified_at` nullable, `password`, `theme_preference` (`light`, `dark` o `system`, predeterminado `system`), `remember_token` y timestamps.
- `password_reset_tokens`: email como clave primaria, token y `created_at` nullable.
- `sessions`: id como clave primaria, `user_id` nullable con índice, IP, agente de usuario, payload y `last_activity` con índice.
- `cache` y `cache_locks`: claves, valores/propietarios y expiraciones para el driver de caché de base de datos.
- `jobs`, `job_batches` y `failed_jobs`: estructuras estándar del driver de colas de base de datos.

No hay migraciones para datos específicos de negocio ni se definen relaciones Eloquent de dominio.

## Modelo y datos semilla

`App\Models\User` corresponde a `users`. `UserFactory` genera nombre, correo único, marca de verificación, contraseña hasheada y token de recuerdo; su estado `unverified()` elimina la marca de verificación.

`DemoUserSeeder` crea o actualiza el usuario demo con nombre `Usuario Demo`, correo definido por `DEMO_USER_EMAIL` y contraseña hasheada desde `DEMO_USER_PASSWORD`. `DatabaseSeeder` lo ejecuta solo cuando ambas variables están configuradas. Los valores no están fijados en el código; el archivo `.env.example` proporciona `demo@example.test` para el correo y deja la contraseña vacía.

## Pruebas

`phpunit.xml` configura `DB_CONNECTION=sqlite` y `DB_DATABASE=:memory:` para tests. No se detectaron pruebas de integración de esquema específicas más allá del test Feature de la página inicial.
