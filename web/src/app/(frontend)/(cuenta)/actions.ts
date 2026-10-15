'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  AuthenticationError,
  createLocalReq,
  LockedAuth,
  logoutOperation,
  UnverifiedEmail,
  ValidationError,
} from 'payload'
import { z } from 'zod'

import { clearSessionCookie, getPayloadClient, setSessionCookie } from '@/lib/auth'
import { safeNext } from '@/lib/safe-redirect'

export type FormState = {
  ok?: boolean
  message?: string
  errors?: Record<string, string>
  /** Lo que escribió el usuario (nunca contraseñas), para no vaciar el formulario ante un error. */
  values?: Record<string, string>
}

const SECRETOS = new Set(['password', 'confirmar', 'token'])

const valores = (form: FormData): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const [key, value] of form.entries()) {
    // Las claves que empiezan con $ son internas de React (id de la acción).
    if (typeof value === 'string' && !SECRETOS.has(key) && !key.startsWith('$')) out[key] = value
  }
  return out
}

const fieldErrors = (error: z.ZodError): Record<string, string> =>
  Object.fromEntries(error.issues.map((i) => [String(i.path[0]), i.message]))

const invalid = (error: z.ZodError, form: FormData): FormState => ({
  errors: fieldErrors(error),
  values: valores(form),
})

const email = z.string().trim().toLowerCase().email('Ingresá un correo válido').max(120)
const password = z.string().min(8, 'Mínimo 8 caracteres').max(128, 'Máximo 128 caracteres')
const telefono = z
  .string()
  .trim()
  .regex(/^[\d\s()+-]{0,30}$/, 'Solo números')
  .optional()

const registroSchema = z
  .object({
    nombre: z.string().trim().min(2, 'Ingresá tu nombre').max(60),
    apellido: z.string().trim().max(60).optional(),
    email,
    telefono,
    password,
    confirmar: z.string(),
  })
  .refine((d) => d.password === d.confirmar, {
    path: ['confirmar'],
    message: 'Las contraseñas no coinciden',
  })

export async function registrar(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = registroSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) return invalid(parsed.error, form)
  const { nombre, apellido } = parsed.data

  const payload = await getPayloadClient()
  try {
    await payload.create({
      collection: 'customers',
      // Lista cerrada de campos: el alta pública nunca toca _verified, googleId, etc.
      data: {
        nombre,
        apellido: apellido || undefined,
        telefono: parsed.data.telefono || undefined,
        email: parsed.data.email,
        password: parsed.data.password,
      },
      overrideAccess: true,
    })
  } catch (err) {
    if (err instanceof ValidationError && err.data.errors.some((e) => e.path === 'email')) {
      return { errors: { email: 'Ya existe una cuenta con ese correo' }, values: valores(form) }
    }
    payload.logger.error({ err }, 'registro de cliente')
    return {
      message: 'No pudimos crear la cuenta. Probá de nuevo en unos minutos.',
      values: valores(form),
    }
  }

  return { ok: true, message: parsed.data.email }
}

const loginSchema = z.object({ email, password: z.string().min(1, 'Ingresá tu contraseña') })

export async function ingresar(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) return invalid(parsed.error, form)

  const payload = await getPayloadClient()
  const fallo = (message: string): FormState => ({ message, values: valores(form) })
  try {
    const { token } = await payload.login({ collection: 'customers', data: parsed.data })
    if (!token) throw new AuthenticationError()
    await setSessionCookie(token)
  } catch (err) {
    if (err instanceof UnverifiedEmail) {
      return fallo('Todavía no confirmaste tu correo. Revisá tu bandeja de entrada.')
    }
    if (err instanceof LockedAuth) {
      return fallo('Cuenta bloqueada por intentos fallidos. Probá en 15 minutos.')
    }
    if (err instanceof AuthenticationError) return fallo('Correo o contraseña incorrectos.')
    payload.logger.error({ err }, 'login de cliente')
    return fallo('No pudimos iniciar sesión. Probá de nuevo.')
  }

  redirect(safeNext(form.get('next')))
}

export async function salir() {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (user?.collection === 'customers') {
    const req = await createLocalReq({ user }, payload)
    await logoutOperation({ collection: payload.collections.customers, req }).catch(() => {})
  }
  await clearSessionCookie()
  redirect('/')
}

export async function recuperar(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = z.object({ email }).safeParse(Object.fromEntries(form))
  if (!parsed.success) return invalid(parsed.error, form)

  const payload = await getPayloadClient()
  try {
    await payload.forgotPassword({ collection: 'customers', data: parsed.data })
  } catch (err) {
    payload.logger.error({ err }, 'recuperar contraseña')
  }
  // Misma respuesta exista o no la cuenta: no revelamos qué correos están registrados.
  return { ok: true }
}

const restablecerSchema = z
  .object({ token: z.string().min(1), password, confirmar: z.string() })
  .refine((d) => d.password === d.confirmar, {
    path: ['confirmar'],
    message: 'Las contraseñas no coinciden',
  })

export async function restablecer(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = restablecerSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) return invalid(parsed.error, form)

  const payload = await getPayloadClient()
  try {
    const { token } = await payload.resetPassword({
      collection: 'customers',
      data: { token: parsed.data.token, password: parsed.data.password },
      overrideAccess: true,
    })
    if (token) await setSessionCookie(token)
  } catch {
    return { message: 'El enlace no es válido o venció. Pedí uno nuevo.' }
  }
  redirect('/cuenta')
}

const perfilSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresá tu nombre').max(60),
  apellido: z.string().trim().max(60).optional(),
  telefono,
})

export async function actualizarPerfil(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = perfilSchema.safeParse(Object.fromEntries(form))
  if (!parsed.success) return invalid(parsed.error, form)

  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (user?.collection !== 'customers') redirect('/ingresar')

  await payload.update({
    collection: 'customers',
    id: user.id,
    data: {
      nombre: parsed.data.nombre,
      apellido: parsed.data.apellido || null,
      telefono: parsed.data.telefono || null,
    },
    user,
    overrideAccess: false,
  })
  return { ok: true, message: 'Datos guardados', values: valores(form) }
}
