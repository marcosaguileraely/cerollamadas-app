/**
 * This file may contain code that uses generative AI for code assistance, unit testing and/or entire functions.
 * The generative model(s) used may be a combination of GitHub Copilot, OpenAI ChatGPT or others.
 *
 * LEGAL COPY — DO NOT AUTO-MODIFY.
 */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const LegalDisclaimer = () => {
  return (
    <Alert variant="default" className="border-muted-foreground/30" data-testid="legal-disclaimer">
      <AlertTitle>Aviso legal</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          CeroLlamadas actúa únicamente como canal de facilitación. No almacenamos sus datos personales ni actuamos como intermediarios una vez enviada la solicitud. Toda comunicación posterior es exclusivamente entre usted y cada entidad destinataria.
        </p>
        <p className="mb-2">
          No brindamos asesoría jurídica ni representación legal. La legitimidad de su solicitud se fundamenta en el derecho de Habeas Data en Colombia (Ley 1266 de 2008 y Ley 1581 de 2012).
        </p>
        <p>
          Al confirmar el envío, usted asume la responsabilidad de la comunicación con las empresas seleccionadas.
        </p>
      </AlertDescription>
    </Alert>
  )
}

export { LegalDisclaimer }
