import { textButton } from "src/styles/typography";

type ButtonProps = {
  id?: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button(props: ButtonProps) {
  const primaryCss = `bg-blue-600 text-white cursor-pointer hover:bg-blue-700 ${props.className}`;
  const disabledCss = `bg-gray-200 text-gray-400 cursor-not-allowed ${props.className}`;

  const handleClick = () => {
    if (props.disabled || !props.onClick) return;
    props.onClick();
  };

  return (
    <button
      id={props.id}
      data-testid={props.id}
      className={`px-4 py-2 rounded ${
        props.disabled ? disabledCss : primaryCss
      }`}
      onClick={handleClick}
      disabled={props.disabled}
    >
      <span className={`${textButton}`}>{props.text}</span>
    </button>
  );
}
