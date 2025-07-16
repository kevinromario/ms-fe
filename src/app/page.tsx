"use client";

import Link from "next/link";
import Button from "src/components/Button";
import { backgroundColor } from "src/constants";
import { textParagraph } from "src/styles/typography";

export default function Home() {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-7 bg-[${backgroundColor}]`}
    >
      <div className="w-full sm:w-sm 2xl:w-md bg-white p-7 flex flex-col items-center justify-center gap-4 rounded-xl drop-shadow-xl">
        <text className={textParagraph}>Kamu belum punya portofolio</text>
        <Link href={"/edit"}>
          <Button>
            <text className={textParagraph}>Buat Portofolio</text>
          </Button>
        </Link>
      </div>
    </div>
  );
}
