import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProgressTracker from "./progressTracker";
import {
  mockProgressTrackerPropsDefault,
  mockProgressTrackerPropsEmpty,
  mockProgressTrackerPropsZeroProgress,
  mockProgressTrackerPropsFullProgress,
  mockProgressTrackerPropsPartial,
  mockProgressTrackerPropsLarge,
} from "../../test/mocks/progressTracker.mock";

describe("ProgressTracker Component", () => {
  // NOTE: These tests document the current behavior of the component.
  // The division by zero case (classesAmount = 0) currently results in NaN%,
  // which could be improved in the future to handle this edge case more gracefully.

  describe("Rendering", () => {
    it("renders progress tracker with basic structure", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const progressTracker = container.querySelector(".progress-tracker");
      const progressBar = container.querySelector(".progress-tracker__bar");
      const progressFill = container.querySelector(".progress-tracker__progress");
      const percentageText = container.querySelector(".progress-tracker__percentage-text");

      expect(progressTracker).toBeInTheDocument();
      expect(progressBar).toBeInTheDocument();
      expect(progressFill).toBeInTheDocument();
      expect(percentageText).toBeInTheDocument();
    });

    it("displays correct percentage text", () => {
      render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const percentageText = screen.getByText("70%");
      expect(percentageText).toBeInTheDocument();
      expect(percentageText).toHaveClass("progress-tracker__percentage-text");
    });

    it("applies correct CSS custom property for progress width", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;
      
      expect(progressTracker.style.getPropertyValue("--percentage")).toBe("70%");
    });
  });

  describe("Percentage Calculations", () => {
    it.each([
      {
        name: "default scenario",
        props: mockProgressTrackerPropsDefault,
        expectedPercentage: 70,
      },
      {
        name: "zero progress",
        props: mockProgressTrackerPropsZeroProgress,
        expectedPercentage: 0,
      },
      {
        name: "full progress",
        props: mockProgressTrackerPropsFullProgress,
        expectedPercentage: 100,
      },
      {
        name: "partial progress",
        props: mockProgressTrackerPropsPartial,
        expectedPercentage: 33,
      },
      {
        name: "large numbers",
        props: mockProgressTrackerPropsLarge,
        expectedPercentage: 73,
      },
    ])(
      "calculates correct percentage for $name",
      ({ props, expectedPercentage }) => {
        render(<ProgressTracker {...props} />);

        const percentageText = screen.getByText(`${expectedPercentage}%`);
        expect(percentageText).toBeInTheDocument();
      }
    );

    it("handles division by zero - shows NaN (current behavior)", () => {
      render(<ProgressTracker {...mockProgressTrackerPropsEmpty} />);

      // Testing current behavior: division by zero results in NaN
      const percentageText = screen.getByText("NaN%");
      expect(percentageText).toBeInTheDocument();
    });

    it("rounds percentage to nearest integer", () => {
      // 1/3 = 33.333... should round to 33
      render(<ProgressTracker {...mockProgressTrackerPropsPartial} />);

      const percentageText = screen.getByText("33%");
      expect(percentageText).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles zero progress correctly", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsZeroProgress} />);

      const percentageText = screen.getByText("0%");
      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;

      expect(percentageText).toBeInTheDocument();
      expect(progressTracker.style.getPropertyValue("--percentage")).toBe("0%");
    });

    it("handles full progress correctly", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsFullProgress} />);

      const percentageText = screen.getByText("100%");
      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;

      expect(percentageText).toBeInTheDocument();
      expect(progressTracker.style.getPropertyValue("--percentage")).toBe("100%");
    });

    it("handles large numbers correctly", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsLarge} />);

      const percentageText = screen.getByText("73%");
      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;

      expect(percentageText).toBeInTheDocument();
      expect(progressTracker.style.getPropertyValue("--percentage")).toBe("73%");
    });

    it("handles progress exceeding total gracefully", () => {
      const excessiveProps = { classesAmount: 5, checkedAmount: 7 };
      const { container } = render(<ProgressTracker {...excessiveProps} />);

      const percentageText = screen.getByText("140%");
      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;

      expect(percentageText).toBeInTheDocument();
      expect(progressTracker.style.getPropertyValue("--percentage")).toBe("140%");
    });

    it("handles empty classes (division by zero) - current behavior shows NaN", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsEmpty} />);

      // Testing current behavior: division by zero results in NaN
      const percentageText = screen.getByText("NaN%");
      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;

      expect(percentageText).toBeInTheDocument();
      expect(progressTracker.style.getPropertyValue("--percentage")).toBe("NaN%");
    });
  });

  describe("Component Structure", () => {
    it("has correct semantic structure", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const section = container.querySelector("section.progress-tracker");
      const bar = container.querySelector(".progress-tracker__bar");
      const progress = container.querySelector(".progress-tracker__progress");
      const text = container.querySelector("p.progress-tracker__percentage-text");

      expect(section).toBeInTheDocument();
      expect(bar).toBeInTheDocument();
      expect(progress).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it("maintains proper DOM hierarchy", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const progressTracker = container.querySelector(".progress-tracker") as HTMLElement;
      const progressBar = container.querySelector(".progress-tracker__bar") as HTMLElement;
      const progressFill = container.querySelector(".progress-tracker__progress") as HTMLElement;

      expect(progressTracker).toContainElement(progressBar);
      expect(progressBar).toContainElement(progressFill);
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML elements", () => {
      const { container } = render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const section = container.querySelector("section");
      const paragraph = container.querySelector("p");

      expect(section).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });

    it("provides text representation of progress", () => {
      render(<ProgressTracker {...mockProgressTrackerPropsDefault} />);

      const percentageText = screen.getByText("70%");
      expect(percentageText).toBeInTheDocument();
    });
  });
});
