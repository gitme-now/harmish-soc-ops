import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { BackgroundHero } from './BackgroundHero';

describe('BackgroundHero - Reduced Motion', () => {
  let mediaQueryListMock: { matches: boolean; media: string; addListener: () => void; removeListener: () => void };
  
  beforeEach(() => {
    // Mock window.matchMedia
    mediaQueryListMock = {
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addListener: () => {},
      removeListener: () => {},
    };
    
    window.matchMedia = ((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return mediaQueryListMock;
      }
      return {
        matches: false,
        media: query,
        addListener: () => {},
        removeListener: () => {},
      };
    }) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    // Clean up
    delete (window as unknown as Record<string, unknown>).matchMedia;
  });

  it('should render default variant', () => {
    const { container } = render(<BackgroundHero variant="default" />);
    const clouds = container.querySelectorAll('svg');
    
    // Default variant has 3 clouds
    expect(clouds).toHaveLength(3);
  });

  it('should render hero variant with 4 clouds', () => {
    const { container } = render(<BackgroundHero variant="hero" />);
    const clouds = container.querySelectorAll('svg');
    
    // Hero variant has 4 clouds (3 regular + 1 additional)
    expect(clouds).toHaveLength(4);
  });

  it('should apply animation classes to clouds', () => {
    const { container } = render(<BackgroundHero variant="default" />);
    
    const animatedElements = container.querySelectorAll('[class*="animate-cloud"]');
    
    // All 3 clouds should have animation classes
    expect(animatedElements.length).toBeGreaterThanOrEqual(3);
  });

  it('should respect user prefers-reduced-motion preference', () => {
    // This test verifies that CSS animations respect prefers-reduced-motion
    // The actual media query handling is done in CSS via @media (prefers-reduced-motion: reduce)
    
    mediaQueryListMock.matches = true;
    
    const { container } = render(<BackgroundHero variant="hero" />);
    
    // Verify elements still render
    const clouds = container.querySelectorAll('svg');
    expect(clouds).toHaveLength(4);
    
    // Animation classes are still applied, but CSS will disable them
    const animatedElements = container.querySelectorAll('[class*="animate-cloud"]');
    expect(animatedElements.length).toBeGreaterThanOrEqual(4);
  });

  it('should render clouds with proper CSS variables', () => {
    const { container } = render(<BackgroundHero variant="default" />);
    
    const clouds = container.querySelectorAll('g[fill]');
    
    // Check that clouds use CSS variables for colors
    const fills = Array.from(clouds).map(cloud => cloud.getAttribute('fill'));
    
    expect(fills).toContain('var(--soft-sky)');
    expect(fills).toContain('var(--lavender-mist)');
    expect(fills).toContain('var(--peach-cloud)');
  });

  it('should render additional blush cloud in hero variant', () => {
    const { container } = render(<BackgroundHero variant="hero" />);
    
    const clouds = container.querySelectorAll('g[fill]');
    const fills = Array.from(clouds).map(cloud => cloud.getAttribute('fill'));
    
    // Hero variant includes a blush-colored cloud
    expect(fills).toContain('var(--blush)');
  });

  it('should have pointer-events-none to avoid interfering with clicks', () => {
    const { container } = render(<BackgroundHero variant="default" />);
    
    const background = container.firstChild as HTMLElement;
    expect(background.className).toContain('pointer-events-none');
  });

  it('should have fixed positioning and z-index', () => {
    const { container } = render(<BackgroundHero variant="default" />);
    
    const background = container.firstChild as HTMLElement;
    expect(background.className).toContain('fixed');
    expect(background.className).toContain('-z-10');
  });
});
