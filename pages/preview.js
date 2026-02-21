import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { EmailPreview } from '@/components/EmailPreview'
import { LegalDisclaimer } from '@/components/LegalDisclaimer'
import { FORM_STORAGE_KEY } from './formulario'

const getFunctionUrl = () => {
  if (typeof window === 'undefined') return ''
  const base = window.location.origin
  return `${base}/.netlify/functions/send-emails`
}

const Preview = () => {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem(FORM_STORAGE_KEY) : null
    if (!raw) {
      router.replace('/formulario')
      return
    }
    try {
      setFormData(JSON.parse(raw))
    } catch {
      router.replace('/formulario')
    }
  }, [router])

  const handleConfirm = async () => {
    if (!formData) return
    setSending(true)
    setResult(null)

    try {
      const url = getFunctionUrl()
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))
      setResult({ ok: res.ok, status: res.status, data })
      if (res.ok) {
        sessionStorage.removeItem(FORM_STORAGE_KEY)
      }
    } catch (err) {
      setResult({ ok: false, error: err.message })
    } finally {
      setSending(false)
    }
  }

  if (formData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Vista previa — CeroLlamadas</title>
        <meta name="description" content="Revise su solicitud antes de enviar." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen p-4 md:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <header>
            <h1 className="text-2xl font-semibold">Confirmar envío</h1>
            <p className="text-muted-foreground mt-1">
              Revise el contenido y el aviso legal antes de enviar.
            </p>
          </header>

          <LegalDisclaimer />

          <EmailPreview formData={formData} />

          {result && (
            <div
              className={`rounded-lg border p-4 ${result.ok ? 'border-green-500/50 bg-green-500/10' : 'border-destructive/50 bg-destructive/10'}`}
              role="alert"
            >
              {result.ok ? (
                <p>
                  Solicitud enviada. Las empresas recibirán su correo. Toda comunicación posterior es entre usted y cada entidad.
                </p>
              ) : (
                <p>
                  Error al enviar: {result.error || result.data?.message || `Estado ${result.status}`}
                </p>
              )}
            </div>
          )}

          {!result?.ok && (
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={sending}
              data-testid="btn-confirm-send"
            >
              {sending ? 'Enviando...' : 'Confirmar y enviar'}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Preview
