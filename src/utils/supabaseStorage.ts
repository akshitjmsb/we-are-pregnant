import { supabase } from '../lib/supabase';
import { QPIPCalculation } from '../types';
import { User } from '@supabase/supabase-js';

/**
 * Supabase Cloud Storage Manager
 * All data is stored in Supabase - no local storage is used.
 * Authentication is required for all operations.
 */
export class SupabaseStorageManager {
  /**
   * Get checklist state for the authenticated user
   * @param userId - The authenticated user's ID
   * @returns Array of completed task IDs
   */
  static async getChecklistState(userId: string): Promise<string[]> {
    if (!userId) {
      throw new Error('User must be authenticated to access checklist');
    }

    const { data, error } = await supabase
      .from('user_checklist')
      .select('task_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to load checklist state:', error);
      throw error;
    }

    return data.map(row => row.task_id);
  }

  /**
   * Save checklist state for the authenticated user
   * @param userId - The authenticated user's ID
   * @param completedTasks - Array of completed task IDs
   */
  static async saveChecklistState(userId: string, completedTasks: string[]): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to save checklist');
    }

    // First, delete all existing tasks for this user
    const { error: deleteError } = await supabase
      .from('user_checklist')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Failed to clear existing checklist:', deleteError);
      throw deleteError;
    }

    // Then insert all completed tasks
    if (completedTasks.length > 0) {
      const tasksToInsert = completedTasks.map(taskId => ({
        user_id: userId,
        task_id: taskId,
      }));

      const { error: insertError } = await supabase
        .from('user_checklist')
        .insert(tasksToInsert);

      if (insertError) {
        console.error('Failed to save checklist state:', insertError);
        throw insertError;
      }
    }
  }

  /**
   * Toggle a single task in the checklist
   * @param userId - The authenticated user's ID
   * @param taskId - The task ID to toggle
   * @param isCompleted - Whether the task is currently completed
   */
  static async toggleTask(userId: string, taskId: string, isCompleted: boolean): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to toggle tasks');
    }

    if (isCompleted) {
      // Remove task
      const { error } = await supabase
        .from('user_checklist')
        .delete()
        .match({ user_id: userId, task_id: taskId });

      if (error) {
        console.error('Failed to remove task:', error);
        throw error;
      }
    } else {
      // Add task
      const { error } = await supabase
        .from('user_checklist')
        .insert({ user_id: userId, task_id: taskId });

      if (error) {
        console.error('Failed to add task:', error);
        throw error;
      }
    }
  }

  /**
   * Clear all checklist tasks for the authenticated user
   * @param userId - The authenticated user's ID
   */
  static async clearChecklist(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to clear checklist');
    }

    const { error } = await supabase
      .from('user_checklist')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to clear checklist:', error);
      throw error;
    }
  }

  /**
   * Get QPIP calculation history for the authenticated user
   * @param userId - The authenticated user's ID
   * @param limit - Maximum number of calculations to return (default: 10)
   * @returns Array of QPIP calculations
   */
  static async getQPIPHistory(userId: string, limit: number = 10): Promise<QPIPCalculation[]> {
    if (!userId) {
      throw new Error('User must be authenticated to access QPIP history');
    }

    const { data, error } = await supabase
      .from('user_qpip_history')
      .select('calculation')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to load QPIP history:', error);
      throw error;
    }

    return data.map(row => row.calculation as QPIPCalculation);
  }

  /**
   * Save a QPIP calculation for the authenticated user
   * @param userId - The authenticated user's ID
   * @param calculation - The QPIP calculation to save
   */
  static async saveQPIPCalculation(userId: string, calculation: QPIPCalculation): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to save QPIP calculation');
    }

    const { error } = await supabase
      .from('user_qpip_history')
      .insert({
        user_id: userId,
        calculation,
      });

    if (error) {
      console.error('Failed to save QPIP calculation:', error);
      throw error;
    }

    // Keep only the last 10 calculations
    const { data: allCalculations } = await supabase
      .from('user_qpip_history')
      .select('id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (allCalculations && allCalculations.length > 10) {
      const idsToDelete = allCalculations.slice(10).map(c => c.id);
      await supabase
        .from('user_qpip_history')
        .delete()
        .in('id', idsToDelete);
    }
  }

  /**
   * Clear all QPIP history for the authenticated user
   * @param userId - The authenticated user's ID
   */
  static async clearQPIPHistory(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to clear QPIP history');
    }

    const { error } = await supabase
      .from('user_qpip_history')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Failed to clear QPIP history:', error);
      throw error;
    }
  }

  /**
   * Clear all user data (checklist and QPIP history)
   * @param userId - The authenticated user's ID
   */
  static async clearAllUserData(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User must be authenticated to clear data');
    }

    await Promise.all([
      this.clearChecklist(userId),
      this.clearQPIPHistory(userId),
    ]);
  }
}

