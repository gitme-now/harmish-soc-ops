import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StartScreenHero } from './StartScreenHero';

describe('StartScreenHero', () => {
  it('should render the hero heading', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    expect(screen.getByText('Welcome to Soc Ops')).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    expect(screen.getByText('Break the ice and connect with your team')).toBeInTheDocument();
  });

  it('should render the Start Playing button', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    const button = screen.getByRole('button', { name: /start playing/i });
    expect(button).toBeInTheDocument();
  });

  it('should call onStart when Start Playing button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    const button = screen.getByRole('button', { name: /start playing/i });
    fireEvent.click(button);
    
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it('should render How to Play section', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });

  it('should render all four game instructions', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    expect(screen.getByText(/Browse the 5×5 grid/i)).toBeInTheDocument();
    expect(screen.getByText(/Find teammates who match/i)).toBeInTheDocument();
    expect(screen.getByText(/Tap squares to mark them/i)).toBeInTheDocument();
    expect(screen.getByText(/Get five in a row/i)).toBeInTheDocument();
  });

  it('should render Learn more button', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    expect(learnMoreButton).toBeInTheDocument();
  });

  it('should not show modal initially', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should open modal when Learn more button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('About Soc Ops Bingo')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    // Open modal
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close modal when Got it button is clicked', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    // Open modal
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);
    
    // Close modal
    const gotItButton = screen.getByRole('button', { name: /got it/i });
    fireEvent.click(gotItButton);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close modal when clicking backdrop', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    // Open modal
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);
    
    // Click backdrop
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should have aria-modal attribute on modal', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    // Open modal
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  it('should have aria-labelledby on modal', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    // Open modal
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    fireEvent.click(learnMoreButton);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should have aria-haspopup on Learn more button', () => {
    const onStart = vi.fn();
    render(<StartScreenHero onStart={onStart} />);
    
    const learnMoreButton = screen.getByRole('button', { name: /learn more/i });
    expect(learnMoreButton).toHaveAttribute('aria-haspopup', 'dialog');
  });
});
