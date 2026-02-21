import { forwardRef } from 'react'

const buttonVariants = {
  default:
    'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
}

const Button = forwardRef(
  ({ className = '', variant = 'default', type = 'button', ...props }, ref) => {
    const variantClass = buttonVariants[variant] || buttonVariants.default

    return (
      <button
        type={type}
        className={`${variantClass} ${className}`.trim()}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
