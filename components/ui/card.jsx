/**
 * This file may contain code that uses generative AI for code assistance, unit testing and/or entire functions.
 * The generative model(s) used may be a combination of GitHub Copilot, OpenAI ChatGPT or others.
 */

const Card = ({ className = '', ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`.trim()}
    {...props}
  />
)

const CardHeader = ({ className = '', ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`.trim()} {...props} />
)

const CardTitle = ({ className = '', ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`.trim()}
    {...props}
  />
)

const CardContent = ({ className = '', ...props }) => (
  <div className={`p-6 pt-0 ${className}`.trim()} {...props} />
)

const CardFooter = ({ className = '', ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`.trim()} {...props} />
)

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
