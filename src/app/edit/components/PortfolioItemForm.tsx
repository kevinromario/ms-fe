import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PortfolioType } from "src/types/portfolioType";
import Card from "src/components/Card";
import InputField from "src/components/InputField";
import TextareaField from "src/components/TextareaField";

type Props = {
  index: number;
  fieldId: string;
  errors: FieldErrors<PortfolioType>;
  register: UseFormRegister<PortfolioType>;
  handleDelete: () => void;
  deletable: boolean;
};

export default function PortfolioItemForm({
  index,
  fieldId,
  errors,
  register,
  handleDelete,
  deletable,
}: Props) {
  const fieldErrors = errors.portfolios?.[index] || {};

  return (
    <Card
      key={fieldId}
      id={`portofolio-${index}`}
      title={`Portofolio ${index + 1}`}
      deletable={deletable}
      handleDelete={handleDelete}
    >
      <div className="flex flex-col gap-4">
        <InputField
          label="Posisi:"
          placeholder="Position"
          {...register(`portfolios.${index}.position`)}
          error={fieldErrors.position}
        />
        <InputField
          label="Perusahaan:"
          placeholder="Company"
          {...register(`portfolios.${index}.company`)}
          error={fieldErrors.company}
        />
        <InputField
          label="Tanggal Mulai:"
          placeholder="Tanggal Mulai"
          type="date"
          {...register(`portfolios.${index}.startDate`)}
          error={fieldErrors.startDate}
        />
        <InputField
          label="Tanggal Selesai:"
          placeholder="Tanggal Selesai"
          type="date"
          {...register(`portfolios.${index}.endDate`)}
          error={fieldErrors.endDate}
        />
        <TextareaField
          label="Deskripsi:"
          placeholder="Description"
          rows={4}
          {...register(`portfolios.${index}.description`)}
          error={fieldErrors.description}
        />
      </div>
    </Card>
  );
}
