/**
 * This file may contain code that uses generative AI for code assistance, unit testing and/or entire functions.
 * The generative model(s) used may be a combination of GitHub Copilot, OpenAI ChatGPT or others.
 */

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { buildEmailBody } from '@/lib/emailTemplate'
import { getCompaniesForCountry } from '@/lib/companies'

const EmailPreview = ({ formData }) => {
  const body = buildEmailBody(formData || {})
  const companies = getCompaniesForCountry('co').filter((c) =>
    (formData?.companyIds || []).includes(c.name)
  )

  return (
    <Card data-testid="email-preview">
      <CardHeader>
        <h2 className="text-lg font-semibold">Vista previa del correo</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-1">
          <p>
            <span className="font-medium text-muted-foreground">De:</span>{' '}
            notificaciones@cerollamadas.co
          </p>
          <p>
            <span className="font-medium text-muted-foreground">Reply-To:</span>{' '}
            {formData?.email || '—'}
          </p>
          {formData?.cc && (
            <p>
              <span className="font-medium text-muted-foreground">CC:</span>{' '}
              {formData.cc}
            </p>
          )}
          <p>
            <span className="font-medium text-muted-foreground">Para:</span>{' '}
            {companies.map((c) => c.name).join(', ')}
          </p>
        </div>
        <div className="rounded border bg-muted/30 p-4 text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
          {body}
        </div>
      </CardContent>
    </Card>
  )
}

export { EmailPreview }
