import { ReactNode } from "react";
import { textH1 } from "src/styles/typography";

type SectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function Section(props: SectionProps) {
  return (
    <section
      id={props.title.toLowerCase()}
      className="w-full md:w-1/2 p-4 sm:p-8 flex flex-col"
    >
      <div className="flex justify-between items-center pb-8">
        <span className={`${textH1}`}>{props.title}</span>
        {props.action}
      </div>
      {props.children}
    </section>
  );
}
