import { vi } from 'vitest';

export const mockAuthenticatedUser = (mockUseAuth: any) => {
    mockUseAuth.mockReturnValue({
        hasSavedClasses: true,
        token: 'mock-token'
    });
};

export const mockUnauthenticatedUser = (mockUseAuth: any) => {
    mockUseAuth.mockReturnValue({
        hasSavedClasses: false,
        token: null
    });
};

export const mockLocationPathname = (mockUseLocation: any, pathname: string) => {
    mockUseLocation.mockReturnValue({ 
        pathname,
        state: null,
        key: 'test',
        search: '',
        hash: ''
    });
};

export const getNavigateFunction = (mockNavigate: any) => {
    const navigateFunction = vi.fn();
    mockNavigate.mockReturnValue(navigateFunction);
    return navigateFunction;
};

export const resetProtectedRoutesMocks = (mockNavigate: any, mockUseLocation: any) => {
    vi.clearAllMocks();
    
    const navigateFunction = vi.fn();
    mockNavigate.mockReturnValue(navigateFunction);
    
    mockUseLocation.mockReturnValue({ 
        pathname: '/current-route',
        state: null,
        key: 'default',
        search: '',
        hash: ''
    });
};

export const TestChild = () => <div data-testid="test-child">Test Content</div>;
