import { FieldError } from "react-hook-form";
import VStack from "./VStack";
import { inputBase } from "src/styles/inputStyles";
import { subTextError, textBase } from "src/styles/typography";

type Props = {
  label: string;
  placeholder: string;
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  placeholder,
  error,
  ...rest
}: Props) {
  return (
    <VStack>
      <span className={textBase}>{label}</span>
      <input className={inputBase} placeholder={placeholder} {...rest} />
      {error && <p className={subTextError}>{error.message}</p>}
    </VStack>
  );
}
