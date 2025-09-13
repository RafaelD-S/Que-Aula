vi.mock('../aside/aside', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-aside">{children}</div>
  )
}));

vi.mock('./views/headerDropdown', () => ({
  default: ({ setNavSwitch, switchWeekday, dropdownItems, navSwitch }: any) => (
    <div data-testid="mock-dropdown" data-navswitch={navSwitch}>
      <button onClick={() => setNavSwitch(!navSwitch)} data-testid="dropdown-toggle">
        Toggle
      </button>
      {navSwitch && (
        <div data-testid="dropdown-items">
          {dropdownItems.map((item: string, index: number) => (
            <button 
              key={index} 
              onClick={() => switchWeekday(index)}
              data-testid={`dropdown-item-${index}`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Link: ({ to, children, onClick }: any) => (
      <a href={to} onClick={onClick} data-testid={`link-${to}`}>
        {children}
      </a>
    )
  }
});

vi.mock('../../assets/menu.svg', () => ({
  default: 'mocked-menu-icon.svg'
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../../context/AppContext';
import Header from './header';

const renderHeader = () => render(
  <MemoryRouter>
    <AppProvider>
      <Header />
    </AppProvider>
  </MemoryRouter>
);

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render header with all essential elements', () => {
      renderHeader();

      expect(screen.getByRole('banner')).toHaveClass('header');
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Que Aula?');
      expect(screen.getByTestId('link-/')).toHaveAttribute('href', '/');
      expect(screen.getByAltText('menu')).toHaveAttribute('src', 'mocked-menu-icon.svg');
      expect(screen.getByTestId('mock-aside')).toBeInTheDocument();
      expect(screen.getByTestId('mock-dropdown')).toBeInTheDocument();
    });

    it('should have proper semantic structure and accessibility', () => {
      renderHeader();

      const headerTitle = document.querySelector('.header__title');
      const menuFigure = document.querySelector('.header__menu');
      const menuIcon = screen.getByAltText('menu');
      
      expect(headerTitle).toContainElement(screen.getByTestId('link-/'));
      expect(headerTitle).toContainElement(screen.getByTestId('mock-aside'));
      expect(menuFigure).toContainElement(menuIcon);
      expect(screen.getByTestId('mock-aside')).toContainElement(menuIcon);
    });
  });

  describe('Interactions', () => {
    it('should handle navigation and dropdown interactions', async () => {
      renderHeader();

      const homeLink = screen.getByTestId('link-/');
      const dropdownToggle = screen.getByTestId('dropdown-toggle');
      const dropdown = screen.getByTestId('mock-dropdown');
      
      await userEvent.click(homeLink);
      expect(homeLink).toBeInTheDocument();
      
      expect(dropdown).toHaveAttribute('data-navswitch', 'false');
      
      await userEvent.click(dropdownToggle);
      expect(dropdown).toHaveAttribute('data-navswitch', 'true');
      expect(screen.getByTestId('dropdown-items')).toBeInTheDocument();
      
      const dayButtons = screen.getAllByTestId(/dropdown-item-\d/);
      expect(dayButtons).toHaveLength(5);
      await userEvent.click(dayButtons[0]);
      
      await userEvent.click(dropdownToggle);
      expect(dropdown).toHaveAttribute('data-navswitch', 'false');
    });

    it('should handle header title section click', async () => {
      renderHeader();

      const headerTitleSection = document.querySelector('.header__title');
      expect(headerTitleSection).toBeInTheDocument();
      
      await userEvent.click(headerTitleSection!);
      expect(headerTitleSection).toBeInTheDocument();
    });

    it('should handle multiple sequential interactions', async () => {
      renderHeader();

      const homeLink = screen.getByTestId('link-/');
      const dropdownToggle = screen.getByTestId('dropdown-toggle');
      
      await userEvent.click(homeLink);
      await userEvent.click(dropdownToggle);
      await userEvent.click(homeLink);
      
      expect(homeLink).toBeInTheDocument();
      expect(dropdownToggle).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work with AppContext and React Router', () => {
      renderHeader();

      const header = screen.getByRole('banner');
      const dropdown = screen.getByTestId('mock-dropdown');
      const homeLink = screen.getByTestId('link-/');
      
      expect(header).toBeInTheDocument();
      expect(dropdown).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('should maintain responsive structure', () => {
      renderHeader();

      const header = screen.getByRole('banner');
      const headerTitle = document.querySelector('.header__title');
      const dropdown = screen.getByTestId('mock-dropdown');
      
      expect(header).toBeInTheDocument();
      expect(headerTitle).toBeInTheDocument();
      expect(dropdown).toBeInTheDocument();
    });
  });
});

