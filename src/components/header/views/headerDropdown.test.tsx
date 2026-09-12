import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../test/utils/renderWithProviders";
import DropDown from "./headerDropdown";

const items = ["Segunda-feira", "Terça-feira", "Quarta-feira"];

const renderDropdown = (navSwitch = false, switchWeekday = vi.fn()) => {
  const setNavSwitch = vi.fn();
  render(
    <DropDown
      dropdownItems={items}
      navSwitch={navSwitch}
      setNavSwitch={setNavSwitch}
      switchWeekday={switchWeekday}
    />,
  );
  return { setNavSwitch, switchWeekday };
};

describe("DropDown", () => {
  it("keeps items hidden when closed", () => {
    renderDropdown();

    expect(screen.queryByRole("link", { name: "Segunda-feira" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Dias da Semana/i })).not.toHaveClass(
      "headerDropdown__button--focus",
    );
  });

  it("renders weekday links and focus styles when open", () => {
    renderDropdown(true);

    expect(screen.getByRole("button", { name: /Dias da Semana/i })).toHaveClass(
      "headerDropdown__button--focus",
    );
    expect(screen.getByRole("link", { name: "Segunda-feira" })).toHaveAttribute(
      "href",
      "/day/Segunda-feira",
    );
  });

  it("toggles navigation and reports the selected weekday", () => {
    const switchWeekday = vi.fn();
    const { setNavSwitch } = renderDropdown(true, switchWeekday);

    fireEvent.click(screen.getByText("Terça-feira"));

    expect(switchWeekday).toHaveBeenCalledWith(2);
    expect(setNavSwitch).toHaveBeenCalled();
  });
});
