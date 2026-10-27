---
name: code-review
description: "Use when asked to review, audit, inspect, or assess a code change, diff, or pull request in this project."
---

# Revisión de cambios

- Lee `AGENTS.md`; después inspecciona el diff solicitado y solo el código y documento `/docs` directamente relacionados.
- Prioriza defectos concretos: comportamiento incorrecto, regresiones, límites de autenticación/autorización existentes, datos/esquema, errores de integración y pruebas insuficientes para el cambio.
- Comprueba si la documentación afectada quedó desactualizada y si se exponen secretos o artefactos locales.
- No propongas arquitectura, dependencias ni flujos que no estén sustentados por el repositorio.
- Devuelve primero los hallazgos, ordenados por severidad, con archivo y línea; separa observaciones de sugerencias. Si no hay hallazgos, indícalo y resume verificaciones faltantes.
- Una revisión no modifica archivos; implementa arreglos únicamente si el usuario también lo solicita.
