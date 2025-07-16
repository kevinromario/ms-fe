"use client";

import Section from "src/components/Section";
import { backgroundColor } from "src/constants";
import Editor from "./Editor";

export default function EditPage() {
  return (
    <div
      className={`flex flex-col min-h-screen bg-[${backgroundColor}] md:flex-row`}
    >
      <Editor />
      <div className="hidden md:block md:w-px md:my-5 md:bg-gray-300" />
      <Section title="Preview">Test</Section>
    </div>
  );
}
