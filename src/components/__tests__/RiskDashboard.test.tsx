import { render, screen, act } from '@testing-library/react';
import { RiskDashboard } from '@/components/RiskDashboard';

// Mock ResizeObserver for Recharts and Base UI
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

// Mock recharts because ResponsiveContainer relies on DOM measurements that jsdom doesn't fully support out of the box
jest.mock('recharts', () => {
  const OriginalRechartsModule = jest.requireActual('recharts');

  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ children }: any) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

describe('RiskDashboard Component', () => {
  const defaultProps = {
    title: 'High-Yield Savings',
    description: 'A secure place for your cash with guaranteed returns.',
    riskLevel: 'Low' as const,
    volatility: 'Minimal',
    expectedAnnualReturn: 4.5,
    baseAmount: 10000,
  };

  it('renders the title and description correctly', async () => {
    await act(async () => {
      render(<RiskDashboard {...defaultProps} />);
    });
    
    expect(screen.getByText('High-Yield Savings')).toBeInTheDocument();
    expect(screen.getByText('A secure place for your cash with guaranteed returns.')).toBeInTheDocument();
  });

  it('renders the correct risk level and volatility badges', async () => {
    await act(async () => {
      render(<RiskDashboard {...defaultProps} />);
    });
    
    expect(screen.getByText('Risk: Low')).toBeInTheDocument();
    expect(screen.getByText('Volatility: Minimal')).toBeInTheDocument();
  });

  it('displays the correct initial default values based on 10 years', async () => {
    await act(async () => {
      render(<RiskDashboard {...defaultProps} />);
    });
    
    // Initial amount is 10k
    expect(screen.getByText('$10,000')).toBeInTheDocument();
    // Default time horizon is 10 years
    expect(screen.getByText('10 years')).toBeInTheDocument();
  });
});
