import { ReactNode, useEffect, useRef, useState } from "react";
import { MdCloseFullscreen, MdOpenInFull } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import { textUnderlineBase } from "src/styles/typography";

type CardProps = {
  deletable?: boolean;
  handleDelete?: () => void;
  title: string;
  children: ReactNode;
};

export default function Card(props: CardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="bg-white p-6 drop-shadow-md rounded-xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className={textUnderlineBase}>{props.title}</span>
        <div className="flex gap-2 ">
          <div
            className="cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <MdCloseFullscreen /> : <MdOpenInFull />}
          </div>
          {props.deletable && <SlClose className="cursor-pointer" />}
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight }}
      >
        {props.children}
      </div>
    </div>
  );
}
