# Autenticación y autorización

**Resumen:** La autenticación usa el guard web de Laravel con sesiones. Los usuarios pueden iniciar sesión en `/login`; el dashboard está protegido y el logout invalida la sesión. No hay registro público ni roles.

## Índice
- [Configuración](#configuración)
- [Rutas y flujo](#rutas-y-flujo)
- [Seguridad aplicada](#seguridad-aplicada)
- [Modelo de usuario](#modelo-de-usuario)
- [Pendientes](#pendientes)

## Configuración

`config/auth.php` configura `web` como guard predeterminado (salvo override de entorno), driver `session` y proveedor Eloquent `users` con modelo `App\Models\User`. También define opciones de password broker para `users` y la tabla `password_reset_tokens`.

La implementación es propia y utiliza las capacidades incluidas en Laravel; no se añadió un starter kit de autenticación.

## Rutas y flujo

- `GET /login`: muestra `Auth/Login` y está bajo middleware `guest`.
- `POST /login`: valida email, contraseña y opción `remember`; limita intentos a seis por minuto.
- `GET /dashboard`: exige middleware `auth`; al renderizar solo comparte `name` y `email` del usuario.
- `GET /profile`: exige autenticación y presenta los datos públicos del usuario, sin exponer contraseña ni campos internos.
- `PATCH /profile`: actualiza únicamente el nombre; el correo permanece de solo lectura.
- `PATCH /profile/password`: exige la contraseña actual, una contraseña nueva de al menos ocho caracteres y su confirmación.
- `PATCH /profile/appearance`: guarda la preferencia `light`, `dark` o `system` del usuario autenticado.
- `POST /logout`: exige autenticación, cierra la sesión y redirige a `/login`.
- `GET /`: redirige al dashboard; un visitante sin sesión es redirigido a login por la protección de la ruta dashboard.

El controlador `AuthenticatedSessionController` autentica con `Auth::attempt`. Tras el éxito regenera la sesión y redirige a la URL prevista o al dashboard. Credenciales incorrectas devuelven error asociado al campo email.

## Seguridad aplicada

- Contraseña validada en servidor y comparada por el proveedor Eloquent con el hash almacenado.
- Regeneración del identificador de sesión al autenticarse.
- Logout con `Auth::logout`, invalidación de sesión y regeneración del token CSRF.
- Throttle en la ruta POST de login.
- El perfil permite asignar solo el nombre. El cambio de contraseña verifica la credencial actual y guarda mediante el cast `hashed` del modelo.
- La preferencia visual se valida contra una lista cerrada y se comparte mediante Inertia; no contiene datos sensibles.
- Rutas protegidas con el middleware `auth`; rutas de login agrupadas con `guest`.

No hay registro público, recuperación de contraseña, verificación de correo, roles ni permisos de negocio.

## Modelo de usuario

`App\Models\User` extiende el modelo autenticable de Laravel, usa `HasFactory` y `Notifiable`. Declara `name`, `email` y `password` como asignables; oculta `password` y `remember_token`; convierte `email_verified_at` a fecha y aplica el cast `hashed` a `password`.

## Pendientes

Política de autorización y gestión de cuentas de producción: **Pendiente de documentar**.
