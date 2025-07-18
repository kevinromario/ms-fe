import { ReactNode } from "react";
import { textH1 } from "src/styles/typography";

type SectionProps = {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function Section(props: SectionProps) {
  return (
    <section
      id={props.id}
      data-testid={`section-${props.id}`}
      className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col"
    >
      <div className="flex justify-between items-center pb-8">
        <span data-testid={`section-title-${props.id}`} className={`${textH1}`}>
          {props.title}
        </span>
        {props.action}
      </div>
      {props.children}
    </section>
  );
}
