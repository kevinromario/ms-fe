"use client";

import Button from "src/components/Button";
import Section from "src/components/Section";
import { backgroundColor } from "src/constants";

export default function EditPage() {
  const renderEditorAction = () => {
    return (
      <div className="flex justify-between gap-2">
        <Button text="Simpan Perubahan" />
      </div>
    );
  };
  return (
    <div
      className={`flex flex-col min-h-screen bg-[${backgroundColor}] md:flex-row`}
    >
      <Section title="Editor" action={renderEditorAction()}>
        Test
      </Section>
      <div className="w-px my-5 bg-gray-300 "></div>
      <Section title="Preview">Test</Section>
    </div>
  );
}
