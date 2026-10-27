# Arquitectura

**Resumen:** La aplicación sigue el patrón Laravel como servidor web y backend, con Inertia conectando sus respuestas a páginas React; Vite compila y sirve los assets del frontend.

## Índice
- [Vista general](#vista-general)
- [Componentes y responsabilidades](#componentes-y-responsabilidades)
- [Flujo de una petición de página](#flujo-de-una-petición-de-página)
- [Módulos funcionales](#módulos-funcionales)

## Vista general

La ruta web Laravel genera una respuesta Inertia con nombre de página y props. La aplicación cliente React resuelve el nombre contra `resources/js/Pages/**/*.jsx`, excluyendo los JSX bajo carpetas locales `Components/` para que no se registren como páginas. La plantilla Blade `resources/views/app.blade.php` es la vista raíz y carga CSS y JavaScript mediante Laravel Vite.

## Componentes y responsabilidades

- `public/index.php`: recibe la petición HTTP y la entrega a la aplicación Laravel.
- `bootstrap/app.php`: registra rutas web y de consola, health check `/up` y middleware `HandleInertiaRequests` en el grupo web.
- `routes/web.php`: declara la redirección raíz, login/logout, el dashboard y las rutas protegidas para editar perfil y contraseña.
- `app/Http/Controllers/Auth/AuthenticatedSessionController.php`: presenta el login, valida credenciales, inicia la sesión y gestiona el logout.
- `app/Http/Controllers/ProfileController.php`: comparte los datos públicos del usuario y actualiza de forma acotada su nombre o contraseña.
- `app/Http/Middleware/HandleInertiaRequests.php`: usa la vista raíz `app` y mantiene el mecanismo de props compartidas heredado de Inertia, sin props adicionales propias.
- `resources/js/app.jsx`: inicia `createInertiaApp`, resuelve páginas `.jsx` por nombre y monta React en el elemento recibido.
- `resources/js/Pages/`: contiene las páginas de entrada Inertia (`Home.jsx`, `Auth/Login.jsx`, `Dashboard.jsx` y `Profile/Edit.jsx`). Los nombres y mayúsculas coinciden con `Inertia::render()` y el resolver actual.
- `resources/js/Layouts/DashboardLayout.jsx`: comparte el shell autenticado, la navegación, cabecera y footer entre dashboard y perfil.
- `resources/js/Pages/Dashboard/`: agrupa componentes, datos, formatos y hook que solo usa el dashboard; la página de entrada sigue siendo `Pages/Dashboard.jsx`.
- `resources/js/Components/`: se reserva para componentes compartidos entre páginas. No hay componentes globales actualmente porque los widgets existentes pertenecen al dashboard.
- `resources/js/hooks/` y `resources/js/data/`: se reservan para hooks y datos compartidos; la lógica de animación y los datos de muestra están junto al módulo Dashboard.
- `resources/views/app.blade.php`: documento HTML anfitrión de Inertia y los assets.
- `resources/css/app.css`: importa Tailwind CSS y declara las fuentes de clases Blade y JavaScript/JSX.

## Flujo de una petición de página

1. Nginx dirige la petición PHP al servicio PHP-FPM `app`.
2. Laravel resuelve la ruta definida en `routes/web.php` y sus middleware `guest` o `auth`.
3. Un visitante que inicia sesión envía credenciales al controlador; tras autenticarlo, Laravel regenera su sesión y lo redirige a `/dashboard`.
4. La ruta protegida renderiza `Dashboard` mediante Inertia con los datos públicos del usuario y las versiones de Laravel/PHP.
5. El cliente Inertia resuelve la página JSX y React la monta dentro de la vista raíz Blade.

## Organización del frontend

El proyecto conserva las carpetas `Pages/` y `Components/` con mayúsculas porque el resolver de `app.jsx` las usa literalmente y distingue mayúsculas en sus claves. Las páginas que Laravel devuelve por Inertia se mantienen como entradas en `Pages/`; los componentes, hooks y datos exclusivos se agrupan en una carpeta del módulo junto a la página. El resolver excluye componentes locales para cargar solo las páginas. Solo los componentes compartidos por más de una página van a `resources/js/Components/`. El layout autenticado compartido vive en `resources/js/Layouts/`; no hay configuración de TypeScript o aliases.

## Módulos funcionales

No se detectan módulos de negocio. Se implementaron autenticación por sesión y un dashboard de prueba; el modelo `User` se usa para autenticar usuarios.
