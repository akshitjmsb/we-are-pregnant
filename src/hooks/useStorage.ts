import { useState, useEffect, useCallback } from 'react';
import { HybridStorageManager } from '../utils/hybridStorage';
import { useErrorHandler } from './useErrorHandler';

export function useStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void, boolean] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(true);
    const { handleError, clearError } = useErrorHandler();

    // Load data from storage on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                clearError();
                setIsLoading(true);

                // For now, we'll use a generic approach
                const data = await HybridStorageManager.getChecklistState();
                if (key === 'checklist') {
                    setStoredValue(data as T);
                }
            } catch (error) {
                handleError(error, `Loading ${key} from storage`);
                // Keep the initial value if loading fails
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [key, handleError, clearError]);

    const setValue = useCallback(
        async (value: T | ((val: T) => T)) => {
            try {
                clearError();
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);

                // Save to storage
                if (key === 'checklist' && Array.isArray(valueToStore)) {
                    await HybridStorageManager.saveChecklistState(valueToStore as string[]);
                }
            } catch (error) {
                handleError(error, `Saving ${key} to storage`);
            }
        },
        [key, storedValue, handleError, clearError]
    );

    const removeValue = useCallback(async () => {
        try {
            clearError();
            setStoredValue(initialValue);
            // Clear from storage
            await HybridStorageManager.clearUserData();
        } catch (error) {
            handleError(error, `Clearing ${key} from storage`);
        }
    }, [key, initialValue, handleError, clearError]);

    return [storedValue, setValue, removeValue, isLoading];
}

export function useChecklistState() {
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler();

    useEffect(() => {
        const loadChecklistState = async () => {
            try {
                clearError();
                setIsLoading(true);
                const saved = await HybridStorageManager.getChecklistState();
                setCompletedTasks(saved);
            } catch (error) {
                handleError(error, 'Loading checklist state');
            } finally {
                setIsLoading(false);
            }
        };

        loadChecklistState();
    }, [handleError, clearError]);

    const toggleTask = useCallback(async (taskId: string) => {
        try {
            clearError();
            const newState = completedTasks.includes(taskId)
                ? completedTasks.filter(id => id !== taskId)
                : [...completedTasks, taskId];

            setCompletedTasks(newState);
            await HybridStorageManager.saveChecklistState(newState);
        } catch (error) {
            handleError(error, 'Toggling task');
        }
    }, [completedTasks, handleError, clearError]);

    const isTaskCompleted = useCallback((taskId: string) => {
        return completedTasks.includes(taskId);
    }, [completedTasks]);

    const clearAllTasks = useCallback(async () => {
        try {
            clearError();
            setCompletedTasks([]);
            await HybridStorageManager.saveChecklistState([]);
        } catch (error) {
            handleError(error, 'Clearing all tasks');
        }
    }, [handleError, clearError]);

    return {
        completedTasks,
        toggleTask,
        isTaskCompleted,
        clearAllTasks,
        isLoading,
        error
    };
}

export function useQPIPHistory() {
    const [qpipHistory, setQpipHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler();

    useEffect(() => {
        const loadQPIPHistory = async () => {
            try {
                clearError();
                setIsLoading(true);
                const history = await HybridStorageManager.getQPIPHistory();
                setQpipHistory(history);
            } catch (error) {
                handleError(error, 'Loading QPIP history');
            } finally {
                setIsLoading(false);
            }
        };

        loadQPIPHistory();
    }, [handleError, clearError]);

    const saveQPIPCalculation = useCallback(async (calculation: any) => {
        try {
            clearError();
            const newHistory = [calculation, ...qpipHistory].slice(0, 10);
            setQpipHistory(newHistory);
            await HybridStorageManager.saveQPIPCalculation(calculation);
        } catch (error) {
            handleError(error, 'Saving QPIP calculation');
        }
    }, [qpipHistory, handleError, clearError]);

    const clearHistory = useCallback(async () => {
        try {
            clearError();
            setQpipHistory([]);
            // Clear QPIP history from storage
            await HybridStorageManager.clearUserData();
        } catch (error) {
            handleError(error, 'Clearing QPIP history');
        }
    }, [handleError, clearError]);

    return {
        qpipHistory,
        saveQPIPCalculation,
        clearHistory,
        isLoading,
        error
    };
}
