import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionPlan } from '../ActionPlan';

// Mock the useChecklistState hook
vi.mock('../../hooks/useStorage', () => ({
  useChecklistState: () => ({
    completedTasks: ['t1-1'],
    toggleTask: vi.fn(),
    isTaskCompleted: (taskId: string) => taskId === 't1-1',
    isLoading: false,
    error: null
  })
}));

describe('ActionPlan', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all trimester sections', () => {
    render(<ActionPlan />);

    expect(screen.getByText('First Trimester (Weeks 1-12)')).toBeInTheDocument();
    expect(screen.getByText('Second Trimester (Weeks 13-28)')).toBeInTheDocument();
    expect(screen.getByText('Third Trimester (Weeks 29-40+)')).toBeInTheDocument();
  });

  it('renders checklist items for each trimester', () => {
    render(<ActionPlan />);

    // Check for some key tasks
    expect(screen.getByText(/Confirm pregnancy with a home test/)).toBeInTheDocument();
    expect(screen.getByText(/Attend anatomy scan ultrasound/)).toBeInTheDocument();
    expect(screen.getByText(/Pack your hospital bag/)).toBeInTheDocument();
  });

  it('displays completed tasks correctly', () => {
    render(<ActionPlan />);

    // The mocked hook returns t1-1 as completed
    const completedTask = screen.getByRole('checkbox', { name: /Confirm pregnancy with a home test/ });
    expect(completedTask).toHaveAttribute('aria-checked', 'true');
  });

  it('handles keyboard navigation', () => {
    render(<ActionPlan />);

    const task = screen.getByRole('checkbox', { name: /Confirm pregnancy with a home test/ });

    // Test Enter key
    fireEvent.keyDown(task, { key: 'Enter' });

    // Test Space key
    fireEvent.keyDown(task, { key: ' ' });
  });

  it('has proper accessibility attributes', () => {
    render(<ActionPlan />);

    const tasks = screen.getAllByRole('checkbox');
    tasks.forEach(task => {
      expect(task).toHaveAttribute('tabIndex', '0');
      expect(task).toHaveAttribute('aria-checked');
    });
  });
});
