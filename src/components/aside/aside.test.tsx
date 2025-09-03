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

const renderAsideWithContext = () => {
  return render(
    <MemoryRouter>
      <AppProvider>
        <Aside>
          <span data-testid="aside-trigger">Menu</span>
        </Aside>
      </AppProvider>
    </MemoryRouter>
  );
};

describe('Aside Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render the trigger (opener) correctly', () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger.textContent).toBe('Menu');
    });

    it('should initially render only the opener (closed)', () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      expect(trigger).toBeInTheDocument();

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(screen.queryByAltText('close')).not.toBeInTheDocument();
    });

    it('should open the aside when clicking the trigger', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByAltText('close')).toBeInTheDocument();
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
    });

    it('should show the logo when opened', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      const logoElement = document.querySelector('.aside__header__logo img');
      expect(logoElement).toBeInTheDocument();
      expect(logoElement).toHaveAttribute('src', 'mocked-logo.svg');
    });

    it('should show the close button when opened', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      const closeButton = screen.getByAltText('close');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('src', 'mocked-close-icon.svg');
    });
  });

  describe('Navigation Links', () => {
    it('should render all navigation links when opened', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);
      
      const homeLinks = screen.getAllByTestId('link-/');
      expect(homeLinks).toHaveLength(2);
      
      expect(screen.getByTestId('link-/todas-as-aulas')).toBeInTheDocument();
      expect(screen.getByTestId('link-/fluxograma')).toBeInTheDocument();
      
      expect(screen.getByText('Página Inicial')).toBeInTheDocument();
      expect(screen.getByText('Todas as Aulas')).toBeInTheDocument();
      expect(screen.getByText('Fluxograma')).toBeInTheDocument();
    });

    it('should close the aside when clicking a navigation link', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      const homeLink = screen.getByText('Página Inicial');
      await userEvent.click(homeLink);

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('should close the aside when clicking the logo', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      const logoLink = document.querySelector('.aside__header__logo');
      expect(logoLink).toBeInTheDocument();
      await userEvent.click(logoLink!);

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should close the aside when clicking the close button', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      const closeButton = screen.getByAltText('close');
      await userEvent.click(closeButton);

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('should close the aside when clicking the overlay (background)', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();

      const overlay = document.querySelector('.aside');
      expect(overlay).toBeInTheDocument();

      await userEvent.click(overlay!);

      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  describe('Footer Integration', () => {
    it('should render the Footer when opened', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      const footer = screen.getByTestId('mock-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('without credits');
    });
  });

  describe('Accessibility', () => {
    it('should have navigation with navigation role when opened', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveClass('aside__main__nav');
    });

    it('should have accessible links when opened', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(4);
      
      links.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('Component State', () => {
    it('should correctly control internal state', async () => {
      renderAsideWithContext();

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

  describe('Context Integration', () => {
    it('should work correctly with application context', async () => {
      renderAsideWithContext();

      const trigger = screen.getByTestId('aside-trigger');
      await userEvent.click(trigger);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    });
  });
});
