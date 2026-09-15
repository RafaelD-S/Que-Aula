import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../test/utils/renderWithProviders";
import type { IClassesDataTag } from "./views/classesContainer/classesContainer.interface";
import Form from "./form";

const selectedItem: IClassesDataTag = {
  code: "A1",
  isStrike: false,
  subjectCode: "MAT101",
  selected: true,
  description: "Matemática",
  courses: [],
};

vi.mock("../../components/modal/modal", () => ({
  Modal: ({ children }: { children: React.ReactNode }) => <div data-testid="modal">{children}</div>,
}));

vi.mock("./views/classesContainer/classesContainer", () => ({
  ClassesContainer: ({
    title,
    semestre,
    onClickTag,
  }: {
    title: string;
    semestre: number;
    onClickTag: (item: IClassesDataTag) => void;
  }) => (
    <section>
      <h4>{title}</h4>
      <button
        type="button"
        data-testid={`select-${semestre}`}
        onClick={() => onClickTag(selectedItem)}
      >
        Select class
      </button>
    </section>
  ),
}));

vi.mock("../../components/preview/preview", () => ({
  Preview: ({
    isOpen,
    onButtonClick,
    onOverlayClick,
    classesData,
  }: {
    isOpen: boolean;
    onButtonClick: () => void;
    onOverlayClick: () => void;
    classesData: IClassesDataTag[];
  }) =>
    isOpen ? (
      <div data-testid="preview" data-count={classesData.length}>
        <button onClick={onButtonClick}>Close preview</button>
        <button onClick={onOverlayClick}>Close overlay</button>
      </div>
    ) : null,
}));

beforeEach(() => {
  localStorage.clear();
});

describe("Form", () => {
  it("renders all semester containers and disabled submit styling", () => {
    render(<Form />);

    expect(screen.getByText("Bem vindo ao")).toBeInTheDocument();
    expect(screen.getByText("Optativas")).toBeInTheDocument();
    expect(screen.getByText("6º Semestre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Gerar Calendário" }).parentElement).not.toHaveClass(
      "form__submit--active",
    );
  });

  it("opens preview with the selected class and can close it", () => {
    render(<Form />);

    fireEvent.click(screen.getByTestId("select-1"));
    fireEvent.click(screen.getByRole("button", { name: "Preview" }));

    expect(screen.getByTestId("preview")).toHaveAttribute("data-count", "1");
    fireEvent.click(screen.getByRole("button", { name: "Close preview" }));
    expect(screen.queryByTestId("preview")).not.toBeInTheDocument();
  });

  it("toggles a selected class and submits the saved selection", () => {
    render(<Form />);
    const select = screen.getByTestId("select-1");
    const submit = screen.getByRole("button", { name: "Gerar Calendário" });

    fireEvent.click(select);
    expect(submit.parentElement).toHaveClass("form__submit--active");
    fireEvent.click(select);
    expect(submit.parentElement).not.toHaveClass("form__submit--active");

    fireEvent.click(select);
    fireEvent.click(submit);

    expect(JSON.parse(localStorage.getItem("SelectedClasses")!)).toEqual([selectedItem]);
  });
});
