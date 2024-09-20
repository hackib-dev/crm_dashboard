import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-[#1E2772]");
  });

  it("renders with custom variant and size", () => {
    render(
      <Button variant="outline" size="lg">
        Custom Button
      </Button>,
    );
    const buttonElement = screen.getByRole("button", {
      name: /custom button/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("border-[1.5px] bg-white text-[#1E2772]");
    expect(buttonElement).toHaveClass("h-11 px-8");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the disabled state correctly", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole("button", {
      name: /disabled button/i,
    });

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass(
      "disabled:pointer-events-none disabled:opacity-50",
    );
  });

  it("supports focus and accessible behavior", () => {
    render(<Button>Focusable Button</Button>);
    const buttonElement = screen.getByRole("button", {
      name: /focusable button/i,
    });

    buttonElement.focus();
    expect(buttonElement).toHaveFocus();
    expect(buttonElement).toHaveClass("focus-visible:ring-2");
  });
});
