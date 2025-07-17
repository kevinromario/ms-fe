import { ReactNode } from "react";

type GapValue =
  | "0"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

type VStackProps = {
  children: ReactNode;
  gap?: GapValue;
};
export default function VStack({ children, gap = "2" }: VStackProps) {
  return <div className={`flex flex-col gap-${gap}`}>{children}</div>;
}
