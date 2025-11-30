import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QPIPCalculator } from '../QPIPCalculator';

// Mock the useErrorHandler hook
vi.mock('../../hooks/useErrorHandler', () => ({
  useErrorHandler: () => ({
    error: null,
    handleError: vi.fn(),
    clearError: vi.fn()
  })
}));

vi.mock('../../hooks/useStorage', () => ({
  useQPIPHistory: () => ({
    qpipHistory: [],
    saveQPIPCalculation: vi.fn(),
    clearHistory: vi.fn(),
    isLoading: false,
    error: null,
    requiresAuth: false
  })
}));

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user', email: 'test@example.com' },
    loading: false
  })
}));

describe('QPIPCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the calculator form', () => {
    render(<QPIPCalculator />);

    expect(screen.getByText('QPIP Benefit Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText(/Gross Annual Salary/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Employment Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estimated Marginal Tax Rate/)).toBeInTheDocument();
  });

  it('displays default values correctly', () => {
    render(<QPIPCalculator />);

    const salaryInput = screen.getByLabelText(/Gross Annual Salary/) as HTMLInputElement;
    expect(salaryInput.value).toBe('65000');

    const employmentSelect = screen.getByLabelText(/Employment Type/) as HTMLSelectElement;
    expect(employmentSelect.value).toBe('employee');

    const taxRateInput = screen.getByLabelText(/Estimated Marginal Tax Rate/) as HTMLInputElement;
    expect(taxRateInput.value).toBe('30');
  });

  it('updates salary when input changes', async () => {
    render(<QPIPCalculator />);

    const salaryInput = screen.getByLabelText(/Gross Annual Salary/) as HTMLInputElement;
    fireEvent.change(salaryInput, { target: { value: '75000' } });

    await waitFor(() => {
      expect(salaryInput.value).toBe('75000');
    });
  });

  it('updates employment type when selection changes', async () => {
    render(<QPIPCalculator />);

    const employmentSelect = screen.getByLabelText(/Employment Type/) as HTMLSelectElement;
    fireEvent.change(employmentSelect, { target: { value: 'self-employed' } });

    await waitFor(() => {
      expect(employmentSelect.value).toBe('self-employed');
    });
  });

  it('switches between basic and special plans', () => {
    render(<QPIPCalculator />);

    const basicPlan = screen.getByLabelText(/Basic Plan/);
    const specialPlan = screen.getByLabelText(/Special Plan/);

    expect(basicPlan).toBeChecked();
    expect(specialPlan).not.toBeChecked();

    fireEvent.click(specialPlan);

    expect(specialPlan).toBeChecked();
    expect(basicPlan).not.toBeChecked();
  });

  it('displays results section', () => {
    render(<QPIPCalculator />);

    // Should show results for default values
    expect(screen.getByText(/Your Estimate for the Basic Plan/)).toBeInTheDocument();
    expect(screen.getByText(/Benefit Breakdown/)).toBeInTheDocument();
    expect(screen.getAllByText(/After-Tax Estimate/)).toHaveLength(2); // One in form, one in results
  });

  it('shows required documents for employee', () => {
    render(<QPIPCalculator />);

    expect(screen.getByText(/Your Document Checklist/)).toBeInTheDocument();
    expect(screen.getByText(/Social Insurance Number/)).toBeInTheDocument();
    expect(screen.getByText(/Records of Employment/)).toBeInTheDocument();
  });

  it('shows different documents for self-employed', async () => {
    render(<QPIPCalculator />);

    const employmentSelect = screen.getByLabelText(/Employment Type/) as HTMLSelectElement;
    fireEvent.change(employmentSelect, { target: { value: 'self-employed' } });

    await waitFor(() => {
      expect(screen.getByText(/business registration/)).toBeInTheDocument();
    });
  });

  it('has proper form accessibility', () => {
    render(<QPIPCalculator />);

    expect(screen.getByLabelText(/Gross Annual Salary/)).toHaveAttribute('type', 'number');
    expect(screen.getByLabelText(/Employment Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estimated Marginal Tax Rate/)).toHaveAttribute('type', 'number');
  });
});
