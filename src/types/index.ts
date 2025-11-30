// Core application types

export interface ChecklistTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface TrimesterData {
  title: string;
  baby: string;
  you: string;
  todo: string;
}

export interface QPIPCalculation {
  salary: number;
  plan: 'basic' | 'special';
  employmentType: 'employee' | 'self-employed';
  taxRate: number;
  timestamp?: string;
  results?: QPIPResults; // Optional results for stored calculations
}

export interface QPIPPlanDetails {
  name: string;
  maternity: {
    weeks: number;
    rate: number;
  };
  paternity: {
    weeks: number;
    rate: number;
  };
  parental: Array<{
    weeks: number;
    rate: number;
  }>;
}

export interface QPIPBenefits {
  weekly: number;
  total: number;
}

export interface QPIPResults {
  maternity: QPIPBenefits;
  paternity: QPIPBenefits;
  parental: {
    total: number;
    tiers: Array<QPIPBenefits & { weeks: number; rate: number }>;
  };
  totalWeeks: number;
  totalGross: number;
  totalNet: number;
}

export interface ChartData {
  labels: string[];
  growth: number[];
  symptoms: number[];
}

export interface StepperStep {
  id: string;
  title: string;
  content: string;
}

export interface HospitalInfo {
  name: string;
  address: string;
  phone?: string;
  description: string;
}

export interface ContactInfo {
  name: string;
  phone?: string;
  description: string;
  category: 'health' | 'emergency' | 'support' | 'private';
}

// Error handling types
export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: AppError;
}

// Local storage types
export interface StoredChecklistState {
  completedTasks: string[];
  lastUpdated: string;
}

// Chart.js types (since we're using Chart.js)
export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  interaction: {
    mode: string;
    intersect: boolean;
  };
  scales: {
    y: {
      type: string;
      display: boolean;
      position: string;
      title: {
        display: boolean;
        text: string;
        color: string;
      };
      grid: {
        drawOnChartArea: boolean;
      };
    };
    y1: {
      type: string;
      display: boolean;
      position: string;
      min: number;
      max: number;
      title: {
        display: boolean;
        text: string;
        color: string;
      };
    };
  };
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => string;
      };
    };
    legend: {
      position: string;
    };
  };
  animation: {
    duration: number;
  };
}
