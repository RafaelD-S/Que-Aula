import { vi } from "vitest";

export const mockApi = {
    getClasses: vi.fn(),
    getClassByName: vi.fn(),
    getFlowchart: vi.fn(),
    getFlowchartClass: vi.fn(),
    healthCheck: vi.fn(),
}

export const resetApiMocks = () => {
    Object.values(mockApi).forEach((mock) => {
        if (vi.isMockFunction(mock)) {
            mock.mockReset();
        }
    });
}

export const mockApiModule = () => {
    vi.mock('../../services/api', () => ({
        api: mockApi
    }));
}