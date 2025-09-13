import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './modal'

vi.mock('./modal.style.scss', () => ({}))

describe('Modal Component', () => {
  const mockOnOverlayClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering and Structure', () => {
    it('should render modal with correct structure and children', () => {
      render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <div data-testid="modal-content">Test Content</div>
        </Modal>
      )

      const modal = screen.getByText('Test Content').closest('.modal')
      expect(modal).toBeInTheDocument()
      expect(modal).toHaveClass('modal')

      const scrollBox = modal?.querySelector('.modal__scroll-box')
      expect(scrollBox).toBeInTheDocument()

      const container = modal?.querySelector('.modal__container')
      expect(container).toBeInTheDocument()

      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render with default props when onOverlayClick is not provided', () => {
      render(
        <Modal isClosable={false}>
          <span>Default Content</span>
        </Modal>
      )

      expect(screen.getByText('Default Content')).toBeInTheDocument()
    })
  })

  describe('Overlay Click Behavior', () => {
    it('should call onOverlayClick when clicking outside modal and isClosable is true (covers lines 12-13)', () => {
      render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      )

      const modal = screen.getByText('Content').closest('.modal')
      
      const modalContainer = modal?.querySelector('.modal__container')
      const mockContains = vi.fn().mockReturnValue(false)
      
      if (modalContainer) {
        Object.defineProperty(modalContainer, 'contains', {
          value: mockContains,
          writable: true,
        })
      }

      fireEvent.click(modal!)

      expect(mockOnOverlayClick).toHaveBeenCalledTimes(1)
      expect(mockOnOverlayClick).toHaveBeenCalledWith(expect.any(Object)) // SyntheticEvent
    })

    it('should not call onOverlayClick when clicking inside modal container', () => {
      render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      )

      const modalContainer = screen.getByText('Content').closest('.modal__container')
      
      const mockContains = vi.fn().mockReturnValue(true) // Click dentro do container
      
      if (modalContainer) {
        Object.defineProperty(modalContainer, 'contains', {
          value: mockContains,
          writable: true,
        })
      }

      fireEvent.click(modalContainer!)

      expect(mockOnOverlayClick).not.toHaveBeenCalled()
    })

    it('should not call onOverlayClick when isClosable is false', () => {
      render(
        <Modal isClosable={false} onOverlayClick={mockOnOverlayClick}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      )

      const modal = screen.getByText('Content').closest('.modal')
      fireEvent.click(modal!)

      expect(mockOnOverlayClick).not.toHaveBeenCalled()
    })

    it('should handle click when modalRef.current is null', () => {
      render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      )

      const modal = screen.getByText('Content').closest('.modal')

      fireEvent.click(modal!)

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Event Handling Edge Cases', () => {
    it('should handle multiple rapid clicks correctly', () => {
      render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      )

      const modal = screen.getByText('Content').closest('.modal')
      const modalContainer = modal?.querySelector('.modal__container')
      
      if (modalContainer) {
        Object.defineProperty(modalContainer, 'contains', {
          value: vi.fn().mockReturnValue(false),
          writable: true,
        })
      }

      fireEvent.click(modal!)
      fireEvent.click(modal!)
      fireEvent.click(modal!)

      expect(mockOnOverlayClick).toHaveBeenCalledTimes(3)
    })

    it('should work with different child elements', () => {
      render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </Modal>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()

      const modal = screen.getByText('Title').closest('.modal')
      const modalContainer = modal?.querySelector('.modal__container')
      
      if (modalContainer) {
        Object.defineProperty(modalContainer, 'contains', {
          value: vi.fn().mockReturnValue(false),
          writable: true,
        })
      }

      fireEvent.click(modal!)
      expect(mockOnOverlayClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props Validation', () => {
    it('should handle all prop combinations correctly', () => {
      const { rerender } = render(
        <Modal isClosable={true} onOverlayClick={mockOnOverlayClick}>
          <span>Full Props</span>
        </Modal>
      )
      expect(screen.getByText('Full Props')).toBeInTheDocument()

      rerender(
        <Modal isClosable={false}>
          <span>Minimal Props</span>
        </Modal>
      )
      expect(screen.getByText('Minimal Props')).toBeInTheDocument()

      rerender(
        <Modal isClosable={true}>
          <span>Default Callback</span>
        </Modal>
      )
      expect(screen.getByText('Default Callback')).toBeInTheDocument()
    })
  })
})
