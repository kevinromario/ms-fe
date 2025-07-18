import { ReactNode, useEffect, useRef, useState } from "react";
import { MdCloseFullscreen, MdOpenInFull } from "react-icons/md";
import { SlClose } from "react-icons/sl";
import { textUnderlineBase } from "src/styles/typography";

type CardProps = {
  id?: string;
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
    const updateMaxHeight = () => {
      if (contentRef.current) {
        setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
      }
    };

    updateMaxHeight();

    window.addEventListener("resize", updateMaxHeight);

    const observer = new MutationObserver(() => {
      updateMaxHeight();
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
      observer.disconnect();
    };
  }, [isOpen]);

  return (
    <div
      id={props.id}
      data-testid={props.id}
      className="bg-white p-6 drop-shadow-md rounded-xl flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <span
          data-testid={`card-title-${props.id}`}
          className={textUnderlineBase}
        >
          {props.title}
        </span>
        <div className="flex gap-2 ">
          <div className="cursor-pointer">
            {isOpen ? (
              <MdCloseFullscreen
                data-testid={`card-toggle-close-${props.id}`}
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <MdOpenInFull
                data-testid={`card-toggle-open-${props.id}`}
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
          {props.deletable && (
            <SlClose
              data-testid={`card-delete-${props.id}`}
              className="cursor-pointer"
              onClick={props.handleDelete}
            />
          )}
        </div>
      </div>
      <div
        data-testid={`card-content-${props.id}`}
        ref={contentRef}
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "expanded" : "collapsed"
        }`}
        style={{ maxHeight }}
      >
        {props.children}
      </div>
    </div>
  );
}
