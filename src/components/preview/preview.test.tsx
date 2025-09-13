import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Preview } from './preview';
import { mockPreviewClassesData } from '../../test/mocks/preview.mock';

describe('Preview Component', () => {
  describe('Rendering States', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <Preview
          isOpen={false}
          classesData={mockPreviewClassesData}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('should not render when isOpen is not provided (defaults to false)', () => {
      const { container } = render(
        <Preview classesData={mockPreviewClassesData} />
      );

      expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true', () => {
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
        />
      );

      expect(screen.getByText('Preview das Aulas')).toBeInTheDocument();
      expect(screen.getByText('Voltar')).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('should display the correct title', () => {
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
        />
      );

      const title = screen.getByText('Preview das Aulas');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('preview__title');
    });

    it('should render Calendar component with passed data', () => {
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
        />
      );

      expect(screen.getByText('Segunda')).toBeInTheDocument();
      expect(screen.getByText('Terça')).toBeInTheDocument();
    });

    it('should render return button with correct elements', () => {
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('preview__button');
      
      const buttonText = screen.getByText('Voltar');
      expect(buttonText).toHaveClass('preview__button__text');
      
      const buttonImage = screen.getByRole('img');
      expect(buttonImage).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onButtonClick when return button is clicked', () => {
      const mockOnButtonClick = vi.fn();
      
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
          onButtonClick={mockOnButtonClick}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    });

    it('should call onOverlayClick when modal overlay is clicked', () => {
      const mockOnOverlayClick = vi.fn();
      
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
          onOverlayClick={mockOnOverlayClick}
        />
      );

      const modal = screen.getByText('Preview das Aulas').closest('.modal');
      if (modal) {
        fireEvent.click(modal);
        expect(mockOnOverlayClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should use default empty functions when callbacks are not provided', () => {
      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
        />
      );

      const button = screen.getByRole('button');
      
      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty classesData array', () => {
      render(
        <Preview
          isOpen={true}
          classesData={[]}
        />
      );

      expect(screen.getByText('Preview das Aulas')).toBeInTheDocument();
      expect(screen.getByText('Voltar')).toBeInTheDocument();
    });

    it('should render properly with all props provided', () => {
      const mockOnOverlayClick = vi.fn();
      const mockOnButtonClick = vi.fn();

      render(
        <Preview
          isOpen={true}
          classesData={mockPreviewClassesData}
          onOverlayClick={mockOnOverlayClick}
          onButtonClick={mockOnButtonClick}
        />
      );

      expect(screen.getByText('Preview das Aulas')).toBeInTheDocument();
      expect(screen.getByText('Voltar')).toBeInTheDocument();
      expect(screen.getByText('Segunda')).toBeInTheDocument();
    });
  });
});
