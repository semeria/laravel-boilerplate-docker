---
name: testing
description: "Use when adding, changing, debugging, or running PHPUnit/Laravel tests or verifying frontend builds in this Laravel + Inertia project."
---

# Verificación de cambios

- Lee `AGENTS.md` y solo el documento pertinente: `/docs/project.md` para scripts, `/docs/database.md` para persistencia de pruebas o `/docs/auth.md` para comportamiento de autenticación.
- Inspecciona el código y las pruebas cercanas antes de elegir `tests/Feature` o `tests/Unit`; sigue el estilo PHPUnit existente.
- `phpunit.xml` configura SQLite en memoria. Mantén las pruebas de base de datos aisladas y usa los factories existentes cuando correspondan.
- Ejecuta pruebas dentro del contenedor: `docker compose exec app php artisan test`. Para un caso concreto, usa `--filter=<nombre>`.
- Si cambió el frontend, comprueba también con `docker compose exec node npm run build`.
- No borres ni reinicies volúmenes para preparar pruebas. Informa qué comandos se ejecutaron y sus resultados.
