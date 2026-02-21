import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CompanySelector } from '@/components/CompanySelector'
import TurnstileWidget from '@/components/TurnstileWidget'

import Head from 'next/head'

const FORM_STORAGE_KEY = 'cerollamadas_form_data'

const ID_TYPE_OPTIONS = [
  { value: 'CC', label: 'Cédula de Ciudadanía' },
  { value: 'PS', label: 'Pasaporte' },
  { value: 'CE', label: 'Cédula de Extranjería' },
]

const initialForm = {
  fullName: '',
  idType: 'CC',
  idNumber: '',
  email: '',
  phone: '',
  address: '',
  companyIds: [],
  cc: '',
  sendAllChannels: true,
}

const Formulario = () => {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [turnstileToken, setTurnstileToken] = useState(null)
  const [errors, setErrors] = useState({})

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  const validate = () => {
    const next = {}
    if (!form.fullName?.trim()) next.fullName = 'Requerido'
    const validIdTypes = ['CC', 'PS', 'CE']
    if (!form.idType || !validIdTypes.includes(form.idType)) next.idType = 'Requerido'
    if (!form.idNumber?.trim()) next.idNumber = 'Requerido'
    if (!form.email?.trim()) next.email = 'Requerido'
    if (!form.phone?.trim()) next.phone = 'Requerido'
    if (!form.address?.trim()) next.address = 'Requerido'
    if (!form.sendAllChannels) next.sendAllChannels = 'Debe aceptar enviar a todos los canales oficiales'
    if (form.companyIds.length === 0) next.companyIds = 'Seleccione al menos una empresa'
    if (!turnstileToken) next.turnstile = 'Complete la verificación'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    /* if (!turnstileToken) {
      alert("Por favor verifica que eres humano.");
      return;
    }

    alert("Formulario enviado correctamente.");
    return; */

    if (!validate()) return

    const payload = {
      ...form,
      turnstileToken,
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(payload))
    }
    router.push('/preview')
  }

  return (
    <>
      <Head>
        <title>Formulario — CeroLlamadas</title>
        <meta name="description" content="Complete sus datos y seleccione las empresas para ejercer su derecho de Habeas Data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen p-4 md:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold">Solicitud de cese de comunicaciones</h1>
            <p className="text-muted-foreground mt-1">
              Complete los datos. Las empresas recibirán su solicitud en sus canales oficiales.
            </p>
          </header>

          <form onSubmit={handleSubmit} data-testid="form-habeas-data" className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Datos personales</h2>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input-full-name">Nombre completo</Label>
                  <Input
                    id="input-full-name"
                    data-testid="input-full-name"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-type-document">Tipo de documento</Label>
                  <select
                    id="input-type-document"
                    data-testid="input-type-document"
                    value={form.idType}
                    onChange={(e) => update('idType', e.target.value)}
                    aria-required="true"
                    aria-invalid={!!errors.idType}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {ID_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.idType && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.idType}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-id-number">Número de documento</Label>
                  <Input
                    id="input-id-number"
                    data-testid="input-id-number"
                    value={form.idNumber}
                    onChange={(e) => update('idNumber', e.target.value)}
                    placeholder="Cédula o documento de identidad"
                    aria-required="true"
                    aria-invalid={!!errors.idNumber}
                  />
                  {errors.idNumber && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.idNumber}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-email">Correo electrónico (Reply-To)</Label>
                  <Input
                    id="input-email"
                    type="email"
                    data-testid="input-email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="correo@ejemplo.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-phone">Teléfono</Label>
                  <Input
                    id="input-phone"
                    type="tel"
                    data-testid="input-phone"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="Ej. 300 123 4567"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-address">Dirección</Label>
                  <Input
                    id="input-address"
                    data-testid="input-address"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="Ciudad y dirección"
                    aria-required="true"
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-cc">CC (opcional)</Label>
                  <Input
                    id="input-cc"
                    type="email"
                    data-testid="input-cc"
                    value={form.cc}
                    onChange={(e) => update('cc', e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Empresas</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <CompanySelector
                  selectedIds={form.companyIds}
                  onChange={(ids) => update('companyIds', ids)}
                />
                {errors.companyIds && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.companyIds}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    id="checkbox-send-all-channels"
                    data-testid="checkbox-send-all-channels"
                    checked={form.sendAllChannels}
                    onChange={(e) => update('sendAllChannels', e.target.checked)}
                    aria-required="true"
                    aria-invalid={!!errors.sendAllChannels}
                  />
                  <span className="text-sm">
                    Enviar a todos los canales oficiales de tratamiento de datos
                  </span>
                </label>
                {errors.sendAllChannels && (
                  <p className="text-sm text-destructive mt-1" role="alert">
                    {errors.sendAllChannels}
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label>Verificación</Label>
              <TurnstileWidget
                onVerify={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
              />
              {errors.turnstile && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.turnstile}
                </p>
              )}
            </div>

            <Button type="submit" data-testid="btn-submit-form">
              Continuar a vista previa
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Formulario
export { FORM_STORAGE_KEY }
