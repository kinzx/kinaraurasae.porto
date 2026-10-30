import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../app/page';

describe('Smoke Test & Portfolio Rendering', () => {
  it('should verify the test environment is working', () => {
    const element = document.createElement('div');
    element.textContent = 'Portfolio';
    document.body.appendChild(element);

    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('Portfolio');
  });

  it('renders hero title and owner role', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 1, name: /portfolio\./i })).toBeInTheDocument();
    expect(screen.getAllByText(/kinar aurasae/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/devops, web developer & designer/i).length).toBeGreaterThan(0);
  });

  it('renders skills, tools, and projects sections', () => {
    render(<Home />);

    expect(screen.getByText(/my skill's/i)).toBeInTheDocument();
    expect(screen.getByText(/my tool's/i)).toBeInTheDocument();
    expect(screen.getByText(/^affinity$/i)).toBeInTheDocument();
    expect(screen.getByText(/^visual studio code$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^figma$/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^figcraft$/i)).toBeInTheDocument();
    expect(screen.getByText(/^canva$/i)).toBeInTheDocument();
    expect(screen.getByText(/^photoshop$/i)).toBeInTheDocument();
    expect(screen.getByText(/^after effects$/i)).toBeInTheDocument();
    expect(screen.getByText(/^adobe premiere$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/^github$/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/github contributions/i)).toBeInTheDocument();
    expect(screen.getByText(/contributions in the last year/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view github/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /projects\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /^unitrade$/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /^sakoo finance bot$/i }),
    ).toBeInTheDocument();
  });

  it('renders search trigger and opens search command palette modal', () => {
    render(<Home />);

    const searchButton = screen.getByRole('button', { name: /search portfolio/i });
    expect(searchButton).toBeInTheDocument();

    fireEvent.click(searchButton);

    const searchInput = screen.getByPlaceholderText(/search projects, writings, pages/i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'unitrade' } });
    expect(screen.getAllByText(/unitrade/i).length).toBeGreaterThan(0);
  });

  it('renders contact form fields and submit action', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { level: 2, name: /^contact$/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/what is this about\?/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/tell me about your project, role, or just say hi\./i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
