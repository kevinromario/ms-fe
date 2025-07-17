"use client";

import Link from "next/link";
import Button from "src/components/Button";
import { backgroundColor } from "src/constants";
import { textBase } from "src/styles/typography";

export default function HomePage() {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-7 bg-[${backgroundColor}]`}
    >
      <div className="w-full sm:w-sm 3xl:w-md bg-white p-7 flex flex-col items-center justify-center gap-4 rounded-xl drop-shadow-xl">
        <p className={textBase}>Kamu belum punya portofolio</p>
        <Link href={"/edit"}>
          <Button text="Buat Portofolio" />
        </Link>
      </div>
    </div>
  );
}
