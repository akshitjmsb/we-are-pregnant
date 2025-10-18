import { useState, useCallback } from 'react';
import { AppError } from '../types';

export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((error: unknown, context?: string) => {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
    
    const appError: AppError = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      code: error instanceof Error ? error.name : 'UNKNOWN_ERROR',
      details: error
    };
    
    setError(appError);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      clearError();
      return await asyncFn();
    } catch (error) {
      handleError(error, context);
      return null;
    }
  }, [handleError, clearError]);

  return {
    error,
    handleError,
    clearError,
    handleAsync
  };
}
