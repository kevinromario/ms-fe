import { render, screen } from "@testing-library/react";
import VStack from "../VStack";

describe("VStack component", () => {
  it("renders children elements", () => {
    render(
      <VStack>
        <p data-testid="child-1">Item 1</p>
        <p data-testid="child-2">Item 2</p>
      </VStack>
    );

    expect(screen.getByTestId("child-1")).toHaveTextContent("Item 1");
    expect(screen.getByTestId("child-2")).toHaveTextContent("Item 2");
  });

  it("uses default gap when not provided", () => {
    const { container } = render(
      <VStack>
        <div>Content</div>
      </VStack>
    );

    expect(container.firstChild).toHaveClass("gap-2");
  });

  it("uses custom gap when provided", () => {
    const { container } = render(
      <VStack gap="6">
        <div>Content</div>
      </VStack>
    );

    expect(container.firstChild).toHaveClass("gap-6");
  });
});
