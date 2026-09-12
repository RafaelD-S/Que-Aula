import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "../../context/AppContext";
import DayClasses from "./dayClasses";
import * as api from "../../api";

const selectedClass = {
  code: "A1",
  isStrike: false,
  subjectCode: "MAT101",
  description: "Matemática",
  courses: [
    {
      idCourse: 1,
      sectionCode: "A1",
      subjectCode: "MAT101",
      teacher: "Prof. Ana",
      classroom: "Sala 1",
      weekday: 1,
      periodStart: 0,
      periodEnd: 1,
    },
  ],
};

const renderPage = (entry = "/day/Segunda-feira") =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <AppProvider>
        <Routes>
          <Route path="*" element={<DayClasses />} />
        </Routes>
      </AppProvider>
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
  vi.setSystemTime(new Date(2026, 8, 7));
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("DayClasses", () => {
  it("renders the current weekday and empty state", async () => {
    renderPage();

    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Segunda-feira" })).toBeInTheDocument(),
    );
    expect(document.querySelector(".dayClasses__item--empty")).toBeInTheDocument();
  });

  it("renders stored courses for the current weekday", async () => {
    localStorage.setItem("SelectedClasses", JSON.stringify([selectedClass]));
    renderPage();

    await waitFor(() => expect(screen.getByText("MAT101")).toBeInTheDocument());
    expect(screen.getByText("- Prof. Ana")).toBeInTheDocument();
    expect(screen.getByText("Sala 1")).toBeInTheDocument();
    expect(screen.getByText("Matemática")).toBeInTheDocument();
  });

  it("falls back to the current weekday for a route value not read by the current route contract", async () => {
    renderPage("/day/Neverday");

    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Segunda-feira" })).toBeInTheDocument(),
    );
  });

  it("ignores invalid stored JSON", async () => {
    localStorage.setItem("SelectedClasses", "invalid");
    renderPage();

    await act(async () => undefined);
    expect(screen.getByRole("heading", { name: "Segunda-feira" })).toBeInTheDocument();
    expect(screen.queryByText("MAT101")).not.toBeInTheDocument();
  });

  it("marks only the reloading classroom and disables the other reload buttons", async () => {
    const secondClass = {
      ...selectedClass,
      subjectCode: "PHY101",
      description: "Física",
      courses: [{ ...selectedClass.courses[0], idCourse: 2, subjectCode: "PHY101" }],
    };
    localStorage.setItem("SelectedClasses", JSON.stringify([selectedClass, secondClass]));

    let resolveReload: (course: (typeof selectedClass.courses)[0]) => void = () => undefined;
    vi.spyOn(api, "getCourseById").mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveReload = resolve;
        }),
    );

    renderPage();
    await waitFor(() => expect(screen.getAllByRole("button")).toHaveLength(2));

    const [firstReload, secondReload] = screen.getAllByRole("button");
    fireEvent.click(firstReload);

    const classrooms = screen.getAllByText("Sala 1");
    await waitFor(() => {
      expect(classrooms[0]).toHaveClass("shimmer");
      expect(secondReload).toBeDisabled();
    });

    await act(async () => {
      resolveReload(selectedClass.courses[0]);
    });
  });
});
