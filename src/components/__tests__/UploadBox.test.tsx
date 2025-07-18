import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadBox from "../UploadBox";
import { useForm } from "react-hook-form";

type FormData = {
  image: FileList;
};

function WrapperComponent() {
  const { register, setValue, watch } = useForm<FormData>();
  return (
    <UploadBox
      id="test"
      name="image"
      register={register("image")}
      setValue={setValue}
      watch={watch}
    />
  );
}

describe("UploadBox component", () => {
  it("renders all static text elements correctly", () => {
    render(<WrapperComponent />);
    expect(screen.getByTestId("upload-icon-test")).toBeInTheDocument();
    expect(screen.getByTestId("upload-label-test")).toHaveTextContent(
      /drag and drop files/i
    );
    expect(screen.getByTestId("upload-format-test")).toHaveTextContent(
      /png, jpg/i
    );
    expect(screen.getByTestId("upload-size-test")).toHaveTextContent(/5mb/i);
  });

  it("triggers file input click on container click", () => {
    render(<WrapperComponent />);
    const input = screen.getByTestId("upload-input-test");
    const clickSpy = vi.spyOn(input, "click");
    fireEvent.click(screen.getByTestId("upload-container-test"));
    expect(clickSpy).toHaveBeenCalled();
  });

  it("shows selected file name after drop", () => {
    render(<WrapperComponent />);
    const file = new File(["dummy"], "test-image.png", { type: "image/png" });

    const data = {
      dataTransfer: {
        files: [file],
      },
      preventDefault: vi.fn(),
    };

    fireEvent.drop(screen.getByTestId("upload-container-test"), data);
    expect(screen.getByTestId("file-name-test")).toHaveTextContent(
      "test-image.png"
    );
  });
});
