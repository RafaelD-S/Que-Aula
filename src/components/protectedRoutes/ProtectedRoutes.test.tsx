import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock('../../hooks/useAuth', () => ({
    useAuth: vi.fn()
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
        useLocation: vi.fn()
    };
});

vi.mock('../layout/MainLayout', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="main-layout">
            <div data-testid="mock-header">Header</div>
            {children}
            <div data-testid="mock-footer">Footer</div>
        </div>
    )
}));

import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoutes from "./ProtectedRoutes";
import {
    mockAuthenticatedUser,
    mockUnauthenticatedUser,
    mockLocationPathname,
    getNavigateFunction,
    resetProtectedRoutesMocks,
    TestChild
} from "../../test/mocks/protectedRoutes.mock";

const mockUseAuth = vi.mocked(useAuth);
const mockNavigate = vi.mocked(useNavigate);
const mockUseLocation = vi.mocked(useLocation);

beforeEach(() => {
    resetProtectedRoutesMocks(mockNavigate, mockUseLocation);
});

describe('ProtectedRoutes', () => {
    it('should render children inside MainLayout when user is authenticated', () => {
        mockAuthenticatedUser(mockUseAuth);

        render(
            <MemoryRouter>
                <ProtectedRoutes>
                    <TestChild />
                </ProtectedRoutes>
            </MemoryRouter>
        );

        expect(screen.getByTestId('main-layout')).toBeInTheDocument();
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should navigate to /form when user is not authenticated', async () => {
        mockUnauthenticatedUser(mockUseAuth);
        const navigateFunction = getNavigateFunction(mockNavigate);

        render(
            <MemoryRouter>
                <ProtectedRoutes>
                    <TestChild />
                </ProtectedRoutes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(navigateFunction).toHaveBeenCalledWith(
                '/form',
                {
                    replace: true,
                    state: { from: '/current-route' }
                }
            );
        });

        expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();
        expect(screen.queryByTestId('main-layout')).not.toBeInTheDocument();
    });

    it('should pass correct location pathname in redirect state', async () => {
        mockLocationPathname(mockUseLocation, '/fluxograma');
        mockUnauthenticatedUser(mockUseAuth);
        const navigateFunction = getNavigateFunction(mockNavigate);

        render(
            <MemoryRouter>
                <ProtectedRoutes>
                    <TestChild />
                </ProtectedRoutes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(navigateFunction).toHaveBeenCalledWith(
                '/form',
                {
                    replace: true,
                    state: { from: '/fluxograma' }
                }
            );
        });
    });
});