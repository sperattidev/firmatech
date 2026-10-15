'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import {
  actualizarPerfil,
  ingresar,
  recuperar,
  registrar,
  restablecer,
  type FormState,
} from '@/app/(frontend)/(cuenta)/actions'
import { Button } from '@/components/ui/Button'
import { Field, FormMessage } from '@/components/ui/Field'

const initial: FormState = {}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(ingresar, initial)
  return (
    <form action={action} className="space-y-5" noValidate>
      {next && <input type="hidden" name="next" value={next} />}
      {state.message && <FormMessage>{state.message}</FormMessage>}
      <Field
        label="Correo"
        name="email"
        defaultValue={state.values?.email}
        type="email"
        autoComplete="email"
        required
        error={state.errors?.email}
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        error={state.errors?.password}
      />
      <div className="flex items-center justify-between gap-4">
        <Link href="/recuperar" className="text-sm font-medium text-muted hover:text-brand">
          Olvidé mi contraseña
        </Link>
        <Button type="submit" disabled={pending}>
          {pending ? 'Ingresando…' : 'Ingresar'}
        </Button>
      </div>
    </form>
  )
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registrar, initial)

  if (state.ok) {
    return (
      <div className="space-y-4" role="status">
        <p className="text-sm font-bold text-ok">Cuenta creada</p>
        <p className="text-ink">
          Te enviamos un correo a <strong>{state.message}</strong>.
        </p>
        <p className="text-sm text-muted">
          Abrí el enlace para confirmar tu cuenta y después ingresá. Si no lo ves, revisá spam.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {state.message && <FormMessage>{state.message}</FormMessage>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre"
          name="nombre"
          defaultValue={state.values?.nombre}
          autoComplete="given-name"
          required
          error={state.errors?.nombre}
        />
        <Field
          label="Apellido"
          name="apellido"
          defaultValue={state.values?.apellido}
          autoComplete="family-name"
          error={state.errors?.apellido}
        />
      </div>
      <Field
        label="Correo"
        name="email"
        defaultValue={state.values?.email}
        type="email"
        autoComplete="email"
        required
        error={state.errors?.email}
      />
      <Field
        label="Teléfono"
        name="telefono"
        defaultValue={state.values?.telefono}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="3465 123456"
        hint="Opcional. Lo usamos para coordinar tu reparación."
        error={state.errors?.telefono}
      />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="Mínimo 8 caracteres."
        error={state.errors?.password}
      />
      <Field
        label="Repetir contraseña"
        name="confirmar"
        type="password"
        autoComplete="new-password"
        required
        error={state.errors?.confirmar}
      />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Creando cuenta…' : 'Crear cuenta'}
      </Button>
    </form>
  )
}

export function ForgotForm() {
  const [state, action, pending] = useActionState(recuperar, initial)
  if (state.ok) {
    return (
      <FormMessage tone="ok">
        Si el correo está registrado, vas a recibir un enlace para elegir una nueva contraseña.
        Vence en 1 hora.
      </FormMessage>
    )
  }
  return (
    <form action={action} className="space-y-5" noValidate>
      <Field
        label="Correo"
        name="email"
        defaultValue={state.values?.email}
        type="email"
        autoComplete="email"
        required
        error={state.errors?.email}
      />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Enviando…' : 'Enviar enlace'}
      </Button>
    </form>
  )
}

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(restablecer, initial)
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="token" value={token} />
      {state.message && <FormMessage>{state.message}</FormMessage>}
      <Field
        label="Nueva contraseña"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="Mínimo 8 caracteres."
        error={state.errors?.password}
      />
      <Field
        label="Repetir contraseña"
        name="confirmar"
        type="password"
        autoComplete="new-password"
        required
        error={state.errors?.confirmar}
      />
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Guardando…' : 'Guardar contraseña'}
      </Button>
    </form>
  )
}

export function ProfileForm({
  nombre,
  apellido,
  telefono,
}: {
  nombre: string
  apellido?: string | null
  telefono?: string | null
}) {
  const [state, action, pending] = useActionState(actualizarPerfil, initial)
  return (
    <form action={action} className="space-y-5" noValidate>
      {state.ok && <FormMessage tone="ok">{state.message}</FormMessage>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre"
          name="nombre"
          defaultValue={state.values?.nombre ?? nombre}
          required
          error={state.errors?.nombre}
        />
        <Field
          label="Apellido"
          name="apellido"
          defaultValue={state.values?.apellido ?? apellido ?? ''}
          error={state.errors?.apellido}
        />
      </div>
      <Field
        label="Teléfono"
        name="telefono"
        type="tel"
        inputMode="tel"
        defaultValue={state.values?.telefono ?? telefono ?? ''}
        error={state.errors?.telefono}
      />
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? 'Guardando…' : 'Guardar cambios'}
      </Button>
    </form>
  )
}
