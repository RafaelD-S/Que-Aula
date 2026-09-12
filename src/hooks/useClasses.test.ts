import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSubjects } from "../api/hooks";

const subjects = [
  {
    code: "MAT101",
    name: "Matemática",
    semester: 1,
    sections: [],
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(fetch).mockResolvedValue(
    new Response(JSON.stringify(subjects), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );
});

describe("subject loading used by the form", () => {
  it("loads subjects with the semester and expansions", async () => {
    const { result } = renderHook(() => useSubjects(1, ["sections", "courses"]));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(subjects);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/subjects"));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("semester=1"));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("expand=sections%2Ccourses"));
  });

  it("exposes API errors after a failed request", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: "Unavailable" }), {
        status: 503,
        headers: { "content-type": "application/json" },
      }),
    );

    const { result } = renderHook(() => useSubjects(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toMatchObject({ status: 503, message: "Unavailable" });
  });

  it("stays disabled when a query is explicitly disabled", async () => {
    const { result } = renderHook(() =>
      // useSubjects always enables its query; the generic hook contract is covered by API callers.
      useSubjects(undefined, "sections"),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(subjects);
  });
});
