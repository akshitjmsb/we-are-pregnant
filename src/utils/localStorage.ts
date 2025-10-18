import { StoredChecklistState } from '../types';

const STORAGE_KEYS = {
  CHECKLIST: 'montreal-pregnancy-checklist',
  QPIP_CALCULATIONS: 'montreal-pregnancy-qpip',
} as const;

export class LocalStorageManager {
  private static isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getChecklistState(): string[] {
    if (!this.isAvailable()) {
      console.warn('LocalStorage not available, using default state');
      return [];
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
      if (!stored) return [];

      const parsed: StoredChecklistState = JSON.parse(stored);
      return parsed.completedTasks || [];
    } catch (error) {
      console.error('Failed to load checklist state:', error);
      return [];
    }
  }

  static saveChecklistState(completedTasks: string[]): void {
    if (!this.isAvailable()) {
      console.warn('LocalStorage not available, cannot save state');
      return;
    }

    try {
      const state: StoredChecklistState = {
        completedTasks,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save checklist state:', error);
    }
  }

  static getQPIPHistory(): QPIPCalculation[] {
    if (!this.isAvailable()) return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QPIP_CALCULATIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load QPIP history:', error);
      return [];
    }
  }

  static saveQPIPCalculation(calculation: QPIPCalculation): void {
    if (!this.isAvailable()) return;

    try {
      const history = this.getQPIPHistory();
      const newHistory = [calculation, ...history].slice(0, 10); // Keep last 10
      localStorage.setItem(STORAGE_KEYS.QPIP_CALCULATIONS, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save QPIP calculation:', error);
    }
  }
}

// QPIP calculation types
export interface QPIPCalculation {
  salary: number;
  plan: 'basic' | 'special';
  employmentType: 'employee' | 'self-employed';
  taxRate: number;
  timestamp: string;
}
