import { vi } from "vitest";
import React from "react";

export const MockAside = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="mock-aside">
    {children}
  </div>
);

export const MockDropDown = ({ 
  setNavSwitch, 
  switchWeekday, 
  dropdownItems, 
  navSwitch 
}: any) => (
  <div data-testid="mock-dropdown" data-navswitch={navSwitch}>
    <button onClick={() => setNavSwitch(!navSwitch)}>
      Dropdown Toggle
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
);

export const MockLink = ({ to, children, onClick }: any) => (
  <a href={to} onClick={onClick} data-testid={`link-${to}`}>
    {children}
  </a>
);

export const mockHeaderAssets = {
  menu: 'mocked-menu-icon.svg'
};

export const mockHeaderContextData = {
  basic: {
    currentWeekday: 1,
    setWeekday: vi.fn(),
    storedClasses: [],
    weekDays: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"],
    setClasses: vi.fn()
  },
  
  customWeekDays: {
    currentWeekday: 2,
    setWeekday: vi.fn(),
    storedClasses: [],
    weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    setClasses: vi.fn()
  }
};

export const headerTestScenarios = {

  closed: {
    description: "Header with dropdown closed",
    navSwitch: false,
    expectedDropdownVisible: false
  },

  opened: {
    description: "Header with dropdown opened", 
    navSwitch: true,
    expectedDropdownVisible: true
  }
};

export const simulateHeaderTitleClick = (setWeekday: any) => {
  return () => {
    setWeekday(new Date().getDay());
  };
};

export const simulateDropdownToggle = (navSwitch: boolean, setNavSwitch: any) => {
  const newState = !navSwitch;
  setNavSwitch(newState);
  return newState;
};

export const simulateWeekdaySelection = (
  dayIndex: number, 
  switchWeekday: any, 
  setNavSwitch?: any
) => {
  switchWeekday(dayIndex);
  if (setNavSwitch) {
    setNavSwitch(false);
  }
};

export const verifyDropdownState = (navSwitch: boolean, expectedVisible: boolean) => {
  return navSwitch === expectedVisible;
};

export const getHeaderTestData = () => ({
  weekDays: mockHeaderContextData.basic.weekDays,
  customWeekDays: mockHeaderContextData.customWeekDays.weekDays,
  scenarios: headerTestScenarios
});
