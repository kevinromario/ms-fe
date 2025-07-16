import Button from "src/components/Button";
import Card from "src/components/Card";
import Section from "src/components/Section";

export default function Editor() {
  const renderEditorAction = () => {
    return (
      <div className="flex justify-between gap-2">
        <Button text="Simpan Perubahan" />
      </div>
    );
  };
  return (
    <Section title="Editor" action={renderEditorAction()}>
      <div className="flex flex-col gap-5">
        <Card title="Background Image">Content</Card>
        <Card title="Profile Image">Content</Card>
        <Card title="Profile">Content</Card>
        <Card title="Portofolio 1" deletable>
          Content
        </Card>
        <div className="flex flex-col items-center">
          <Button text="Tambah Portofolio" />
        </div>
      </div>
    </Section>
  );
}
