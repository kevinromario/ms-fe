import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toast from "../Toast";

describe("Toast component", () => {
  it("renders with the correct message", () => {
    render(<Toast message="Berhasil disimpan" show={true} />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveTextContent("Berhasil disimpan");
  });

  it("is visible when show is true", () => {
    render(<Toast message="Toast aktif" show={true} />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveClass("opacity-100");
  });

  it("is hidden when show is false", () => {
    render(<Toast message="Toast nonaktif" show={false} />);
    const toast = screen.getByTestId("toast");
    expect(toast).toHaveClass("opacity-0");
    expect(toast).toHaveClass("pointer-events-none");
  });
});
