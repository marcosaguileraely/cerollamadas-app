const alertVariants = {
  default: 'bg-background text-foreground',
  destructive:
    'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
}

const Alert = ({ className = '', variant = 'default', ...props }) => (
  <div
    role="alert"
    className={`relative w-full rounded-lg border p-4 ${alertVariants[variant] || alertVariants.default} ${className}`.trim()}
    {...props}
  />
)

const AlertTitle = ({ className = '', ...props }) => (
  <h5 className={`mb-1 font-medium leading-none tracking-tight ${className}`.trim()} {...props} />
)

const AlertDescription = ({ className = '', ...props }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`.trim()} {...props} />
)

export { Alert, AlertTitle, AlertDescription, alertVariants }
