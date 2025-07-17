"use client";

import Section from "src/components/Section";
import Editor from "./Editor";
import Portfolio from "src/components/Portfolio";
import { usePortfolioContext } from "src/contexts/PortfolioContext";
import Link from "next/link";
import Button from "src/components/Button";

export default function EditPage() {
  const { data } = usePortfolioContext();

  return (
    <div className={`flex flex-col min-h-screen md:flex-row`}>
      <Editor />
      <div className="hidden md:block md:w-px md:my-5 md:bg-gray-300" />
      <Section title="Preview">
        <Portfolio {...data} />
      </Section>
      <Link href={"/"}>
        <Button
          text="Lihat Portofolio"
          className="fixed bottom-6 right-6 z-50"
        />
      </Link>
    </div>
  );
}
