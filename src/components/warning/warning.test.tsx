import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Warning from "./warning";
import { render } from "../../test/utils/renderWithProviders";

describe('Warning Component', () => {
    describe('Initial State', () => {
        it('should render correctly when opened', () => {
            render(<Warning message="alerta" opened={true} />);
            expect(screen.getByText('alerta')).toBeInTheDocument();
        })

        it('should render correctly when closed', () => {
            render(<Warning message="alerta" opened={false} />);
            expect(screen.queryByText('alerta')).not.toBeInTheDocument();
        })

        it('should render children correctly', () => {
            render(
                <Warning message="teste">
                    <button>Botão de teste</button>
                </Warning>
            );

            expect(screen.getByText('Botão de teste')).toBeInTheDocument();
            expect(screen.queryByText('teste')).not.toBeInTheDocument();
        })

        it('should apply warning__opener class to children container', () => {
            render(
                <Warning message="teste">
                    <span>Conteúdo</span>
                </Warning>
            );
            
            const childrenElement = screen.getByText('Conteúdo');
            const container = childrenElement.parentElement;
            
            expect(container).toHaveClass('warning__opener');
        });
    })

    describe('Props and Configuration', () => {
        it('should render button when buttonLabel is provided', () => {
            render(
                <Warning message="teste"
                buttonLabel="Confirmar"
                opened={true}
                />
            );

            const button = screen.getByRole('button', { name: 'Confirmar' });
            expect(button).toBeInTheDocument();
        });

        it('should return only children when disabled={true}', () => {
            render(
                <Warning message="não deve aparecer" disabled={true}>
                <span>Apenas isso</span>
                </Warning>
            );
            
            expect(screen.getByText('Apenas isso')).toBeInTheDocument();
            expect(screen.queryByText('não deve aparecer')).not.toBeInTheDocument();
            const span = screen.getByText('Apenas isso');
            expect(span.parentElement).not.toHaveClass('warning__opener');
        });

        it('should apply correct class to button based on warning type', () => {
            render(
            <Warning 
                message="teste" 
                buttonLabel="OK" 
                type="warning"
                opened={true} 
            />
            );
            
            const button = screen.getByRole('button', { name: 'OK' });
            expect(button).toHaveClass('warning__content__button--warning');
        });
    })

    describe('User Interactions', () => {
        it('should open modal when clicking on children element', async () => {
            const user = userEvent.setup();
            
            render(
                <Warning message="teste">
                    <button>Trigger</button>
                </Warning>
            )

            expect(screen.getByText('Trigger')).toBeInTheDocument();
            expect(screen.queryByText('teste')).not.toBeInTheDocument();

            await user.click(screen.getByText('Trigger'));

            expect(screen.getByText('teste')).toBeInTheDocument();
        })

        it('should allow opening and closing modal multiple times', async () => {
            const user = userEvent.setup();

            render(
                <Warning message="teste" buttonLabel="Fechar">
                    <button>Abrir</button>
                </Warning>
            )

            await user.click(screen.getByText('Abrir'));
            expect(screen.queryByText('teste')).toBeInTheDocument();
            await user.click(screen.getByRole('button', {name: 'Fechar'}));
            expect(screen.queryByText('teste')).not.toBeInTheDocument();

            await user.click(screen.getByText('Abrir'));
            expect(screen.queryByText('teste')).toBeInTheDocument();
            await user.click(screen.getByRole('button', {name: 'Fechar'}));
            expect(screen.queryByText('teste')).not.toBeInTheDocument();
        })

        it('should call onClickButton when button is clicked', async () => {
            const mockCallback = vi.fn();
            const user = userEvent.setup();
            
            render(
                <Warning 
                message="teste"
                buttonLabel="Ação"
                onClickButton={mockCallback}
                opened={true}
                />
            );
            
            await user.click(screen.getByRole('button', { name: 'Ação' }));
            expect(mockCallback).toHaveBeenCalledOnce();
        });
        
    });

    describe('Edge Cases', () => {
        it('should work without children', () => {
            render(<Warning message="sem children" opened={true} />);
            expect(screen.getByText('sem children')).toBeInTheDocument();
        });

        it('should handle empty message', () => {
            render(<Warning message="" opened={true} />);
            
            const title = document.querySelector('.warning__content__title');
            expect(title).toBeInTheDocument();
            expect(title?.textContent).toBe('');
        });

        it('should accept different types of children', () => {
            render(
            <Warning message="teste">
                <div>
                <span>Texto</span>
                <button>Botão</button>
                </div>
            </Warning>
            );
            
            expect(screen.getByText('Texto')).toBeInTheDocument();
            expect(screen.getByText('Botão')).toBeInTheDocument();
        });
    });
})