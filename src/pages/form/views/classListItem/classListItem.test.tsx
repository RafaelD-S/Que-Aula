import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../../test/utils/renderWithProviders";
import { ClassListItem } from "./classListItem";

describe("ClassListItem", () => {
  it("renders the current class information", () => {
    render(
      <ClassListItem classCode="MATH101" whichClass="A1" description="Introduction to Algebra" />,
    );

    expect(screen.getByTestId("class-list-item")).toBeInTheDocument();
    expect(screen.getByText("MATH101")).toBeInTheDocument();
    expect(screen.getByText("A1")).toBeInTheDocument();
    expect(screen.getByText("Introduction to Algebra")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toHaveClass("checkbox--large");
  });

  it("toggles selected classes and calls onClick with the event", () => {
    const onClick = vi.fn();
    render(<ClassListItem classCode="MATH101" onClick={onClick} />);
    const item = screen.getByTestId("class-list-item");

    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledOnce();
    expect(item).toHaveClass("form__classes__classListItem--selected");
    expect(screen.getByTestId("checkbox")).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(item).not.toHaveClass("form__classes__classListItem--selected");
  });

  it("honors the initially selected state and supports missing callbacks", () => {
    render(<ClassListItem selected classCode="MATH101" />);

    expect(screen.getByTestId("class-list-item")).toHaveClass(
      "form__classes__classListItem--selected",
    );
    expect(() => fireEvent.click(screen.getByTestId("class-list-item"))).not.toThrow();
  });
});
