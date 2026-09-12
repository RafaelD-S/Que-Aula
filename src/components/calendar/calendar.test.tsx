import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "../../test/utils/renderWithProviders";
import { Calendar } from "./calendar";
import type { IClassesDataTag } from "../../pages/form/views/classesContainer/classesContainer.interface";

const course = (overrides: Partial<IClassesDataTag["courses"][number]> = {}) => ({
  idCourse: 1,
  sectionCode: "A1",
  subjectCode: "MAT101",
  teacher: "Prof. Ana",
  classroom: "Sala 1",
  weekday: 1,
  periodStart: 0,
  periodEnd: 0,
  ...overrides,
});

const classData = (courses = [course()]): IClassesDataTag => ({
  code: "A1",
  isStrike: false,
  subjectCode: "MAT101",
  description: "Matemática",
  courses,
});

describe("Calendar", () => {
  it("renders weekday columns and empty periods", () => {
    render(<Calendar classes={[]} />);

    expect(screen.getByText("Seg")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.queryByText("Dom")).not.toBeInTheDocument();
    expect(screen.getAllByText("Vazio")).toHaveLength(30);
  });

  it("renders a course and the selected secondary information", async () => {
    render(<Calendar classes={[classData()]} secondaryInfo="teacher" />);

    await waitFor(() => expect(screen.getByText("MAT101")).toBeInTheDocument());
    expect(screen.getByText("Prof. Ana")).toBeInTheDocument();
  });

  it("shows conflicting courses and the number of additional courses", async () => {
    const courses = [
      course({ idCourse: 1, subjectCode: "MAT101" }),
      course({ idCourse: 2, subjectCode: "PHY101" }),
      course({ idCourse: 3, subjectCode: "CHEM101" }),
    ];
    render(<Calendar classes={[classData(courses)]} />);

    await waitFor(() => expect(screen.getByText("...mais 1")).toBeInTheDocument());
    expect(screen.getByText("MAT101")).toBeInTheDocument();
    expect(screen.getByText("PHY101")).toBeInTheDocument();
  });

  it("forwards its ref to the root element", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Calendar ref={ref} classes={[]} />);

    expect(ref.current).toHaveClass("calendar");
  });

  it("ignores weekend courses", async () => {
    render(<Calendar classes={[classData([course({ weekday: 6 })])]} />);

    await waitFor(() => expect(screen.getAllByText("Vazio")).toHaveLength(30));
  });
});
