import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button component", () => {
  it("renders with the correct text", () => {
    render(<Button text="Submit" />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button id="click-me" text="Click Me" onClick={onClick} />);

    const button = screen.getByTestId("click-me");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button id="disabled" text="Disabled" onClick={onClick} disabled />);

    const button = screen.getByTestId("disabled");
    await user.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("does nothing when onClick is not provided", async () => {
    const user = userEvent.setup();
    render(<Button id="no-handler" text="No Handler" />);
    const button = screen.getByTestId("no-handler");

    await user.click(button);
  });

  it("applies custom className if provided", () => {
    render(<Button id="styled" text="Styled" className="my-custom-class" />);
    const button = screen.getByTestId("styled");

    expect(button.className).toMatch(/my-custom-class/);
  });

  it("uses disabled styles when disabled", () => {
    render(<Button id="test" text="Test" disabled className="test-class" />);
    const button = screen.getByTestId("test");

    expect(button).toHaveClass("bg-gray-200");
    expect(button).toHaveClass("text-gray-400");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("uses primary styles when not disabled", () => {
    render(<Button id="test" text="Test" className="test-class" />);
    const button = screen.getByTestId("test");

    expect(button).toHaveClass("bg-blue-600");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("cursor-pointer");
  });
});
