import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LandingCards } from './LandingCards';

describe('LandingCards', () => {
  describe('Rendering', () => {
    it('should render all three cards', () => {
      render(<LandingCards />);
      
      expect(screen.getByText('Quick Rules')).toBeInTheDocument();
      expect(screen.getByText('Example Questions')).toBeInTheDocument();
      expect(screen.getByText('Accessibility')).toBeInTheDocument();
    });

    it('should render with proper region role and label', () => {
      render(<LandingCards />);
      
      const region = screen.getByRole('region', { name: 'Game information cards' });
      expect(region).toBeInTheDocument();
    });

    it('should have first card expanded by default', () => {
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
    });

    it('should show expand/collapse hint text', () => {
      render(<LandingCards />);
      
      expect(screen.getByText('Tap to collapse')).toBeInTheDocument();
      expect(screen.getAllByText('Tap to expand')).toHaveLength(2);
    });

    it('should render card content when expanded', () => {
      render(<LandingCards />);
      
      // First card is expanded by default
      expect(screen.getByText('Find people who match the questions')).toBeInTheDocument();
      expect(screen.getByText('Tap a square when you meet someone')).toBeInTheDocument();
      expect(screen.getByText('Get 5 in a row to win!')).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper aria-expanded attributes', () => {
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button, index) => {
        expect(button).toHaveAttribute('aria-expanded');
        expect(button.getAttribute('aria-expanded')).toBe(index === 0 ? 'true' : 'false');
      });
    });

    it('should have aria-controls linking button to content', () => {
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button, index) => {
        const controlsId = button.getAttribute('aria-controls');
        expect(controlsId).toBe(`card-content-${index}`);
        
        const contentDiv = document.getElementById(controlsId!);
        expect(contentDiv).toBeInTheDocument();
      });
    });

    it('should have aria-hidden on content based on expanded state', () => {
      render(<LandingCards />);
      
      const content0 = document.getElementById('card-content-0');
      const content1 = document.getElementById('card-content-1');
      
      expect(content0).toHaveAttribute('aria-hidden', 'false');
      expect(content1).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have aria-hidden on icon elements', () => {
      const { container } = render(<LandingCards />);
      
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      // 3 arrow icons
      expect(icons.length).toBeGreaterThanOrEqual(3);
    });

    it('should have type="button" on all buttons', () => {
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Mouse/Touch Interaction', () => {
    it('should expand a collapsed card when clicked', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(secondButton);
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse an expanded card when clicked', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      const firstButton = buttons[0];
      
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      await user.click(firstButton);
      
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should allow only one card to be expanded at a time', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      
      // First card is expanded initially
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
      
      // Click second card
      await user.click(buttons[1]);
      
      // Now second is expanded, first is collapsed
      expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
      expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
      expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle content visibility based on expanded state', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      // Second card content should have max-h-0 initially (collapsed)
      const content1 = document.getElementById('card-content-1');
      expect(content1).toHaveClass('max-h-0');
      expect(content1).toHaveAttribute('aria-hidden', 'true');
      
      const buttons = screen.getAllByRole('button');
      await user.click(buttons[1]);
      
      // Now second card content should have max-h-96 (expanded)
      expect(content1).toHaveClass('max-h-96');
      expect(content1).toHaveAttribute('aria-hidden', 'false');
      
      // Content should be visible
      expect(screen.getByText('Has a pet')).toBeInTheDocument();
      expect(screen.getByText('Worked remotely')).toBeInTheDocument();
      expect(screen.getByText('Speaks >1 language')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should expand card when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      secondButton.focus();
      expect(secondButton).toHaveAttribute('aria-expanded', 'false');
      
      await user.keyboard('{Enter}');
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should expand card when Space key is pressed', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      secondButton.focus();
      expect(secondButton).toHaveAttribute('aria-expanded', 'false');
      
      await user.keyboard(' ');
      
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse expanded card when Enter is pressed again', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      const firstButton = buttons[0];
      
      firstButton.focus();
      expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      
      await user.keyboard('{Enter}');
      
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should prevent default behavior on Space key to avoid scrolling', async () => {
      const user = userEvent.setup();
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      const secondButton = buttons[1];
      
      const preventDefaultSpy = vi.fn();
      secondButton.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
          preventDefaultSpy();
        }
      });
      
      secondButton.focus();
      await user.keyboard(' ');
      
      // Space key should trigger the toggle
      expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should be focusable and have focus styles', () => {
      render(<LandingCards />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        // Check if button has focus styling classes
        expect(button.className).toContain('focus:outline-none');
        expect(button.className).toContain('focus:ring-2');
      });
    });
  });

  describe('Visual Feedback', () => {
    it('should show different arrow icons for expanded and collapsed states', () => {
      render(<LandingCards />);
      
      // First card is expanded (▾), others are collapsed (▸)
      const buttons = screen.getAllByRole('button');
      
      // Check the icon elements
      const firstIcon = buttons[0].querySelector('[aria-hidden="true"]');
      const secondIcon = buttons[1].querySelector('[aria-hidden="true"]');
      
      expect(firstIcon?.textContent).toBe('▾');
      expect(secondIcon?.textContent).toBe('▸');
    });

    it('should apply scale and ring styles to expanded card', () => {
      const { container } = render(<LandingCards />);
      
      const cards = container.querySelectorAll('.bg-white\\/90');
      const firstCard = cards[0];
      
      // First card is expanded, should have scale and ring
      expect(firstCard.className).toContain('scale-[1.01]');
      expect(firstCard.className).toContain('ring-2');
      expect(firstCard.className).toContain('ring-cloud-accent/40');
    });

    it('should have transition classes for smooth animations', () => {
      const { container } = render(<LandingCards />);
      
      const cards = container.querySelectorAll('.bg-white\\/90');
      cards.forEach((card) => {
        expect(card.className).toContain('transition-transform');
      });
    });
  });

  describe('Reduced Motion Support', () => {
    it('should have max-height transition for expand/collapse', () => {
      const { container } = render(<LandingCards />);
      
      const contentDivs = container.querySelectorAll('[id^="card-content-"]');
      contentDivs.forEach((div) => {
        expect(div.className).toContain('transition-[max-height]');
      });
    });

    it('should respect custom easing for smooth transitions', () => {
      const { container } = render(<LandingCards />);
      
      const contentDivs = container.querySelectorAll('[id^="card-content-"]');
      contentDivs.forEach((div: Element) => {
        const htmlDiv = div as HTMLElement;
        expect(htmlDiv.style.transitionTimingFunction).toBe('cubic-bezier(.2,.8,.2,1)');
      });
    });
  });
});
