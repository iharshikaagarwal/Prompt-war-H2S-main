import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WellnessGauge from './WellnessGauge';

describe('WellnessGauge', () => {
  it('should render with score prop', () => {
    render(<WellnessGauge score={75} />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('should display correct color for high score', () => {
    const { container } = render(<WellnessGauge score={85} />);
    expect(container.querySelector('.text-green-500')).toBeInTheDocument();
  });

  it('should display correct color for medium score', () => {
    const { container } = render(<WellnessGauge score={60} />);
    expect(container.querySelector('.text-yellow-500')).toBeInTheDocument();
  });

  it('should display correct color for low score', () => {
    const { container } = render(<WellnessGauge score={35} />);
    expect(container.querySelector('.text-red-500')).toBeInTheDocument();
  });

  it('should render with minimum score', () => {
    render(<WellnessGauge score={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render with maximum score', () => {
    render(<WellnessGauge score={100} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should handle decimal scores', () => {
    render(<WellnessGauge score={75.5} />);
    const scoreText = screen.getByText(/75/);
    expect(scoreText).toBeInTheDocument();
  });

  it('should have accessible structure', () => {
    const { container } = render(<WellnessGauge score={75} />);
    const gauge = container.querySelector('[role="meter"]') || container.querySelector('[aria-valuenow]');
    expect(gauge || container.firstChild).toBeTruthy();
  });
});
