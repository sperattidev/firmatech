# Firmatech

Tienda y servicio técnico (celulares, computadoras, tablets) de Firmat, Santa Fe, con seguimiento online de reparaciones. Dominio: **firmatech.com.ar**.

## Stack

| Capa | Tecnología |
|---|---|
| Web + API | Next.js 16 (App Router) + TypeScript estricto |
| Backend / panel | Payload CMS 3 (corre dentro de Next.js, panel en `/admin`) |
| Base de datos | PostgreSQL 17 |
| Estilos | Tailwind CSS 4, tipografías IBM Plex Sans / Plex Mono |
| Correo | Resend (verificación de cuenta y recuperar contraseña) |
| Login de clientes | Email + contraseña, Google (OAuth con `arctic`) |
| Infra | Docker Compose + Cloudflare Tunnel en el VPS (aislado de Sperway) |
| Calidad | ESLint, Vitest (unit + integración), Playwright (e2e), GitHub Actions |

## Estructura

```
web/                  Aplicación (Next.js + Payload)
  src/access/         Reglas de acceso y roles
  src/collections/    Users (personal), Customers (clientes), Media
  src/globals/        Datos del negocio (WhatsApp, horarios…)
  src/app/(frontend)/ Sitio público y cuenta del cliente
  src/app/(payload)/  Panel de administración y API REST (generado por Payload)
  src/migrations/     Migraciones de base (se aplican solas en producción)
  tests/              unit/, int/ (requiere Postgres), e2e/ (Playwright)
deploy/
  docker-compose.dev.yml   Postgres local para desarrollo
  docker-compose.yml       Producción: web + db + túnel, sin puertos expuestos
.github/workflows/ci.yml   Lint, tipos, tests, build e imagen Docker
```

## Usuarios y permisos

- **Personal** (`users`): único tipo que entra al panel. Roles: `admin` (todo), `tecnico` (reparaciones), `vendedor` (tienda y pedidos). Solo un admin crea usuarios y asigna roles.
- **Clientes** (`customers`): cuenta en la web, con verificación de correo obligatoria. No pueden entrar al panel y solo ven sus propios datos. El alta pública pasa por la acción de registro, nunca por REST.

## Desarrollo

Requisitos: Node 22.12+ (recomendado 24), pnpm, Docker Desktop.

```bash
cd web
cp .env.example .env          # completar PAYLOAD_SECRET
pnpm install
pnpm db:up                    # Postgres en 127.0.0.1:5433
pnpm dev                      # http://localhost:3000 · panel en /admin
```

La primera vez, `/admin` pide crear el usuario administrador. Sin `RESEND_API_KEY`, los correos no se envían: se imprimen en la consola del servidor con sus enlaces.

En Windows, si `next dev` sirve código viejo después de editar, frenalo, borrá `web/.next` y volvé a levantarlo.

### Comandos

| Comando | Qué hace |
|---|---|
| `pnpm lint` / `pnpm typecheck` | Lint y chequeo de tipos |
| `pnpm test:unit` | Tests sin base de datos |
| `pnpm test:int` | Tests de acceso contra Postgres (`pnpm db:up`) |
| `pnpm test:e2e` | Playwright (levanta `pnpm dev` si no está corriendo) |
| `pnpm build` | Build de producción |
| `pnpm payload migrate:create <nombre>` | Nueva migración después de cambiar colecciones |
| `pnpm generate:types` | Regenera `src/payload-types.ts` |

**Regla:** todo cambio de colecciones o campos lleva su migración (`migrate:create`) en el mismo commit. En desarrollo el esquema se sincroniza solo; en producción solo se aplican migraciones.

## Login con Google

1. Google Cloud Console → APIs y servicios → Credenciales → ID de cliente OAuth (Aplicación web).
2. URI de redirección autorizada: `https://firmatech.com.ar/auth/google/callback` (y `http://localhost:3000/auth/google/callback` para desarrollo).
3. Cargar `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`. Sin estas variables el botón no se muestra.

Si el correo de Google ya tiene una cuenta, se vinculan; si no, se crea una cuenta verificada.

## Producción

La imagen se construye en la PC y se carga en el VPS: el VPS nunca compila.

```bash
docker build -t firmatech-web:<version> web
```

En el VPS (`/opt/firmatech/deploy`): `.env` (versión, contraseña de Postgres, token del túnel) y `.env.production` (secretos de la app), ambos con permisos 600. Ver los `*.example`.

- Sin puertos publicados: el único acceso es el contenedor `cloudflared`.
- Red, volúmenes y proyecto propios (`firmatech`): no comparte nada con Sperway.
- Límites de memoria por contenedor para no afectar al resto del VPS.
- Healthcheck en `/api/salud` (verifica la conexión a la base).
- Al arrancar, la web aplica las migraciones pendientes.

## Fases

1. ✅ **Base**: proyecto, panel, roles, cuentas de clientes, diseño, Docker, CI.
2. **Reparaciones**: turnos web, órdenes, estados, seguimiento por código/QR.
3. **Tienda**: catálogo, unidades por IMEI, Mercado Pago, retiro y envío zonal.
4. **ARCA**: factura C automática.
5. **Producción**: túnel, backups automáticos, retiro de la versión anterior.
