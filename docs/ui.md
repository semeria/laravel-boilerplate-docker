# Interfaz de usuario

**Resumen:** La interfaz React/Inertia incluye una portada de estado, un formulario de inicio de sesión y un dashboard de prueba protegido, estilizados con Tailwind CSS.

## Índice
- [Punto de entrada](#punto-de-entrada)
- [Páginas](#páginas)
- [Estilos y compilación](#estilos-y-compilación)
- [Componentes del dashboard](#componentes-del-dashboard)

## Punto de entrada

`resources/views/app.blade.php` define el HTML raíz con `@inertia`, `@inertiaHead`, `@viteReactRefresh` y las entradas `resources/css/app.css` y `resources/js/app.jsx`. La entrada React usa `createInertiaApp` y `createRoot` de React DOM.

El resolver de `resources/js/app.jsx` busca `resources/js/Pages/${name}.jsx` con glob sensible a mayúsculas/minúsculas y lanza error si no encuentra la página.

## Páginas

- `resources/js/Pages/Home.jsx`: portada de estado con Laravel/PHP y estado de Vite.
- `resources/js/Pages/Auth/Login.jsx`: formulario email/contraseña con opción de recordar, errores de validación y estado de envío, gestionado con `useForm` de Inertia.
- `resources/js/Pages/Dashboard.jsx`: compone el dashboard financiero de demostración, recibe el usuario autenticado y las versiones del entorno, filtra movimientos en memoria y conserva el logout real.
- `resources/js/Pages/Profile/Edit.jsx`: permite actualizar el nombre y cambiar la contraseña; muestra el correo como solo lectura.

Las páginas usan `Head` de Inertia para el título. El dashboard recibe solo nombre y correo del usuario autenticado. Sus balances, metas y movimientos son datos ficticios, se identifican como escenario de muestra y no se guardan en la base de datos.

## Estilos y compilación

`resources/css/app.css` importa Tailwind CSS, define Inter como fuente sans global y registra como fuentes los archivos Blade y JS/JSX. La vista raíz `resources/views/app.blade.php` carga Inter desde Google Fonts con `display=swap` y preconexión. La paleta `brand` usa el morado del referente Semeria y `AppBrand` comparte el wordmark “Semeria BP.” entre páginas. `vite.config.js` registra el plugin Laravel Vite, React y Tailwind Vite. GSAP anima la entrada de secciones, las barras del dashboard y el plegado del sidebar. Las animaciones respetan movimiento reducido. Los iconos de React se importan desde Lucide React mediante el adaptador local `Icon.jsx`.

## Componentes del dashboard

Los widgets exclusivos viven en `resources/js/Pages/Dashboard/Components/`: `DashboardHeader`, `DashboardFooter`, `BalanceOverview`, `SummaryMetrics`, `BudgetProgress`, `InsightCard`, `SavingsGoals` y `TransactionHistory`. `resources/js/Layouts/DashboardLayout.jsx` comparte la cabecera, el sidebar responsive y el footer entre el dashboard y el perfil. La cabecera ofrece un menú de cuenta con enlace al perfil y cierre de sesión activo, además de los controles de navegación responsive. El sidebar de escritorio se puede plegar a iconos y expandir desde la cabecera; en móvil se abre como panel lateral con cierre por botón, fondo, tecla Escape y selección de enlace. El sidebar vive en `resources/js/Pages/Dashboard/Components/Sidebar/`; sus piezas (`DashboardSidebar`, `MobileDashboardNav`, `SidebarBrand`, `SidebarNav`, `SidebarNavItem` y `SidebarDemoNotice`) están agrupadas con su configuración. Los datos y formatos están en `Pages/Dashboard/data/`, y los hooks GSAP en `Pages/Dashboard/hooks/`. `DashboardFooter` recibe las versiones de Laravel y PHP como props. La sección Apariencia del perfil guarda tema de día, noche o automático. Los estilos del modo oscuro se definen globalmente en `resources/css/app.css`; el layout escucha cambios del sistema cuando está activa la opción automática.

Los datos de ejemplo se mantienen aparte en `resources/js/Pages/Dashboard/data/dashboardDemo.js` y se presentan con formatos de moneda de `formatters.js`. El dashboard muestra métricas, balance semanal, presupuesto, metas y movimientos de ejemplo. Las gráficas decorativas estáticas se retiraron; el gráfico de balance y las barras de progreso se animan con GSAP.
