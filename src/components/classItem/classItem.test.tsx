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

  describe('Loading State', () => {
    it('should display shimmer when loading is true', () => {
      const { container } = render(<ClassItem {...getLoadingClassItemProps()} />);
      
      const shimmerElement = container.querySelector('.class-item.shimmer');
      expect(shimmerElement).toBeInTheDocument();
      expect(shimmerElement).toHaveClass('class-item', 'shimmer');
    });

    it('should display shimmer when data is undefined', () => {
      const { container } = render(<ClassItem {...getNoDataClassItemProps()} />);
      
      const shimmerElement = container.querySelector('.class-item.shimmer');
      expect(shimmerElement).toBeInTheDocument();
    });

    it('should not display content when in loading state', () => {
      render(<ClassItem {...getLoadingClassItemProps()} />);
      
      expect(screen.queryByText(mockClassItemDefault.name!)).not.toBeInTheDocument();
      expect(screen.queryByText(mockClassItemDefault.description!)).not.toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('should render empty state correctly', () => {
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemEmpty)} />
      );
      
      const emptyElement = container.querySelector('.class-item--empty');
      expect(emptyElement).toBeInTheDocument();
      expect(emptyElement).toHaveClass('class-item', 'class-item--empty');
    });

    it('should render empty-through state correctly', () => {
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemEmptyThrough)} />
      );
      
      const emptyThroughElement = container.querySelector('.class-item--empty-through');
      expect(emptyThroughElement).toBeInTheDocument();
      expect(emptyThroughElement).toHaveClass('class-item', 'class-item--empty-through');
    });

    it('should not display content for empty states', () => {
      render(<ClassItem {...getCustomClassItemProps(mockClassItemEmpty)} />);
      
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.queryByText(/checkbox/i)).not.toBeInTheDocument();
    });
  });

  describe('Basic Rendering', () => {
    it('should render class item with all content', () => {
      render(<ClassItem {...getDefaultClassItemProps()} />);
      
      expect(screen.getByRole('heading', { name: mockClassItemDefault.name })).toBeInTheDocument();
      expect(screen.getByText(mockClassItemDefault.description!)).toBeInTheDocument();
      expect(screen.getByText(mockClassItemDefault.credit!)).toBeInTheDocument();
    });

    it('should apply correct CSS classes for default state', () => {
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      
      const classItemElement = container.querySelector('.class-item');
      expect(classItemElement).toHaveClass('class-item', mockClassItemDefault.name!, 'class-item--default');
    });

    it('should render checkbox with correct state class', () => {
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      
      const checkboxElement = container.querySelector('.class-item__checkbox');
      expect(checkboxElement).toBeInTheDocument();
      expect(checkboxElement).toHaveClass('class-item__checkbox', 'class-item__checkbox--default');
    });

    it('should structure content correctly', () => {
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      
      expect(container.querySelector('.class-item__content')).toBeInTheDocument();
      expect(container.querySelector('.class-item__title')).toBeInTheDocument();
      expect(container.querySelector('.class-item__description')).toBeInTheDocument();
      expect(container.querySelector('.class-item__credit')).toBeInTheDocument();
    });
  });

  describe('Different States Rendering', () => {
    it('should render selected state correctly', () => {
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemSelected)} />
      );
      
      const classItemElement = container.querySelector('.class-item');
      const checkboxElement = container.querySelector('.class-item__checkbox');
      
      expect(classItemElement).toHaveClass('class-item--selected');
      expect(checkboxElement).toHaveClass('class-item__checkbox--selected');
    });

    it('should render disabled state correctly', () => {
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemDisabled)} />
      );
      
      const classItemElement = container.querySelector('.class-item');
      const checkboxElement = container.querySelector('.class-item__checkbox');
      
      expect(classItemElement).toHaveClass('class-item--disabled');
      expect(checkboxElement).toHaveClass('class-item__checkbox--disabled');
    });

    it('should use default state when state is not provided', () => {
      const itemWithoutState = { ...mockClassItemMinimal };
      delete itemWithoutState.state;
      
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(itemWithoutState)} />
      );
      
      const classItemElement = container.querySelector('.class-item');
      expect(classItemElement).toHaveClass('class-item--default');
    });
  });

  describe('Content Variations', () => {
    it('should handle minimal data correctly', () => {
      render(<ClassItem {...getCustomClassItemProps(mockClassItemMinimal)} />);
      
      expect(screen.getByRole('heading', { name: mockClassItemMinimal.name })).toBeInTheDocument();
      expect(screen.getByText(mockClassItemMinimal.description!)).toBeInTheDocument();
      expect(screen.getByText(mockClassItemMinimal.credit!)).toBeInTheDocument();
    });

    it('should handle long description correctly', () => {
      render(<ClassItem {...getCustomClassItemProps(mockClassItemLongDescription)} />);
      
      expect(screen.getByText(mockClassItemLongDescription.description!)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: mockClassItemLongDescription.name })).toBeInTheDocument();
    });
  });

  describe('Click Interactions', () => {
    it('should call onStateChange when item is clicked (default → disabled)', async () => {
      const user = userEvent.setup();
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      
      const classItemElement = container.querySelector('.class-item')!;
      await user.click(classItemElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDefault.name, 'disabled');
    });

    it('should call onStateChange when item is clicked (selected → default)', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemSelected)} />
      );
      
      const classItemElement = container.querySelector('.class-item')!;
      await user.click(classItemElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemSelected.name, 'default');
    });

    it('should call onStateChange when item is clicked (disabled → default)', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemDisabled)} />
      );
      
      const classItemElement = container.querySelector('.class-item')!;
      await user.click(classItemElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDisabled.name, 'default');
    });
  });

  describe('Checkbox Interactions', () => {
    it('should call onStateChange when checkbox is clicked (default → selected)', async () => {
      const user = userEvent.setup();
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      
      const checkboxElement = container.querySelector('.class-item__checkbox')!;
      await user.click(checkboxElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDefault.name, 'selected');
    });

    it('should call onStateChange when checkbox is clicked (selected → default)', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemSelected)} />
      );
      
      const checkboxElement = container.querySelector('.class-item__checkbox')!;
      await user.click(checkboxElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemSelected.name, 'default');
    });

    it('should call onStateChange when checkbox is clicked (disabled → default)', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(mockClassItemDisabled)} />
      );
      
      const checkboxElement = container.querySelector('.class-item__checkbox')!;
      await user.click(checkboxElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDisabled.name, 'default');
    });

    it('should prevent event propagation when checkbox is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<ClassItem {...getDefaultClassItemProps()} />);
      
      const checkboxElement = container.querySelector('.class-item__checkbox')!;
      await user.click(checkboxElement);
      
      expect(mockOnStateChange).toHaveBeenCalledTimes(1);
      expect(mockOnStateChange).toHaveBeenCalledWith(mockClassItemDefault.name, 'selected');
    });
  });

  describe('Default Props', () => {
    it('should not throw error when onStateChange is not provided', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ClassItem data={mockClassItemDefault} loading={false} />
      );
      
      const classItemElement = container.querySelector('.class-item')!;
      
      await expect(user.click(classItemElement)).resolves.not.toThrow();
    });

    it('should not throw error when checkbox is clicked without onStateChange', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <ClassItem data={mockClassItemDefault} loading={false} />
      );
      
      const checkboxElement = container.querySelector('.class-item__checkbox')!;
      
      await expect(user.click(checkboxElement)).resolves.not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined name in onStateChange', async () => {
      const user = userEvent.setup();
      const itemWithoutName = { ...mockClassItemDefault };
      delete itemWithoutName.name;
      
      const { container } = render(
        <ClassItem {...getCustomClassItemProps(itemWithoutName)} />
      );
      
      const classItemElement = container.querySelector('.class-item')!;
      await user.click(classItemElement);
      
      expect(mockOnStateChange).toHaveBeenCalledWith(undefined, 'disabled');
    });

    it('should render without crashing when all optional props are undefined', () => {
      const minimalItem = { credit: "30 - 2" };
      
      expect(() => {
        render(<ClassItem {...getCustomClassItemProps(minimalItem as any)} />);
      }).not.toThrow();
    });
  });

});
