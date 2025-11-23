import { useState, useEffect, useCallback } from 'react';
import { HybridStorageManager } from '../utils/hybridStorage';
import { useErrorHandler } from './useErrorHandler';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

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
    const { user } = useAuth();

    useEffect(() => {
        const loadChecklistState = async () => {
            try {
                clearError();
                setIsLoading(true);

                if (user) {
                    // Load from Supabase
                    const { data, error } = await supabase
                        .from('user_checklist')
                        .select('task_id');

                    if (error) throw error;
                    setCompletedTasks(data.map(row => row.task_id));
                } else {
                    // Load from Local Storage
                    const saved = await HybridStorageManager.getChecklistState();
                    setCompletedTasks(saved);
                }
            } catch (error) {
                handleError(error, 'Loading checklist state');
            } finally {
                setIsLoading(false);
            }
        };

        loadChecklistState();
    }, [user, handleError, clearError]);

    const toggleTask = useCallback(async (taskId: string) => {
        try {
            clearError();
            const isCompleted = completedTasks.includes(taskId);
            const newState = isCompleted
                ? completedTasks.filter(id => id !== taskId)
                : [...completedTasks, taskId];

            setCompletedTasks(newState);

            if (user) {
                // Sync with Supabase
                if (isCompleted) {
                    await supabase.from('user_checklist').delete().match({ user_id: user.id, task_id: taskId });
                } else {
                    await supabase.from('user_checklist').insert({ user_id: user.id, task_id: taskId });
                }
            } else {
                // Sync with Local Storage
                await HybridStorageManager.saveChecklistState(newState);
            }
        } catch (error) {
            handleError(error, 'Toggling task');
            // Revert state on error
            setCompletedTasks(completedTasks);
        }
    }, [completedTasks, user, handleError, clearError]);

    const isTaskCompleted = useCallback((taskId: string) => {
        return completedTasks.includes(taskId);
    }, [completedTasks]);

    const clearAllTasks = useCallback(async () => {
        try {
            clearError();
            setCompletedTasks([]);

            if (user) {
                await supabase.from('user_checklist').delete().eq('user_id', user.id);
            } else {
                await HybridStorageManager.saveChecklistState([]);
            }
        } catch (error) {
            handleError(error, 'Clearing all tasks');
        }
    }, [user, handleError, clearError]);

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
    const { user } = useAuth();

    useEffect(() => {
        const loadQPIPHistory = async () => {
            try {
                clearError();
                setIsLoading(true);

                if (user) {
                    const { data, error } = await supabase
                        .from('user_qpip_history')
                        .select('calculation')
                        .order('created_at', { ascending: false })
                        .limit(10);

                    if (error) throw error;
                    setQpipHistory(data.map(row => row.calculation));
                } else {
                    const history = await HybridStorageManager.getQPIPHistory();
                    setQpipHistory(history);
                }
            } catch (error) {
                handleError(error, 'Loading QPIP history');
            } finally {
                setIsLoading(false);
            }
        };

        loadQPIPHistory();
    }, [user, handleError, clearError]);

    const saveQPIPCalculation = useCallback(async (calculation: any) => {
        try {
            clearError();
            const newHistory = [calculation, ...qpipHistory].slice(0, 10);
            setQpipHistory(newHistory);

            if (user) {
                await supabase.from('user_qpip_history').insert({
                    user_id: user.id,
                    calculation
                });
            } else {
                await HybridStorageManager.saveQPIPCalculation(calculation);
            }
        } catch (error) {
            handleError(error, 'Saving QPIP calculation');
        }
    }, [qpipHistory, user, handleError, clearError]);

    const clearHistory = useCallback(async () => {
        try {
            clearError();
            setQpipHistory([]);

            if (user) {
                await supabase.from('user_qpip_history').delete().eq('user_id', user.id);
            } else {
                await HybridStorageManager.clearUserData();
            }
        } catch (error) {
            handleError(error, 'Clearing QPIP history');
        }
    }, [user, handleError, clearError]);

    return {
        qpipHistory,
        saveQPIPCalculation,
        clearHistory,
        isLoading,
        error
    };
}
