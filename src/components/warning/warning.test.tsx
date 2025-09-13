import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Warning from "./warning";
import { render } from "../../test/utils/renderWithProviders";

describe('Warning Component', () => {
  describe('Rendering and States', () => {
    it('should render correctly in different states and configurations', () => {
      const { unmount: unmount1 } = render(<Warning message="alerta" opened={true} />);
      expect(screen.getByText('alerta')).toBeInTheDocument();
      unmount1();
      
      const { unmount: unmount2 } = render(<Warning message="alerta" opened={false} />);
      expect(screen.queryByText('alerta')).not.toBeInTheDocument();
      unmount2();
      
      const { unmount: unmount3 } = render(
        <Warning message="teste">
          <button>Botão de teste</button>
        </Warning>
      );
      expect(screen.getByText('Botão de teste')).toBeInTheDocument();
      expect(screen.queryByText('teste')).not.toBeInTheDocument();
      
      const childrenElement = screen.getByText('Botão de teste');
      const container = childrenElement.parentElement;
      expect(container).toHaveClass('warning__opener');
      unmount3();
    });

    it('should handle button rendering and configurations correctly', () => {
      const { unmount: unmount1 } = render(
        <Warning message="teste" buttonLabel="Confirmar" opened={true} />
      );
      const button = screen.getByRole('button', { name: 'Confirmar' });
      expect(button).toBeInTheDocument();
      unmount1();
      
      const { unmount: unmount2 } = render(
        <Warning 
          message="teste" 
          buttonLabel="OK" 
          type="warning"
          opened={true} 
        />
      );
      const warningButton = screen.getByRole('button', { name: 'OK' });
      expect(warningButton).toHaveClass('warning__content__button--warning');
      unmount2();
    });

    it('should handle disabled state and edge cases properly', () => {
      const { unmount: unmount1 } = render(
        <Warning message="não deve aparecer" disabled={true}>
          <span>Apenas isso</span>
        </Warning>
      );
      expect(screen.getByText('Apenas isso')).toBeInTheDocument();
      expect(screen.queryByText('não deve aparecer')).not.toBeInTheDocument();
      const span = screen.getByText('Apenas isso');
      expect(span.parentElement).not.toHaveClass('warning__opener');
      unmount1();
      
      const { unmount: unmount2 } = render(<Warning message="sem children" opened={true} />);
      expect(screen.getByText('sem children')).toBeInTheDocument();
      unmount2();
      
      const { unmount: unmount3 } = render(<Warning message="" opened={true} />);
      const title = document.querySelector('.warning__content__title');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe('');
      unmount3();
    });
  });

  describe('User Interactions', () => {
    it('should handle modal opening/closing and button interactions correctly', async () => {
      const user = userEvent.setup();
      
      const { unmount: unmount1 } = render(
        <Warning message="teste">
          <button>Trigger</button>
        </Warning>
      );
      
      expect(screen.getByText('Trigger')).toBeInTheDocument();
      expect(screen.queryByText('teste')).not.toBeInTheDocument();
      
      await user.click(screen.getByText('Trigger'));
      expect(screen.getByText('teste')).toBeInTheDocument();
      unmount1();
      
      const { unmount: unmount2 } = render(
        <Warning message="teste" buttonLabel="Fechar">
          <button>Abrir</button>
        </Warning>
      );
      
      await user.click(screen.getByText('Abrir'));
      expect(screen.queryByText('teste')).toBeInTheDocument();
      await user.click(screen.getByRole('button', {name: 'Fechar'}));
      expect(screen.queryByText('teste')).not.toBeInTheDocument();
      
      await user.click(screen.getByText('Abrir'));
      expect(screen.queryByText('teste')).toBeInTheDocument();
      await user.click(screen.getByRole('button', {name: 'Fechar'}));
      expect(screen.queryByText('teste')).not.toBeInTheDocument();
      unmount2();
    });

    it('should handle button callbacks and complex children correctly', async () => {
      const mockCallback = vi.fn();
      const user = userEvent.setup();
      
      const { unmount: unmount1 } = render(
        <Warning 
          message="teste"
          buttonLabel="Ação"
          onClickButton={mockCallback}
          opened={true}
        />
      );
      
      await user.click(screen.getByRole('button', { name: 'Ação' }));
      expect(mockCallback).toHaveBeenCalledOnce();
      unmount1();
      
      const { unmount: unmount2 } = render(
        <Warning message="teste">
          <div>
            <span>Texto</span>
            <button>Botão</button>
          </div>
        </Warning>
      );
      
      expect(screen.getByText('Texto')).toBeInTheDocument();
      expect(screen.getByText('Botão')).toBeInTheDocument();
      unmount2();
    });
  });
});