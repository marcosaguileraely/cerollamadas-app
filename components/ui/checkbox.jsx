import { forwardRef } from 'react'

const Checkbox = forwardRef(
  ({ className = '', checked, onChange, id, 'aria-label': ariaLabel, ...props }, ref) => (
    <input
      type="checkbox"
      id={id}
      ref={ref}
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className={`h-4 w-4 rounded border border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`.trim()}
      {...props}
    />
  )
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
