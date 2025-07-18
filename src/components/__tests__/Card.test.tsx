import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Card from "../Card";

describe("Card component", () => {
  const setup = (props = {}) =>
    render(
      <Card id="test-card" title="Test Title" {...props}>
        <p>Card content</p>
      </Card>
    );

  it("renders title and content correctly", () => {
    setup();

    expect(screen.getByTestId("test-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-title-test-card")).toHaveTextContent(
      "Test Title"
    );
    expect(screen.getByTestId("card-content-test-card")).toHaveTextContent(
      "Card content"
    );
  });

  it("toggles content visibility when toggle icon is clicked", async () => {
    const user = userEvent.setup();
    setup();

    const toggleCloseButton = screen.getByTestId("card-toggle-close-test-card");
    const content = screen.getByTestId("card-content-test-card");

    expect(content).toHaveClass("expanded");
    expect(content).not.toHaveClass("collapsed");

    await user.click(toggleCloseButton);
    expect(content).toHaveClass("collapsed");
    expect(content).not.toHaveClass("expanded");

    const toggleOpenButton = screen.getByTestId("card-toggle-open-test-card");

    await user.click(toggleOpenButton);
    expect(content).toHaveClass("expanded");
    expect(content).not.toHaveClass("collapsed");
  });

  it("shows delete icon if deletable is true", () => {
    setup({ deletable: true });
    expect(screen.getByTestId("card-delete-test-card")).toBeInTheDocument();
  });

  it("does not show delete icon if deletable is false or undefined", () => {
    setup();
    expect(
      screen.queryByTestId("card-delete-test-card")
    ).not.toBeInTheDocument();
  });

  it("calls handleDelete when delete icon is clicked", async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();
    setup({ deletable: true, handleDelete });

    const deleteIcon = screen.getByTestId("card-delete-test-card");
    await user.click(deleteIcon);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
