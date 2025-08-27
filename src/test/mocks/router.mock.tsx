import { vi } from "vitest";

export const MockForm = () => <div data-testid="form-page">Mocked Form Page</div>;
export const MockDayClasses = () => <div data-testid="day-classes-page">Mocked DayClasses Page</div>;
export const MockSchedule = () => <div data-testid="schedule-page">Mocked Schedule Page</div>;
export const MockFlowchart = () => <div data-testid="flowchart-page">Mocked Flowchart Page</div>;
export const MockProtectedRoutes = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="protected-routes">{children}</div>
);

export const MockWarning = ({ message, buttonLabel, onClickButton }: { 
    message: string; 
    buttonLabel: string; 
    onClickButton?: () => void;
}) => (
    <div data-testid="warning-component">
        <span>{message}</span>
        <button onClick={onClickButton}>{buttonLabel}</button>
    </div>
);

export const mockNavigate = vi.fn();

export const setupRouterMocks = () => {
    vi.mock('../../pages/form/form', () => ({
        default: MockForm
    }));

    vi.mock('../../pages/dayClasses/dayClasses', () => ({
        default: MockDayClasses
    }));

    vi.mock('../../pages/schedule/schedule', () => ({
        default: MockSchedule
    }));

    vi.mock('../../pages/flowchart/flowchart', () => ({
        default: MockFlowchart
    }));

    vi.mock('../../components/protectedRoutes/ProtectedRoutes', () => ({
        default: MockProtectedRoutes
    }));

    vi.mock('../../components/warning/warning', () => ({
        default: MockWarning
    }));

    vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
            ...actual,
            useNavigate: () => mockNavigate,
        };
    });
};

export const clearRouterMocks = () => {
    mockNavigate.mockClear();
};