import Head from 'next/head'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const Educacion = () => {
  return (
    <>
      <Head>
        <title>Habeas Data — CeroLlamadas</title>
        <meta name="description" content="Conoce tu derecho de Habeas Data en Colombia y cómo solicitar el cese de comunicaciones." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen p-4 md:p-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
              ¿Qué es el Habeas Data?
            </h1>
            <p className="text-muted-foreground">
              Tu derecho a conocer, actualizar y rectificar la información que las empresas tienen sobre ti, y a solicitar que dejen de usarla para comunicaciones no deseadas.
            </p>
          </header>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Derechos que te asisten</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                En Colombia, la Ley 1266 de 2008 y la Ley 1581 de 2012 reconocen el derecho de Habeas Data. Esto te permite, entre otras cosas, solicitar a las empresas que dejen de enviarte llamadas, mensajes o correos con fines comerciales o de cobro cuando así lo decidas.
              </p>
              <p className="text-muted-foreground">
                Las empresas deben contar con canales oficiales de atención para estas solicitudes. Enviar tu petición por esos canales da fuerza y trazabilidad a tu solicitud.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Cómo te ayudamos</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                CeroLlamadas te permite redactar una solicitud formal y enviarla directamente a los canales oficiales de tratamiento de datos de las empresas que elijas. Nosotros no guardamos tus datos ni actuamos como intermediarios después del envío: la relación queda entre tú y la entidad.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link
              href="/formulario"
              className={buttonVariants.default}
              data-testid="btn-continuar-formulario"
            >
              Continuar al formulario
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Educacion
