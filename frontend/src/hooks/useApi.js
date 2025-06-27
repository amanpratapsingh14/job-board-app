import { useState, useEffect, useRef, useCallback } from 'react';

export const useApi = (apiCall, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const { 
    immediate = true, 
    debounceMs = 0,
    onSuccess,
    onError 
  } = options;

  const execute = useCallback(async (...args) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Add debounce if specified
      if (debounceMs > 0) {
        await new Promise(resolve => {
          timeoutRef.current = setTimeout(resolve, debounceMs);
        });
      }

      // Check if component is still mounted
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      const result = await apiCall(...args);
      
      // Check if component is still mounted
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      setData(result);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      // Don't set error if request was cancelled
      if (err.name !== 'AbortError') {
        setError(err);
        if (onError) {
          onError(err);
        }
      }
    } finally {
      // Only update loading if component is still mounted
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  }, [apiCall, debounceMs, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    reset: () => {
      setData(null);
      setError(null);
      setLoading(false);
    }
  };
}; 