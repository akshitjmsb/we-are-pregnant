import { LocalStorageManager } from './localStorage';
import { QPIPCalculation } from '../types';

export class HybridStorageManager {
  static async getChecklistState(): Promise<string[]> {
    return LocalStorageManager.getChecklistState();
  }

  static async saveChecklistState(completedTasks: string[]): Promise<void> {
    LocalStorageManager.saveChecklistState(completedTasks);
  }

  static async getQPIPHistory(): Promise<QPIPCalculation[]> {
    return LocalStorageManager.getQPIPHistory();
  }

  static async saveQPIPCalculation(calculation: QPIPCalculation): Promise<void> {
    LocalStorageManager.saveQPIPCalculation(calculation);
  }

  static async clearUserData(): Promise<void> {
    try {
      localStorage.removeItem('montreal-pregnancy-checklist');
      localStorage.removeItem('montreal-pregnancy-qpip');
    } catch (error) {
      console.warn('Failed to clear local data:', error);
    }
  }

  static getCurrentUserId(): string {
    return 'local-user';
  }
}
