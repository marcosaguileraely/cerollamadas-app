import { getCompaniesForCountry, MAX_SELECTION } from '@/lib/companies'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const CompanySelector = ({ selectedIds = [], onChange, country = 'co' }) => {
  const list = getCompaniesForCountry(country)

  const handleToggle = (company) => {
    const id = company.name
    const isSelected = selectedIds.includes(id)
    if (isSelected) {
      onChange(selectedIds.filter((i) => i !== id))
    } else if (selectedIds.length < MAX_SELECTION) {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div className="space-y-3" data-testid="company-selector">
      <Label id="company-selector-label">
        Empresas (máximo {MAX_SELECTION})
      </Label>
      <div
        className="border rounded-md divide-y max-h-60 overflow-y-auto"
        role="group"
        aria-labelledby="company-selector-label"
      >
        {list.map((company) => {
          const isSelected = selectedIds.includes(company.name)
          const disabled =
            !isSelected && selectedIds.length >= MAX_SELECTION

          return (
            <label
              key={company.name}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <Checkbox
                id={`checkbox-company-${company.name}`}
                checked={isSelected}
                onChange={() => handleToggle(company)}
                disabled={disabled}
                aria-label={`Seleccionar ${company.name}`}
              />
              <div className="flex-1 min-w-0">
                <span className="font-medium">{company.name}</span>
                <span className="text-muted-foreground text-sm block truncate">
                  {company.description}
                </span>
              </div>
            </label>
          )
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {selectedIds.length} de {MAX_SELECTION} seleccionadas
      </p>
    </div>
  )
}

export { CompanySelector }
