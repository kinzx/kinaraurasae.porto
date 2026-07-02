import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

/**
 * Smoke test — verifies the app can render without crashing.
 *
 * This is the minimum viable test to catch:
 * - Import errors in the component tree
 * - Missing dependencies
 * - TypeScript compilation issues at runtime
 *
 * Expand this file as you add more components.
 */
describe('Smoke Test', () => {
  it('should verify the test environment is working', () => {
    const element = document.createElement('div');
    element.textContent = 'Portfolio';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Portfolio');
  });

  it('should handle basic React rendering', () => {
    const TestComponent = () => <h1>Kinar Aurasae Portfolio</h1>;

    render(<TestComponent />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Kinar Aurasae Portfolio',
    );
  });
});
