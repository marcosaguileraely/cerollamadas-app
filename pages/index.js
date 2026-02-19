/**
 * This file may contain code that uses generative AI for code assistance, unit testing and/or entire functions.
 * The generative model(s) used may be a combination of GitHub Copilot, OpenAI ChatGPT or others.
 */

import Head from 'next/head'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const Landing = () => {
  return (
    <>
      <Head>
        <title>CeroLlamadas — Ejercer tu derecho de Habeas Data</title>
        <meta name="description" content="Solicita el cese de comunicaciones no deseadas. Plataforma de facilitación para ejercer tu derecho de Habeas Data en Colombia." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
              CeroLlamadas
            </h1>
            <p className="text-lg text-muted-foreground">
              Deja de recibir llamadas y mensajes no deseados. Ejerce tu derecho en Colombia.
            </p>
          </header>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Tu derecho, tu control</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Somos un canal de facilitación para que puedas solicitar a las empresas el cese de comunicaciones comerciales, basado en el derecho de Habeas Data en Colombia. Sin intermediarios después del envío: la comunicación es entre tú y la entidad.
              </p>
              <p className="text-sm text-muted-foreground">
                Privacidad primero: no almacenamos tus datos personales. Solo facilitamos el envío de tu solicitud a los canales oficiales de tratamiento de datos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Reconocido en la Ley 1266 de 2008 y la Ley 1581 de 2012. Legítimo y respaldado por el marco legal colombiano.
              </p>
              <Link
                href="/educacion"
                className={`${buttonVariants.default} w-full inline-block text-center`}
                data-testid="btn-ejercer-habeas-data"
              >
                Ejercer mi derecho de Habeas Data
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Landing
