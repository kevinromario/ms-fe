import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextareaField from "../TextareaField";

describe("TextareaField", () => {
  it("renders label and placeholder correctly", () => {
    render(
      <TextareaField
        label="Deskripsi"
        placeholder="Masukkan deskripsi"
        name="description"
      />
    );

    expect(screen.getByText("Deskripsi")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Masukkan deskripsi")
    ).toBeInTheDocument();
  });

  it("shows error message if error prop is provided", () => {
    render(
      <TextareaField
        label="Deskripsi"
        placeholder="Masukkan deskripsi"
        error={{ message: "Deskripsi wajib diisi", type: "required" }}
        name="description"
      />
    );

    expect(screen.getByText("Deskripsi wajib diisi")).toBeInTheDocument();
  });

  it("accepts and triggers textarea change", async () => {
    const user = userEvent.setup();
    render(
      <TextareaField
        label="Deskripsi"
        placeholder="Masukkan deskripsi"
        name="description"
      />
    );

    const textarea = screen.getByPlaceholderText(
      "Masukkan deskripsi"
    ) as HTMLTextAreaElement;
    await user.type(textarea, "Test");
    expect(textarea.value).toBe("Test");
  });
});
