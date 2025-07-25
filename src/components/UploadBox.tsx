import { useRef } from "react";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  FieldPath,
  FieldValues,
  UseFormWatch,
} from "react-hook-form";
import { MdOutlineAttachment } from "react-icons/md";
import { subText, textBase, textBaseMedium } from "src/styles/typography";

type UploadBoxProps<T extends FieldValues, K extends FieldPath<T>> = {
  id: string;
  name: K;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
};

export default function UploadBox<
  T extends FieldValues,
  K extends FieldPath<T>
>({ id, name, register, setValue, watch }: UploadBoxProps<T, K>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const files = watch(name) as FileList | undefined;
  const fileName = files?.[0]?.name;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setValue(name, droppedFiles as T[K], { shouldValidate: true });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      data-testid={`upload-container-${id}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className="w-full mx-auto p-8 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-center cursor-pointer"
    >
      <div className="text-2xl mb-2" data-testid={`upload-icon-${id}`}>
        <MdOutlineAttachment />
      </div>
      <p className={textBaseMedium} data-testid={`upload-label-${id}`}>
        Drag and drop files, or{" "}
        <span className="text-blue-600 underline">Browse</span>
      </p>
      <p
        className={`${subText} text-gray-500 mt-2`}
        data-testid={`upload-format-${id}`}
      >
        Support formats : png, jpg, jpeg.
      </p>
      <p
        className={`${subText} text-gray-400 mt-1`}
        data-testid={`upload-size-${id}`}
      >
        Max size : 5Mb
      </p>

      <input
        data-testid={`upload-input-${id}`}
        type="file"
        accept="image/*"
        {...register}
        ref={(e) => {
          register.ref(e);
          inputRef.current = e;
        }}
        className="hidden"
      />
      <p
        className={`${textBase} text-sm text-gray-600`}
        data-testid={`file-name-${id}`}
      >
        {fileName}
      </p>
    </div>
  );
}
