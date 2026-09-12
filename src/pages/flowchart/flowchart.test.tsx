import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "../../test/utils/renderWithProviders";
import { useFlowchart } from "../../hooks/useFlowcharts";
import Flowchart from "./flowchart";
import type { IClassItem } from "../../components/classItem/classItem.Interface";

vi.mock("../../hooks/useFlowcharts", () => ({ useFlowchart: vi.fn() }));
vi.mock("../../components/classItem/classItem", () => ({
  default: ({
    data,
    loading,
    onStateChange,
  }: {
    data?: IClassItem;
    loading?: boolean;
    onStateChange?: (name: string | undefined, state: string) => void;
  }) =>
    loading ? (
      <div data-testid="loading-class" />
    ) : data ? (
      <button
        data-testid={`class-${data.name}`}
        onClick={() => onStateChange?.(data.name, "disabled")}
      >
        {data.name}
      </button>
    ) : null,
}));
vi.mock("../../components/progressTracker/progressTracker", () => ({
  default: ({ classesAmount, checkedAmount }: { classesAmount: number; checkedAmount: number }) => (
    <div data-testid="progress" data-total={classesAmount} data-checked={checkedAmount} />
  ),
}));
vi.mock("../../components/warning/warning", () => ({
  default: ({
    message,
    buttonLabel,
    onClickButton,
  }: {
    message: string;
    buttonLabel: string;
    onClickButton?: () => void;
  }) => (
    <div>
      <p>{message}</p>
      <button onClick={onClickButton}>{buttonLabel}</button>
    </div>
  ),
}));

const flowchart: IClassItem[][] = [
  [
    {
      name: "MAT101",
      description: "Matemática",
      credit: "60 - obrigatória",
      state: "default",
      semester: 0,
    },
    { name: "EMPTY", state: "empty", semester: 0 },
  ],
];

const flowchartMock = vi.mocked(useFlowchart);

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  flowchartMock.mockReturnValue({ flowchart: [], loading: true, error: null });
});

describe("Flowchart", () => {
  it("renders loading semesters while data is loading", () => {
    render(<Flowchart />);

    expect(screen.getByRole("heading", { name: "Fluxograma" })).toBeInTheDocument();
    expect(screen.getAllByTestId("loading-class")).toHaveLength(42);
  });

  it("renders an error action", () => {
    flowchartMock.mockReturnValue({ flowchart: [], loading: false, error: "failed" });
    render(<Flowchart />);

    expect(screen.getByText("Ocorreu um erro no carregamento do fluxograma.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Voltar a página inicial" })).toBeInTheDocument();
  });

  it("renders API classes, calculates progress and persists state changes", async () => {
    flowchartMock.mockReturnValue({ flowchart, loading: false, error: null });
    render(<Flowchart />);

    await waitFor(() => expect(screen.getByTestId("class-MAT101")).toBeInTheDocument());
    expect(screen.getByRole("heading", { name: "1º Semestre" })).toBeInTheDocument();
    expect(screen.getByTestId("progress")).toHaveAttribute("data-total", "60");
    expect(screen.getByTestId("progress")).toHaveAttribute("data-checked", "0");

    fireEvent.click(screen.getByTestId("class-MAT101"));
    await waitFor(() =>
      expect(screen.getByTestId("progress")).toHaveAttribute("data-checked", "60"),
    );
    expect(JSON.parse(localStorage.getItem("classData")!)[0][0].state).toBe("disabled");
  });

  it("restores a compatible state from localStorage", async () => {
    localStorage.setItem("classData", JSON.stringify([[{ name: "MAT101", state: "disabled" }]]));
    flowchartMock.mockReturnValue({ flowchart, loading: false, error: null });
    render(<Flowchart />);

    await waitFor(() =>
      expect(screen.getByTestId("progress")).toHaveAttribute("data-checked", "60"),
    );
  });
});
