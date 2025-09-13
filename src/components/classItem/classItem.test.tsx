import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClassItem from "./classItem";
import {
  mockClassItemDefault,
  mockClassItemSelected,
  mockClassItemDisabled,
  mockClassItemEmpty,
  mockClassItemEmptyThrough,
  mockClassItemMinimal,
  mockClassItemLongDescription,
  mockOnStateChange,
  resetClassItemMocks,
  getDefaultClassItemProps,
  getLoadingClassItemProps,
  getNoDataClassItemProps,
  getCustomClassItemProps
} from "../../test/mocks/classItem.mock";

beforeEach(() => {
  resetClassItemMocks();
});

describe('ClassItem', () => {
  describe('Loading and Empty States', () => {
    it('should display shimmer for loading states and handle empty states correctly', () => {
      const { container: loadingContainer } = render(<ClassItem {...getLoadingClassItemProps()} />);
      const shimmerElement = loadingContainer.querySelector('.class-item.shimmer');
      expect(shimmerElement).toHaveClass('class-item', 'shimmer');
      expect(screen.queryByText(mockClassItemDefault.name!)).not.toBeInTheDocument();
      
      const { container: noDataContainer } = render(<ClassItem {...getNoDataClassItemProps()} />);
      const shimmerNoData = noDataContainer.querySelector('.class-item.shimmer');
      expect(shimmerNoData).toBeInTheDocument();
      
      const { container: emptyContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemEmpty)} />);
      const emptyElement = emptyContainer.querySelector('.class-item--empty');
      expect(emptyElement).toHaveClass('class-item', 'class-item--empty');
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      
      const { container: emptyThroughContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemEmptyThrough)} />);
      const emptyThroughElement = emptyThroughContainer.querySelector('.class-item--empty-through');
      expect(emptyThroughElement).toHaveClass('class-item', 'class-item--empty-through');
    });
  });

  describe('Rendering and Content', () => {
    it('should render content correctly with proper CSS classes for all states', () => {
      const { container: defaultContainer } = render(<ClassItem {...getDefaultClassItemProps()} />);
      expect(screen.getByRole('heading', { name: mockClassItemDefault.name })).toBeInTheDocument();
      expect(screen.getByText(mockClassItemDefault.description!)).toBeInTheDocument();
      expect(screen.getByText(mockClassItemDefault.credit!)).toBeInTheDocument();
      
      const defaultElement = defaultContainer.querySelector('.class-item');
      expect(defaultElement).toHaveClass('class-item', mockClassItemDefault.name!, 'class-item--default');
      expect(defaultContainer.querySelector('.class-item__checkbox--default')).toBeInTheDocument();
      
      const { container: selectedContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemSelected)} />);
      const selectedElement = selectedContainer.querySelector('.class-item');
      expect(selectedElement).toHaveClass('class-item', mockClassItemSelected.name!, 'class-item--selected');
      expect(selectedContainer.querySelector('.class-item__checkbox--selected')).toBeInTheDocument();
      
      const { container: disabledContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemDisabled)} />);
      const disabledElement = disabledContainer.querySelector('.class-item');
      expect(disabledElement).toHaveClass('class-item', mockClassItemDisabled.name!, 'class-item--disabled');
      expect(disabledContainer.querySelector('.class-item__checkbox--disabled')).toBeInTheDocument();
    });

    it('should handle content variations and maintain layout structure', () => {
      render(<ClassItem {...getCustomClassItemProps(mockClassItemLongDescription)} />);
      expect(screen.getByText(mockClassItemLongDescription.description!)).toBeInTheDocument();
      
      render(<ClassItem {...getCustomClassItemProps(mockClassItemMinimal)} />);
      expect(screen.getByRole('heading', { name: mockClassItemMinimal.name })).toBeInTheDocument();
      expect(screen.queryByText('undefined')).not.toBeInTheDocument();
      
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      expect(container.querySelector('.class-item__content')).toBeInTheDocument();
      expect(container.querySelector('.class-item__title')).toBeInTheDocument();
      expect(container.querySelector('.class-item__description')).toBeInTheDocument();
      expect(container.querySelector('.class-item__credit')).toBeInTheDocument();
    });
  });

  describe('Item Click Interactions', () => {
    it('should handle item click interactions and state transitions correctly', async () => {
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      const classItemElement = container.querySelector('.class-item') as HTMLElement;
      
      await userEvent.click(classItemElement);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDefault.name, 'disabled');
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      
      resetClassItemMocks();
      const { container: selectedContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemSelected)} />);
      const selectedElement = selectedContainer.querySelector('.class-item') as HTMLElement;
      
      await userEvent.click(selectedElement);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemSelected.name, 'default');
      
      resetClassItemMocks();
      const { container: disabledContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemDisabled)} />);
      const disabledElement = disabledContainer.querySelector('.class-item') as HTMLElement;
      
      await userEvent.click(disabledElement);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDisabled.name, 'default');
    });
  });

  describe('Checkbox Interactions', () => {
    it('should handle checkbox click interactions and state transitions correctly', async () => {
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      const checkboxElement = container.querySelector('.class-item__checkbox') as HTMLElement;
      
      await userEvent.click(checkboxElement);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDefault.name, 'selected');
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      
      resetClassItemMocks();
      const { container: selectedContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemSelected)} />);
      const selectedCheckbox = selectedContainer.querySelector('.class-item__checkbox') as HTMLElement;
      
      await userEvent.click(selectedCheckbox);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemSelected.name, 'default');
      
      resetClassItemMocks();
      const { container: disabledContainer } = render(<ClassItem {...getCustomClassItemProps(mockClassItemDisabled)} />);
      const disabledCheckbox = disabledContainer.querySelector('.class-item__checkbox') as HTMLElement;
      
      await userEvent.click(disabledCheckbox);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDisabled.name, 'default');
    });
  });

  describe('Accessibility and Edge Cases', () => {
    it('should maintain accessibility standards and handle edge cases properly', () => {
      const { unmount } = render(<ClassItem {...getDefaultClassItemProps()} />);
      expect(screen.getByRole('heading', { name: mockClassItemDefault.name })).toBeInTheDocument();
      unmount();
      
      const propsWithoutCallback = { ...getDefaultClassItemProps(), onStateChange: undefined };
      const { container, unmount: unmount2 } = render(<ClassItem {...propsWithoutCallback} />);
      expect(container.querySelector('.class-item')).toBeInTheDocument();
      unmount2();
      
      const mockWithUndefined = { ...mockClassItemDefault, description: undefined, credit: undefined };
      const { unmount: unmount3 } = render(<ClassItem {...getCustomClassItemProps(mockWithUndefined)} />);
      expect(screen.getByRole('heading', { name: mockWithUndefined.name })).toBeInTheDocument();
      expect(screen.queryByText('undefined')).not.toBeInTheDocument();
      unmount3();
      
      const minimalItem = { credit: "30 - 2" };
      expect(() => {
        render(<ClassItem {...getCustomClassItemProps(minimalItem as any)} />);
      }).not.toThrow();
    });

    it('should handle interactions without onStateChange callback gracefully', async () => {
      const { container } = render(<ClassItem data={mockClassItemDefault} loading={false} />);
      
      const classItemElement = container.querySelector('.class-item') as HTMLElement;
      const checkboxElement = container.querySelector('.class-item__checkbox') as HTMLElement;
      
      await expect(userEvent.click(classItemElement)).resolves.not.toThrow();
      await expect(userEvent.click(checkboxElement)).resolves.not.toThrow();
    });
  });
});
