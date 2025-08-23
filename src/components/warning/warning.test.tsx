import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Warning from "./warning";
import { render } from "../../test/utils/renderWithProviders";

describe('Warning Component', () => {
    describe('Estado Inicial', () => {
        it('deve renderizar corretamente quando aberto', () => {
            render(<Warning message="alerta" opened={true} />);
            expect(screen.getByText('alerta')).toBeInTheDocument();
        })

        it('deve renderizar corretamente quando fechado', () => {
            render(<Warning message="alerta" opened={false} />);
            expect(screen.queryByText('alerta')).not.toBeInTheDocument();
        })

        it('deve renderizar o children corretamente', () => {
            render(
                <Warning message="teste">
                    <button>Botão de teste</button>
                </Warning>
            );

            expect(screen.getByText('Botão de teste')).toBeInTheDocument();
            expect(screen.queryByText('teste')).not.toBeInTheDocument();
        })

        it('deve aplicar classe warning__opener ao container do children', () => {
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

    describe('Props e Configurações', () => {
        it('deve renderizar botão quando buttonLabel é fornecido', () => {
            render(
                <Warning message="teste"
                buttonLabel="Confirmar"
                opened={true}
                />
            );

            const button = screen.getByRole('button', { name: 'Confirmar' });
            expect(button).toBeInTheDocument();
        });

        it('deve retornar apenas children quando disabled={true}', () => {
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

        it('deve aplicar classe correta no botão baseada no tipo warning', () => {
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

    describe('Interações do Usuário', () => {
        it('deve abrir o modal ao clicar no elemento chidren', async () => {
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

        it('deve permitir abrir e fechar o modal multiplas vezes', async () => {
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

        it('deve chamar onClickButton quando botão é clicado', async () => {
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

    describe('Casos Extremos', () => {
        it('deve funcionar sem children', () => {
            render(<Warning message="sem children" opened={true} />);
            expect(screen.getByText('sem children')).toBeInTheDocument();
        });

        it('deve lidar com mensagem vazia', () => {
            render(<Warning message="" opened={true} />);
            
            const title = document.querySelector('.warning__content__title');
            expect(title).toBeInTheDocument();
            expect(title?.textContent).toBe('');
        });

        it('deve aceitar diferentes tipos de children', () => {
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