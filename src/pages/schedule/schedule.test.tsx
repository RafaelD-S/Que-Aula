import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "../../test/utils/renderWithProviders";
import Schedule from "./schedule";

const selectedClasses = [
  {
    code: "A1",
    isStrike: false,
    subjectCode: "MAT101",
    description: "Matemática",
    courses: [],
  },
];

vi.mock("html2canvas", () => ({ default: vi.fn() }));

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  localStorage.setItem("SelectedClasses", JSON.stringify(selectedClasses));
});

describe("Schedule", () => {
  it("renders the saved classes calendar and save action", () => {
    render(<Schedule />);

    expect(screen.getByRole("heading", { name: "Todas as Aulas" })).toBeInTheDocument();
    expect(document.querySelector(".calendar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Salvar imagem/i })).toBeInTheDocument();
  });

  it("downloads a composed calendar image", async () => {
    const html2canvas = (await import("html2canvas")).default;
    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = 100;
    sourceCanvas.height = 80;
    vi.mocked(html2canvas).mockResolvedValue(sourceCanvas as HTMLCanvasElement);
    const click = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tagName: string) => {
      const element = originalCreateElement(tagName);
      if (tagName === "a") Object.defineProperty(element, "click", { value: click });
      return element;
    });

    render(<Schedule />);
    fireEvent.click(screen.getByRole("button", { name: /Salvar imagem/i }));

    await waitFor(() => expect(html2canvas).toHaveBeenCalled());
    expect(click).toHaveBeenCalledOnce();
    vi.restoreAllMocks();
  });
});
