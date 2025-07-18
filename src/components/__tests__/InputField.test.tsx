import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../InputField";

describe("InputField", () => {
  it("renders label and placeholder correctly", () => {
    render(
      <InputField
        label="Nama Lengkap"
        placeholder="Masukkan nama"
        name="fullName"
      />
    );

    expect(screen.getByText("Nama Lengkap")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Masukkan nama")).toBeInTheDocument();
  });

  it("shows error message if error prop is provided", () => {
    render(
      <InputField
        label="Nama Lengkap"
        placeholder="Masukkan nama"
        name="fullName"
        error={{ message: "Nama wajib diisi", type: "required" }}
      />
    );

    expect(screen.getByText("Nama wajib diisi")).toBeInTheDocument();
  });

  it("accepts and triggers input change", async () => {
    const user = userEvent.setup();
    render(
      <InputField
        label="Nama Lengkap"
        placeholder="Masukkan nama"
        name="fullName"
      />
    );

    const input = screen.getByPlaceholderText(
      "Masukkan nama"
    ) as HTMLInputElement;
    await user.type(input, "Kevin");
    expect(input.value).toBe("Kevin");
  });
});
