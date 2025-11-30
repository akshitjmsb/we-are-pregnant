import { supabase } from '../lib/supabase';
import { QPIPCalculation } from '../types';

/**
 * Single User ID - used for all data storage
 * Since this is a single-user application, we use a constant user ID
 */
const SINGLE_USER_ID = '00000000-0000-0000-0000-000000000000';

/**
 * Supabase Cloud Storage Manager
 * All data is stored in Supabase - no local storage is used.
 * Single-user application - no authentication required.
 */
export class SupabaseStorageManager {
  /**
   * Get checklist state for the single user
   * @returns Array of completed task IDs
   */
  static async getChecklistState(): Promise<string[]> {
    const { data, error } = await supabase
      .from('user_checklist')
      .select('task_id')
      .eq('user_id', SINGLE_USER_ID);

    if (error) {
      console.error('Failed to load checklist state:', error);
      throw error;
    }

    return data.map(row => row.task_id);
  }

  /**
   * Save checklist state for the single user
   * @param completedTasks - Array of completed task IDs
   */
  static async saveChecklistState(completedTasks: string[]): Promise<void> {
    // First, delete all existing tasks for this user
    const { error: deleteError } = await supabase
      .from('user_checklist')
      .delete()
      .eq('user_id', SINGLE_USER_ID);

    if (deleteError) {
      console.error('Failed to clear existing checklist:', deleteError);
      throw deleteError;
    }

    // Then insert all completed tasks
    if (completedTasks.length > 0) {
      const tasksToInsert = completedTasks.map(taskId => ({
        user_id: SINGLE_USER_ID,
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
   * @param taskId - The task ID to toggle
   * @param isCompleted - Whether the task is currently completed
   */
  static async toggleTask(taskId: string, isCompleted: boolean): Promise<void> {
    if (isCompleted) {
      // Remove task
      const { error } = await supabase
        .from('user_checklist')
        .delete()
        .match({ user_id: SINGLE_USER_ID, task_id: taskId });

      if (error) {
        console.error('Failed to remove task:', error);
        throw error;
      }
    } else {
      // Add task
      const { error } = await supabase
        .from('user_checklist')
        .insert({ user_id: SINGLE_USER_ID, task_id: taskId });

      if (error) {
        console.error('Failed to add task:', error);
        throw error;
      }
    }
  }

  /**
   * Clear all checklist tasks for the single user
   */
  static async clearChecklist(): Promise<void> {
    const { error } = await supabase
      .from('user_checklist')
      .delete()
      .eq('user_id', SINGLE_USER_ID);

    if (error) {
      console.error('Failed to clear checklist:', error);
      throw error;
    }
  }

  /**
   * Get QPIP calculation history for the single user
   * @param limit - Maximum number of calculations to return (default: 10)
   * @returns Array of QPIP calculations
   */
  static async getQPIPHistory(limit: number = 10): Promise<QPIPCalculation[]> {
    const { data, error } = await supabase
      .from('user_qpip_history')
      .select('calculation')
      .eq('user_id', SINGLE_USER_ID)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to load QPIP history:', error);
      throw error;
    }

    return data.map(row => row.calculation as QPIPCalculation);
  }

  /**
   * Save a QPIP calculation for the single user
   * @param calculation - The QPIP calculation to save
   */
  static async saveQPIPCalculation(calculation: QPIPCalculation): Promise<void> {
    const { error } = await supabase
      .from('user_qpip_history')
      .insert({
        user_id: SINGLE_USER_ID,
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
      .eq('user_id', SINGLE_USER_ID)
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
   * Clear all QPIP history for the single user
   */
  static async clearQPIPHistory(): Promise<void> {
    const { error } = await supabase
      .from('user_qpip_history')
      .delete()
      .eq('user_id', SINGLE_USER_ID);

    if (error) {
      console.error('Failed to clear QPIP history:', error);
      throw error;
    }
  }

  /**
   * Clear all user data (checklist and QPIP history)
   */
  static async clearAllUserData(): Promise<void> {
    await Promise.all([
      this.clearChecklist(),
      this.clearQPIPHistory(),
    ]);
  }
}
