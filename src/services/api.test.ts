import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockClassesData } from "../test/mocks/classData.mock";
import api from "./api";
import { mockClassesitems, mockSingleClassItem } from "../test/mocks/classItem.mock";

beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('API Service', () => {
    describe('HealthCheck', () => {
        it('should return healthCheck message', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    message: "Que Aula API is running!",
                    version: "2.0.0",
                    arquiteture: {
                        database: "PostgreSQL (Neon)",
                        fallback: "JSON files",
                        deployment: "Vercel Serverless"
                    },
                    endpoints: {
                        classes: "/classes (GET, POST, PUT, PATCH, DELETE)",
                        flowchart: "/flowchart (GET)",
                        migrations: "/migrations (GET, POST)"
                    },
                    guideUrl: "https://github.com/johncobain/Que-Aula-Api/blob/main/GUIDE.md"
                })
            });

            const result = await api.healthCheck();

            expect(globalThis.fetch).toHaveBeenCalledWith("https://que-aula-api.vercel.app/");
            expect(result.message).toBe("Que Aula API is running!");
        });

        it('should throw error when health check fails', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 500,
                json: vi.fn().mockResolvedValue({ message: 'Server error' }),
            });

            await expect(api.healthCheck()).rejects.toThrow('HTTP error! status: 500');
            expect(globalThis.fetch).toHaveBeenCalledWith("https://que-aula-api.vercel.app/");
        });
    })

    describe('Get Classes', () => {
        it('should return a list of classes', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockClassesData),
            });

            const result = await api.getClasses();
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/classes');
            expect(result).toEqual(mockClassesData);
        });

        it('should throw error when fetch fails', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                json: vi.fn().mockResolvedValue({ message: 'Error fetching classes' }),
            });

            await expect(api.getClasses()).rejects.toThrow('HTTP error! status: 404');
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/classes');
        });
    });

    describe('Get Classes By Name', () => {
        it('should return a list of classes with the name informed', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockClassesData[0]),
            });

            const result = await api.getClassByName("Matemática Básica");
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/classes/Matemática Básica');
            expect(result).toEqual(mockClassesData[0]);
        })

        it('should throw error when fetch fails', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                json: vi.fn().mockResolvedValue({ message: 'Error fetching classes' }),
            });

            await expect(api.getClassByName("Matemática Básica")).rejects.toThrow('HTTP error! status: 404');
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/classes/Matemática Básica');
        });
    })

    describe('Get FlowChart', () => {
        it('should return a flowchart', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockClassesitems),
            });

            const result = await api.getFlowchart();
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/flowchart');
            expect(result).toEqual(mockClassesitems);
        });

        it('should throw error when fetch fails', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                json: vi.fn().mockResolvedValue({ message: 'Error fetching classes' }),
            });

            await expect(api.getFlowchart()).rejects.toThrow('HTTP error! status: 404');
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/flowchart');
        })
    })

    describe('Get a Class from FlowChart', () => {
        it('should return a class from flowchart', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockSingleClassItem),
            });

            const result = await api.getFlowchartClass("INF027");
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/flowchart/INF027');
            expect(result).toEqual(mockSingleClassItem);
        });

        it('should throw error when fetch fails', async () => {
            globalThis.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                json: vi.fn().mockResolvedValue({ message: 'Class not found' }),
            });

            await expect(api.getFlowchartClass("INF999")).rejects.toThrow('HTTP error! status: 404');
            expect(globalThis.fetch).toHaveBeenCalledTimes(1);
            expect(globalThis.fetch).toHaveBeenCalledWith('https://que-aula-api.vercel.app/flowchart/INF999');
        });
    })
})