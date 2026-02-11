import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BoardPreview } from './BoardPreview';

describe('BoardPreview', () => {
  it('renders a 3x3 grid of squares', () => {
    const { container } = render(<BoardPreview />);
    const grid = container.querySelector('.grid.grid-cols-3');
    expect(grid).toBeInTheDocument();
    
    // Should have 9 squares (3x3)
    const squares = container.querySelectorAll('.grid.grid-cols-3 > div');
    expect(squares).toHaveLength(9);
  });

  it('renders the free space in the center with marked styling', () => {
    const { container } = render(<BoardPreview />);
    const squares = container.querySelectorAll('.grid.grid-cols-3 > div');
    
    // Center square (index 4) should be the free space
    const centerSquare = squares[4];
    expect(centerSquare).toHaveTextContent('FREE SPACE');
    
    // Should have marked state styling
    expect(centerSquare).toHaveClass('bg-seafoam');
    expect(centerSquare).toHaveClass('border-seafoam');
  });

  it('shows a check mark on the free space', () => {
    const { container } = render(<BoardPreview />);
    const squares = container.querySelectorAll('.grid.grid-cols-3 > div');
    const centerSquare = squares[4];
    
    // Should contain the check mark
    expect(centerSquare).toHaveTextContent('✓');
  });

  it('is decorative and uses aria-hidden', () => {
    const { container } = render(<BoardPreview />);
    const previewContainer = container.querySelector('[aria-hidden="true"]');
    
    expect(previewContainer).toBeInTheDocument();
    expect(previewContainer).toHaveAttribute('role', 'presentation');
  });

  it('respects prefers-reduced-motion', () => {
    const { container } = render(<BoardPreview />);
    const grid = container.querySelector('.grid.grid-cols-3');
    
    // Should use motion-safe prefix for animation
    expect(grid).toHaveClass('motion-safe:animate-cloud-slow');
  });

  it('renders sample prompts as square text', () => {
    render(<BoardPreview />);
    
    // Check for some sample prompts
    expect(screen.getByText('Has a pet')).toBeInTheDocument();
    expect(screen.getByText('Speaks 2+ languages')).toBeInTheDocument();
    expect(screen.getByText('Coffee lover')).toBeInTheDocument();
  });

  it('renders preview label and hint text', () => {
    render(<BoardPreview />);
    
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('Mark squares as you meet teammates')).toBeInTheDocument();
  });

  it('non-free squares do not show check marks', () => {
    const { container } = render(<BoardPreview />);
    const squares = container.querySelectorAll('.grid.grid-cols-3 > div');
    
    // First square (not free space) should not have a check mark
    const firstSquare = squares[0];
    expect(firstSquare).toHaveTextContent('Has a pet');
    expect(firstSquare).not.toHaveClass('bg-seafoam');
  });
});
