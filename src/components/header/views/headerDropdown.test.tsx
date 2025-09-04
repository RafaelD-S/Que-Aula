import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderDropdown from "./headerDropdown";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ to, children, className, ...props }: any) => (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    ),
  };
});

vi.mock("../../../assets/arrow-down.svg", () => ({
  default: "/mocked-arrow-down.svg"
}));

vi.mock("./headerDropdown.style.scss", () => ({}));

const renderHeaderDropdown = (props = {}) => {
  const defaultProps = {
    setNavSwitch: vi.fn(),
    switchWeekday: vi.fn(),
    dropdownItems: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    navSwitch: false,
    ...props
  };

  return render(
    <BrowserRouter>
      <HeaderDropdown {...defaultProps} />
    </BrowserRouter>
  );
};

describe("HeaderDropdown Component", () => {
  describe("Rendering and Interactions", () => {
    it("should render correctly and handle all user interactions", () => {
      const mockSetNavSwitch = vi.fn();
      const mockSwitchWeekday = vi.fn();
      const dropdownItems = ["Segunda", "Terça", "Quarta"];
      
      const { rerender } = renderHeaderDropdown({ 
        setNavSwitch: mockSetNavSwitch,
        switchWeekday: mockSwitchWeekday,
        dropdownItems,
        navSwitch: false 
      });

      const button = screen.getByRole("button");
      const icon = screen.getByAltText("open-dropdown");
      
      expect(screen.getByText("Dias da Semana")).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "/mocked-arrow-down.svg");
      expect(button).toHaveClass("headerDropdown__button");
      expect(button).not.toHaveClass("headerDropdown__button--focus");
      expect(icon).not.toHaveClass("headerDropdown__button__icon--focus");
      
      expect(screen.queryByText("Segunda")).not.toBeInTheDocument();

      const nav = screen.getByRole("navigation");
      fireEvent.click(nav);
      expect(mockSetNavSwitch).toHaveBeenCalledWith(expect.any(Function));

      rerender(
        <BrowserRouter>
          <HeaderDropdown 
            setNavSwitch={mockSetNavSwitch}
            switchWeekday={mockSwitchWeekday}
            dropdownItems={dropdownItems}
            navSwitch={true}
          />
        </BrowserRouter>
      );

      const buttonOpen = screen.getByRole("button");
      const iconOpen = screen.getByAltText("open-dropdown");
      expect(buttonOpen).toHaveClass("headerDropdown__button--focus");
      expect(iconOpen).toHaveClass("headerDropdown__button__icon--focus");

      dropdownItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute("href", "/");
      expect(links[0]).toHaveClass("headerDropdown__link");

      const firstItem = screen.getByText("Segunda").closest(".headerDropdown-item");
      fireEvent.click(firstItem!);
      expect(mockSwitchWeekday).toHaveBeenCalledWith(1);
    });

    it("should handle edge cases and maintain proper structure", () => {
      renderHeaderDropdown({ dropdownItems: [], navSwitch: true });
      expect(screen.queryAllByRole("link")).toHaveLength(0);
      expect(screen.getByRole("button")).toBeInTheDocument();

      const { rerender } = renderHeaderDropdown({ 
        dropdownItems: ["Item & Special", "Item <tag>"], 
        navSwitch: true 
      });
      expect(screen.getByText("Item & Special")).toBeInTheDocument();
      expect(screen.getByText("Item <tag>")).toBeInTheDocument();

      rerender(
        <BrowserRouter>
          <HeaderDropdown 
            setNavSwitch={vi.fn()}
            switchWeekday={vi.fn()}
            dropdownItems={["Único Item"]}
            navSwitch={true}
          />
        </BrowserRouter>
      );
      expect(screen.getAllByRole("link")).toHaveLength(1);
      expect(screen.getByText("Único Item")).toBeInTheDocument();
    });

    it("should handle multiple clicks and maintain state management", () => {
      const mockSetNavSwitch = vi.fn((callback) => {
        const newValue = callback(false);
        expect(newValue).toBe(true);
      });
      const mockSwitchWeekday = vi.fn();
      
      renderHeaderDropdown({ 
        setNavSwitch: mockSetNavSwitch,
        switchWeekday: mockSwitchWeekday,
        navSwitch: true,
        dropdownItems: ["Item 1", "Item 2", "Item 3"]
      });

      const nav = screen.getByRole("navigation");
      fireEvent.click(nav);
      expect(mockSetNavSwitch).toHaveBeenCalledWith(expect.any(Function));

      const item1 = screen.getByText("Item 1").closest(".headerDropdown-item");
      const item3 = screen.getByText("Item 3").closest(".headerDropdown-item");

      mockSwitchWeekday.mockClear();
      fireEvent.click(item1!);
      fireEvent.click(item3!);

      expect(mockSwitchWeekday).toHaveBeenCalledTimes(2);
      expect(mockSwitchWeekday).toHaveBeenNthCalledWith(1, 1);
      expect(mockSwitchWeekday).toHaveBeenNthCalledWith(2, 3);

      expect(nav).toHaveClass("headerDropdown");
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
    });
  });
});
