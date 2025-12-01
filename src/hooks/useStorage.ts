import { useState, useEffect, useCallback } from 'react';
import { SupabaseStorageManager } from '../utils/supabaseStorage';
import { useErrorHandler } from './useErrorHandler';
import { QPIPCalculation } from '../types';

/**
 * Hook for managing checklist state in Supabase cloud storage.
 * Single-user application - no authentication required.
 */
export function useChecklistState() {
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler();

    useEffect(() => {
        const loadChecklistState = async () => {
            try {
                clearError();
                setIsLoading(true);

                const tasks = await SupabaseStorageManager.getChecklistState();
                setCompletedTasks(tasks);
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
            const isCompleted = completedTasks.includes(taskId);
            const newState = isCompleted
                ? completedTasks.filter(id => id !== taskId)
                : [...completedTasks, taskId];

            // Optimistic update
            setCompletedTasks(newState);

                // Sync with Supabase
            await SupabaseStorageManager.toggleTask(taskId, isCompleted);
        } catch (error) {
            handleError(error, 'Toggling task');
            // Revert state on error
            setCompletedTasks(completedTasks);
        }
    }, [completedTasks, handleError, clearError]);

    const isTaskCompleted = useCallback((taskId: string) => {
        return completedTasks.includes(taskId);
    }, [completedTasks]);

    const clearAllTasks = useCallback(async () => {
        try {
            clearError();
            setCompletedTasks([]);
            await SupabaseStorageManager.clearChecklist();
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
        error,
    };
}

/**
 * Hook for managing QPIP calculation history in Supabase cloud storage.
 * Single-user application - no authentication required.
 */
export function useQPIPHistory() {
    const [qpipHistory, setQpipHistory] = useState<QPIPCalculation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler();

    useEffect(() => {
        const loadQPIPHistory = async () => {
            try {
                clearError();
                setIsLoading(true);

                const history = await SupabaseStorageManager.getQPIPHistory();
                    setQpipHistory(history);
            } catch (error) {
                handleError(error, 'Loading QPIP history');
            } finally {
                setIsLoading(false);
            }
        };

        loadQPIPHistory();
    }, [handleError, clearError]);

    const saveQPIPCalculation = useCallback(async (calculation: QPIPCalculation) => {
        try {
            clearError();
            const newHistory = [calculation, ...qpipHistory].slice(0, 10);
            
            // Optimistic update
            setQpipHistory(newHistory);

            // Sync with Supabase
            await SupabaseStorageManager.saveQPIPCalculation(calculation);
        } catch (error) {
            handleError(error, 'Saving QPIP calculation');
            // Revert state on error
            setQpipHistory(qpipHistory);
        }
    }, [qpipHistory, handleError, clearError]);

    const clearHistory = useCallback(async () => {
        try {
            clearError();
            setQpipHistory([]);
            await SupabaseStorageManager.clearQPIPHistory();
        } catch (error) {
            handleError(error, 'Clearing QPIP history');
        }
    }, [handleError, clearError]);

    return {
        qpipHistory,
        saveQPIPCalculation,
        clearHistory,
        isLoading,
        error,
    };
}
