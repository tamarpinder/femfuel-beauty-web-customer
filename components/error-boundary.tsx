"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: any
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({
      hasError: true,
      error,
      errorInfo
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-center">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">
                  ¡Oops! Algo salió mal
                </h2>
                <p className="text-gray-600">
                  Hemos encontrado un error inesperado. Por favor, intenta nuevamente.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
                  <h3 className="font-medium text-red-800 mb-1">Error Details:</h3>
                  <p className="text-sm text-red-700 font-mono">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Intentar de nuevo
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-femfuel-rose hover:bg-femfuel-rose/90 flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Ir al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Higher-order component for easy wrapping
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}

// Hook for triggering errors (useful for testing)
export function useErrorHandler() {
  return (error: Error) => {
    throw error
  }
}