import { QPIPPlanDetails, QPIPResults, QPIPCalculation } from '../types';

const MAX_INSURABLE_EARNINGS = 94000;
const WEEKS_IN_YEAR = 52;
const MIN_EARNINGS = 2000;

export class QPIPCalculator {
  static getPlanDetails(plan: 'basic' | 'special'): QPIPPlanDetails {
    if (plan === 'basic') {
      return {
        name: "Basic Plan",
        maternity: { weeks: 18, rate: 0.70 },
        paternity: { weeks: 5, rate: 0.70 },
        parental: [
          { weeks: 7, rate: 0.70 },
          { weeks: 25, rate: 0.55 }
        ]
      };
    } else {
      return {
        name: "Special Plan",
        maternity: { weeks: 15, rate: 0.75 },
        paternity: { weeks: 3, rate: 0.75 },
        parental: [{ weeks: 25, rate: 0.75 }]
      };
    }
  }

  static calculateBenefits(input: QPIPCalculation): QPIPResults | null {
    const { salary, plan, taxRate } = input;

    if (salary < MIN_EARNINGS) {
      return null; // Not eligible
    }

    const planDetails = this.getPlanDetails(plan);
    const weeklyInsurable = Math.min(salary, MAX_INSURABLE_EARNINGS) / WEEKS_IN_YEAR;

    // Maternity benefits
    const maternity = {
      weekly: weeklyInsurable * planDetails.maternity.rate,
      total: weeklyInsurable * planDetails.maternity.rate * planDetails.maternity.weeks
    };

    // Paternity benefits
    const paternity = {
      weekly: weeklyInsurable * planDetails.paternity.rate,
      total: weeklyInsurable * planDetails.paternity.rate * planDetails.paternity.weeks
    };

    // Parental benefits
    const parental = planDetails.parental.reduce((acc, tier) => {
      const weekly = weeklyInsurable * tier.rate;
      const total = weekly * tier.weeks;
      acc.total += total;
      acc.tiers.push({ ...tier, weekly, total });
      return acc;
    }, { total: 0, tiers: [] as Array<{ weeks: number; rate: number; weekly: number; total: number }> });

    const totalWeeks = planDetails.maternity.weeks + 
                     planDetails.paternity.weeks + 
                     planDetails.parental.reduce((sum, t) => sum + t.weeks, 0);
    
    const totalGross = maternity.total + paternity.total + parental.total;
    const totalNet = totalGross * (1 - taxRate);

    return {
      maternity,
      paternity,
      parental,
      totalWeeks,
      totalGross,
      totalNet
    };
  }

  static formatCurrency(amount: number): string {
    return amount.toLocaleString('en-CA', { 
      style: 'currency', 
      currency: 'CAD' 
    });
  }

  static getRequiredDocuments(employmentType: 'employee' | 'self-employed'): string[] {
    const baseDocuments = [
      'Social Insurance Number (SIN)',
      'Date of birth',
      'Mailing address and banking information for direct deposit',
      'Expected date of birth or actual date of birth of the child'
    ];

    if (employmentType === 'employee') {
      return [...baseDocuments, 'All Records of Employment (ROEs) from the last 52 weeks'];
    } else {
      return [
        ...baseDocuments,
        'Your estimated net income for the current and previous tax year',
        'Information about your business registration'
      ];
    }
  }
}
