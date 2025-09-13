import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Aside from './aside';

vi.mock('../footer/footer', () => ({
  default: ({ hasCredits }: { hasCredits?: boolean }) => (
    <div data-testid="mock-footer">
      Footer Mock {hasCredits ? "with credits" : "without credits"}
    </div>
  )
}));

vi.mock('react-router-dom', () => ({
  Link: ({ to, children, onClick }: any) => (
    <a href={to} onClick={onClick} data-testid={`link-${to}`}>
      {children}
    </a>
  ),
  MemoryRouter: ({ children }: any) => <div>{children}</div>
}));

vi.mock('../../assets/close.svg', () => ({
  default: 'mocked-close-icon.svg'
}));

vi.mock('/logo.svg', () => ({
  default: 'mocked-logo.svg'
}));

const renderAside = () => render(
  <MemoryRouter>
    <AppProvider>
      <Aside>
        <span data-testid="aside-trigger">Menu</span>
      </Aside>
    </AppProvider>
  </MemoryRouter>
);

describe('Aside Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render trigger and open/close aside with all elements', async () => {
      renderAside();

      const trigger = screen.getByTestId('aside-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger.textContent).toBe('Menu');
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

      await userEvent.click(trigger);
      expect(screen.getByRole('navigation')).toHaveClass('aside__main__nav');
      expect(screen.getByAltText('close')).toHaveAttribute('src', 'mocked-close-icon.svg');
      expect(screen.getByTestId('mock-footer')).toHaveTextContent('without credits');
      
      const logoElement = document.querySelector('.aside__header__logo img');
      expect(logoElement).toHaveAttribute('src', 'mocked-logo.svg');
      
      const homeLinks = screen.getAllByTestId('link-/');
      expect(homeLinks).toHaveLength(2);
      expect(screen.getByTestId('link-/todas-as-aulas')).toBeInTheDocument();
      expect(screen.getByTestId('link-/fluxograma')).toBeInTheDocument();
      expect(screen.getByText('Página Inicial')).toBeInTheDocument();
      expect(screen.getByText('Todas as Aulas')).toBeInTheDocument();
      expect(screen.getByText('Fluxograma')).toBeInTheDocument();
      
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(4);
    });
  });

  describe('Interactions', () => {
    it('should close aside via close button, links, logo, and overlay', async () => {
      renderAside();
      const trigger = screen.getByTestId('aside-trigger');

      await userEvent.click(trigger);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      const closeButton = screen.getByAltText('close');
      await userEvent.click(closeButton);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

      await userEvent.click(trigger);
      const homeLink = screen.getByText('Página Inicial');
      await userEvent.click(homeLink);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

      await userEvent.click(trigger);
      const logoLink = document.querySelector('.aside__header__logo');
      await userEvent.click(logoLink!);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

      await userEvent.click(trigger);
      const overlay = document.querySelector('.aside');
      await userEvent.click(overlay!);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('should handle multiple state transitions correctly', async () => {
      renderAside();
      const trigger = screen.getByTestId('aside-trigger');
      
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      
      await userEvent.click(trigger);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      const closeButton = screen.getByAltText('close');
      await userEvent.click(closeButton);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      
      await userEvent.click(trigger);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      const homeLink = screen.getByText('Página Inicial');
      await userEvent.click(homeLink);
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work with AppContext and maintain accessibility', async () => {
      renderAside();
      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Página Inicial')).toBeInTheDocument();
      
      const navigation = screen.getByRole('navigation');
      expect(navigation).toHaveClass('aside__main__nav');
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });
  });
});
