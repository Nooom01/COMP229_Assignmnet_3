import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home Component', () => {
  it('renders hello world text', () => {
    render(<Home />);
    const helloText = screen.getByText(/hello world/i);
    expect(helloText).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});