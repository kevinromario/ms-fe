import { FieldError } from "react-hook-form";
import VStack from "./VStack";
import { textareaBase } from "src/styles/inputStyles";
import { subTextError, textBase } from "src/styles/typography";

type Props = {
  label: string;
  placeholder: string;
  error?: FieldError;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextareaField({
  label,
  placeholder,
  error,
  ...rest
}: Props) {
  return (
    <VStack>
      <span className={textBase}>{label}</span>
      <textarea className={textareaBase} placeholder={placeholder} {...rest} />
      {error && <p className={subTextError}>{error.message}</p>}
    </VStack>
  );
}
