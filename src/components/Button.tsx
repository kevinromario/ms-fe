import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const primaryCss = "bg-blue-600 text-white cursor-pointer hover:bg-blue-700";
  const disabledCss = "bg-gray-200 text-gray-400 cursor-not-allowed";

  const handleClick = () => {
    if (props.disabled || !props.onClick) return;
    props.onClick();
  };

  return (
    <button
      className={`px-4 py-2 rounded ${
        props.disabled ? disabledCss : primaryCss
      }`}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
