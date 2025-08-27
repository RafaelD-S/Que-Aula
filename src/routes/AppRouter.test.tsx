import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setupRouterMocks, clearRouterMocks, mockNavigate } from "../test/mocks/router.mock";

beforeAll(() => {
    setupRouterMocks();
});

import AppRouter from "./AppRouter";

beforeEach(() => {
    clearRouterMocks();
});

describe('AppRouter', () => {
    it('should render Form component for /form route', () => {
        render(
            <MemoryRouter initialEntries={['/form']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByTestId('form-page')).toBeInTheDocument();
        expect(screen.getByText('Mocked Form Page')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-routes')).not.toBeInTheDocument();
    });
    
    it('should render <DayClasses /> for route /', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByTestId('day-classes-page')).toBeInTheDocument();
        expect(screen.getByText('Mocked DayClasses Page')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-routes')).toBeInTheDocument();
    })

    it('should render <Schedule /> for route /todas-as-aulas', () => {
        render(
            <MemoryRouter initialEntries={['/todas-as-aulas']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByTestId('schedule-page')).toBeInTheDocument();
        expect(screen.getByText('Mocked Schedule Page')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-routes')).toBeInTheDocument();
    })

    it('should render <Flowchart /> for route /fluxograma', () => {
        render(
            <MemoryRouter initialEntries={['/fluxograma']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByTestId('flowchart-page')).toBeInTheDocument();
        expect(screen.getByText('Mocked Flowchart Page')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-routes')).toBeInTheDocument();
    })

    it('should render Warning with 404 message and handle navigation for inexistent route', async () => {
        const user = userEvent.setup();
        
        render(
            <MemoryRouter initialEntries={['/inexistent']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.getByTestId('warning-component')).toBeInTheDocument();
        expect(screen.getByText('Página não encontrada.')).toBeInTheDocument();
        expect(screen.queryByTestId('protected-routes')).toBeInTheDocument();
        const backButton = screen.getByText('Voltar a página inicial');
        expect(backButton).toBeInTheDocument();
        
        await user.click(backButton);
        
        expect(mockNavigate).toHaveBeenCalledWith('/');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    })
})