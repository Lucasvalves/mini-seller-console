import React from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { Card } from './ui/Card'
import { Button } from './ui/Buttton'
import { AlertTriangle, RefreshCw } from 'lucide-react'

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (fallback) return fallback

        return (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Something went wrong
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {error?.message ||
                    'An unexpected error occurred. Please try refreshing the page.'}
                </p>
              </div>
              <Button onClick={resetErrorBoundary} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </Button>
            </div>
          </Card>
        )
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
