"use client";

import Section from "src/components/Section";
import Editor from "./Editor";
import Portfolio from "src/components/Portfolio";

export default function EditPage() {
  return (
    <div className={`flex flex-col min-h-screen md:flex-row`}>
      <Editor />
      <div className="hidden md:block md:w-px md:my-5 md:bg-gray-300" />
      <Section title="Preview">
        <Portfolio />
      </Section>
    </div>
  );
}
