"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "src/components/Button";
import Portfolio from "src/components/Portfolio";

import { textBase } from "src/styles/typography";
import { PortfolioType } from "src/types/portfolioType";
import { getDbData } from "src/utils/dbUtils";

export default function HomePage() {
  const [data, setData] = useState<PortfolioType>();

  useEffect(() => {
    const loadData = async () => {
      const dbData = await getDbData();
      if (dbData) {
        setData(dbData);
      }
    };
    loadData();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-7`}
    >
      {data ? (
        <Portfolio {...data} />
      ) : (
        <div className="w-full sm:w-sm 3xl:w-md bg-white p-7 flex flex-col items-center justify-center gap-4 rounded-xl drop-shadow-xl">
          <p className={textBase}>Kamu belum punya portofolio</p>
          <Link href={"/edit"}>
            <Button id="create-portfolio" text="Buat Portofolio" />
          </Link>
        </div>
      )}
      {data && (
        <Link href="/edit">
          <Button
            id="edit-portfolio"
            text="Edit Portofolio"
            className="fixed bottom-6 right-6 z-50"
          />
        </Link>
      )}
    </div>
  );
}
