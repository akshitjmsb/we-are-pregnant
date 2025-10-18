import { describe, it, expect } from 'vitest';
import { QPIPCalculator } from '../qpipCalculations';

describe('QPIPCalculator', () => {
  describe('calculateBenefits', () => {
    it('should return null for salary below minimum earnings', () => {
      const result = QPIPCalculator.calculateBenefits({
        salary: 1000,
        plan: 'basic',
        employmentType: 'employee',
        taxRate: 0.3
      });
      
      expect(result).toBeNull();
    });

    it('should calculate basic plan benefits correctly', () => {
      const result = QPIPCalculator.calculateBenefits({
        salary: 65000,
        plan: 'basic',
        employmentType: 'employee',
        taxRate: 0.3
      });
      
      expect(result).not.toBeNull();
      expect(result?.totalWeeks).toBe(55); // 18 + 5 + 7 + 25
      expect(result?.maternity.weekly).toBeGreaterThan(0);
      expect(result?.paternity.weekly).toBeGreaterThan(0);
      expect(result?.parental.total).toBeGreaterThan(0);
    });

    it('should calculate special plan benefits correctly', () => {
      const result = QPIPCalculator.calculateBenefits({
        salary: 65000,
        plan: 'special',
        employmentType: 'employee',
        taxRate: 0.3
      });
      
      expect(result).not.toBeNull();
      expect(result?.totalWeeks).toBe(43); // 15 + 3 + 25
      expect(result?.maternity.weekly).toBeGreaterThan(0);
      expect(result?.paternity.weekly).toBeGreaterThan(0);
      expect(result?.parental.total).toBeGreaterThan(0);
    });

    it('should cap salary at maximum insurable earnings', () => {
      const result = QPIPCalculator.calculateBenefits({
        salary: 150000,
        plan: 'basic',
        employmentType: 'employee',
        taxRate: 0.3
      });
      
      expect(result).not.toBeNull();
      // Should use 94000 as the cap, not 150000
      const weeklyInsurable = 94000 / 52;
      expect(result?.maternity.weekly).toBeCloseTo(weeklyInsurable * 0.70, 2);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(QPIPCalculator.formatCurrency(1000)).toBe('$1,000.00');
      expect(QPIPCalculator.formatCurrency(1234.56)).toBe('$1,234.56');
    });
  });

  describe('getRequiredDocuments', () => {
    it('should return correct documents for employee', () => {
      const docs = QPIPCalculator.getRequiredDocuments('employee');
      expect(docs).toContain('Social Insurance Number (SIN)');
      expect(docs).toContain('All Records of Employment (ROEs) from the last 52 weeks');
    });

    it('should return correct documents for self-employed', () => {
      const docs = QPIPCalculator.getRequiredDocuments('self-employed');
      expect(docs).toContain('Social Insurance Number (SIN)');
      expect(docs).toContain('Your estimated net income for the current and previous tax year');
      expect(docs).toContain('Information about your business registration');
    });
  });
});
