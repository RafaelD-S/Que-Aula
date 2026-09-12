import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../test/utils/renderWithProviders";
import { Preview } from "./preview";
import type { IClassesDataTag } from "../../pages/form/views/classesContainer/classesContainer.interface";

vi.mock("../calendar/calendar", () => ({
  Calendar: ({ classes, secondaryInfo }: { classes: IClassesDataTag[]; secondaryInfo: string }) => (
    <div data-testid="calendar" data-count={classes.length} data-secondary-info={secondaryInfo} />
  ),
}));

const classes: IClassesDataTag[] = [
  { code: "A1", isStrike: false, subjectCode: "MAT101", description: "Matemática", courses: [] },
];

describe("Preview", () => {
  it("does not render while closed", () => {
    render(<Preview classesData={classes} />);

    expect(screen.queryByText("Preview das Aulas")).not.toBeInTheDocument();
  });

  it("renders the calendar and calls the close callbacks", () => {
    const onButtonClick = vi.fn();
    const onOverlayClick = vi.fn();
    render(
      <Preview
        isOpen
        classesData={classes}
        onButtonClick={onButtonClick}
        onOverlayClick={onOverlayClick}
      />,
    );

    expect(screen.getByText("Preview das Aulas")).toBeInTheDocument();
    expect(screen.getByTestId("calendar")).toHaveAttribute("data-count", "1");
    expect(screen.getByTestId("calendar")).toHaveAttribute("data-secondary-info", "description");

    fireEvent.click(screen.getByRole("button", { name: /Voltar/i }));
    expect(onButtonClick).toHaveBeenCalledOnce();

    fireEvent.click(
      screen.getByText("Preview das Aulas").parentElement!.parentElement!.parentElement!,
    );
    expect(onOverlayClick).toHaveBeenCalledOnce();
  });

  it("uses no-op callbacks when they are omitted", () => {
    render(<Preview isOpen classesData={[]} />);

    expect(() => fireEvent.click(screen.getByRole("button", { name: /Voltar/i }))).not.toThrow();
  });
});
