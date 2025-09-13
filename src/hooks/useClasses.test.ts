import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockApi, mockApiModule, resetApiMocks } from "../test/mocks/api.mock";
import { useClasses, useFlowchart } from "./useClasses";
import { renderHook, waitFor } from "@testing-library/react";
import { mockClassesData } from "../test/mocks/classData.mock";

mockApiModule()

describe('useClasses Hook', () => {
    beforeEach(() => {
        resetApiMocks();
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    describe('Initial State', () => {
        it('should have the correct initial state', async () => {
            mockApi.getClasses.mockResolvedValue([]);
            const { result } = renderHook(() => useClasses());

            await waitFor(() => {
                expect(result.current.classes).toEqual([]);
                expect(result.current.loading).toBe(true);
                expect(result.current.error).toBe(null);
            });
        })
    })

    describe('Data Loading', () => {
        it('should load classes successfully', async () => {
            mockApi.getClasses.mockResolvedValue(mockClassesData);
            
            const { result } = renderHook(() => useClasses());
            
            expect(result.current.loading).toBe(true);
            expect(result.current.classes).toEqual([]);
            expect(result.current.error).toBe(null);
            
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            expect(result.current.classes).toEqual(mockClassesData);
            expect(result.current.error).toBe(null);
            expect(mockApi.getClasses).toHaveBeenCalledTimes(1);
        });

        it('should handle errors when loading classes', async () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            const errorMessage = 'Network Error';
            mockApi.getClasses.mockRejectedValue(new Error(errorMessage));
            
            const { result } = renderHook(() => useClasses());
            
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            expect(result.current.classes).toEqual([]);
            expect(result.current.error).toBe('Erro ao carregar disciplinas');
            expect(result.current.loading).toBe(false);
            expect(mockApi.getClasses).toHaveBeenCalledTimes(1);

            expect(consoleSpy).toHaveBeenCalledWith(
                "Erro ao buscar disciplinas:", 
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });
    });
})

describe('useFlowchart Hook', () => {
    beforeEach(() => {
        resetApiMocks();
    })

    afterEach(() => {
        vi.clearAllMocks();
    })

    describe('Initial State', () => {
        it('should have the correct initial state', async () => {
            mockApi.getFlowchart.mockResolvedValue([]);
            const { result } = renderHook(() => useFlowchart());

            await waitFor(() => {
                expect(result.current.flowchart).toEqual([]);
                expect(result.current.loading).toBe(true);
                expect(result.current.error).toBe(null);
            });
        });
    });

    describe('Data Loading', () => {
        it('should load the flowchart successfully', async () => {
            const mockFlowchartData = [
                [{ name: 'Class 1', semester: '1' }],
                [{ name: 'Class 2', semester: '2' }]
            ];
            
            mockApi.getFlowchart.mockResolvedValue(mockFlowchartData);
            
            const { result } = renderHook(() => useFlowchart());
            
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            expect(result.current.flowchart).toEqual(mockFlowchartData);
            expect(result.current.error).toBe(null);
            expect(mockApi.getFlowchart).toHaveBeenCalledTimes(1);
        });

        it('should handle errors when loading the flowchart', async () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            mockApi.getFlowchart.mockRejectedValue(new Error('Network Error'));
            const { result } = renderHook(() => useFlowchart());
            
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
            
            expect(result.current.flowchart).toEqual([]);
            expect(result.current.error).toBe('Erro ao carregar fluxograma');
            expect(mockApi.getFlowchart).toHaveBeenCalledTimes(1);

            expect(consoleSpy).toHaveBeenCalledWith(
                "Erro ao buscar fluxograma:", 
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });
    });
});