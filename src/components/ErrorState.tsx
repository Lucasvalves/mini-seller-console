import { Card } from './ui/Card'
import { Button } from './ui/Buttton'
import { AlertTriangle, RefreshCw, Wifi } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  type?: 'network' | 'generic' | 'not-found'
}

export function ErrorState({
  title,
  description,
  onRetry,
  type = 'generic'
}: ErrorStateProps) {
  function getIcon() {
    switch (type) {
      case 'network':
        return <Wifi className="h-12 w-12 text-red-500" />
      case 'not-found':
        return <AlertTriangle className="h-12 w-12 text-yellow-500" />
      default:
        return <AlertTriangle className="h-12 w-12 text-red-500" />
    }
  }

  function getDefaultTitle() {
    switch (type) {
      case 'network':
        return 'Connection Error'
      case 'not-found':
        return 'Not Found'
      default:
        return 'Something went wrong'
    }
  }

  function getDefaultDescription() {
    switch (type) {
      case 'network':
        return 'Unable to connect to the server. Please check your internet connection and try again.'
      case 'not-found':
        return 'The requested resource could not be found.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <Card className="p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        {getIcon()}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {title || getDefaultTitle()}
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-md">
            {description || getDefaultDescription()}
          </p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  )
}
