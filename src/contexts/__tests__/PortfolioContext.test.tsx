import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  PortfolioProvider,
  usePortfolioContext,
} from "src/contexts/PortfolioContext";
import userEvent from "@testing-library/user-event";

function TestComponent() {
  const { data, setData, updateAt, triggerUpdate } = usePortfolioContext();

  return (
    <div>
      <div data-testid="data">{data?.profile.name ?? "no-data"}</div>
      <div data-testid="updateAt">{updateAt}</div>
      <button
        onClick={() => {
          setData({
            profile: {
              name: "John",
              title: "Dev",
              description: "",
            },
            portfolios: [],
          });
        }}
      >
        Set Data
      </button>
      <button onClick={triggerUpdate}>Trigger Update</button>
    </div>
  );
}

describe("PortfolioContext", () => {
  test("provides default values", () => {
    const TestWithoutProvider = () => {
      const context = usePortfolioContext();
      return <div>{context ? "has-context" : "no-context"}</div>;
    };

    render(
      <PortfolioProvider>
        <TestWithoutProvider />
      </PortfolioProvider>
    );

    expect(screen.getByText("has-context")).toBeInTheDocument();
  });

  test("setData updates context value", async () => {
    const user = userEvent.setup();
    render(
      <PortfolioProvider>
        <TestComponent />
      </PortfolioProvider>
    );

    expect(screen.getByTestId("data").textContent).toBe("no-data");

    await user.click(screen.getByText("Set Data"));

    expect(screen.getByTestId("data").textContent).toBe("John");
  });

  test("triggerUpdate changes updateAt", async () => {
    const user = userEvent.setup();
    render(
      <PortfolioProvider>
        <TestComponent />
      </PortfolioProvider>
    );

    const before = screen.getByTestId("updateAt").textContent;
    await new Promise((r) => setTimeout(r, 5));
    await user.click(screen.getByText("Trigger Update"));
    const after = screen.getByTestId("updateAt").textContent;

    expect(before).not.toBe(after);
  });
});
