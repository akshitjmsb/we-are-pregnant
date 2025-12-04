import { useState, useEffect, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { QPIPCalculation } from '../types';

const CHECKLIST_STORAGE_KEY = 'we-are-pregnant-checklist';
const QPIP_HISTORY_STORAGE_KEY = 'we-are-pregnant-qpip-history';

/**
 * Hook for managing checklist state in localStorage.
 * Single-user application - no authentication required.
 */
export function useChecklistState() {
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler();

    useEffect(() => {
        const loadChecklistState = () => {
            try {
                clearError();
                setIsLoading(true);

                const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
                const tasks = stored ? JSON.parse(stored) : [];
                setCompletedTasks(tasks);
            } catch (error) {
                handleError(error, 'Loading checklist state');
            } finally {
                setIsLoading(false);
            }
        };

        loadChecklistState();
    }, [handleError, clearError]);

    const toggleTask = useCallback((taskId: string) => {
        try {
            clearError();
            const isCompleted = completedTasks.includes(taskId);
            const newState = isCompleted
                ? completedTasks.filter(id => id !== taskId)
                : [...completedTasks, taskId];

            setCompletedTasks(newState);
            localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(newState));
        } catch (error) {
            handleError(error, 'Toggling task');
            // Revert state on error
            setCompletedTasks(completedTasks);
        }
    }, [completedTasks, handleError, clearError]);

    const isTaskCompleted = useCallback((taskId: string) => {
        return completedTasks.includes(taskId);
    }, [completedTasks]);

    const clearAllTasks = useCallback(() => {
        try {
            clearError();
            setCompletedTasks([]);
            localStorage.removeItem(CHECKLIST_STORAGE_KEY);
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
 * Hook for managing QPIP calculation history in localStorage.
 * Single-user application - no authentication required.
 */
export function useQPIPHistory() {
    const [qpipHistory, setQpipHistory] = useState<QPIPCalculation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { error, handleError, clearError } = useErrorHandler();

    useEffect(() => {
        const loadQPIPHistory = () => {
            try {
                clearError();
                setIsLoading(true);

                const stored = localStorage.getItem(QPIP_HISTORY_STORAGE_KEY);
                const history = stored ? JSON.parse(stored) : [];
                setQpipHistory(history);
            } catch (error) {
                handleError(error, 'Loading QPIP history');
            } finally {
                setIsLoading(false);
            }
        };

        loadQPIPHistory();
    }, [handleError, clearError]);

    const saveQPIPCalculation = useCallback((calculation: QPIPCalculation) => {
        try {
            clearError();
            const newHistory = [calculation, ...qpipHistory].slice(0, 10);
            
            setQpipHistory(newHistory);
            localStorage.setItem(QPIP_HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
        } catch (error) {
            handleError(error, 'Saving QPIP calculation');
            // Revert state on error
            setQpipHistory(qpipHistory);
        }
    }, [qpipHistory, handleError, clearError]);

    const clearHistory = useCallback(() => {
        try {
            clearError();
            setQpipHistory([]);
            localStorage.removeItem(QPIP_HISTORY_STORAGE_KEY);
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
