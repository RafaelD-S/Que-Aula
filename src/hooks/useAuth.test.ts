import { beforeEach, describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAuth } from "./useAuth";

beforeEach(() => {
  localStorage.clear();
});

describe("useAuth", () => {
  it("returns no saved classes when storage is empty", () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual({ hasSavedClasses: false, token: null });
  });

  it("returns the stored value as the token", () => {
    localStorage.setItem("SelectedClasses", "[{}]");

    const { result } = renderHook(() => useAuth());

    expect(result.current).toEqual({ hasSavedClasses: true, token: "[{}]" });
  });

  it("treats an empty stored value as unsaved", () => {
    localStorage.setItem("SelectedClasses", "");

    const { result } = renderHook(() => useAuth());

    expect(result.current.hasSavedClasses).toBe(false);
    expect(result.current.token).toBeNull();
  });
});
