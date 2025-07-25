type PortfolioCardProps = {
  id: string;
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export default function PortfolioCard({
  id,
  title,
  company,
  startDate,
  endDate,
  description,
}: PortfolioCardProps) {
  return (
    <div className="rounded-xl shadow-md pt-2 px-6 pb-4 bg-white mb-8">
      <h3
        data-testid={`portfolio-${id}-title`}
        className="text-base 3xl:text-2xl font-medium"
      >
        {title || "Posisi"}
      </h3>
      <p
        data-testid={`portfolio-${id}-company`}
        className="text-xs 3xl:text-lg font-medium text-gray-500"
      >
        {company || "Perusahaan"}
      </p>
      <p
        data-testid={`portfolio-${id}-date`}
        className="text-xs 3xl:text-lg text-gray-400"
      >{`${startDate || "Tanggal Mulai"} – ${endDate || "Tanggal Selesai"}`}</p>
      <p
        data-testid={`portfolio-${id}-description`}
        className="mt-2 text-xs 3xl:text-lg text-gray-700"
      >
        {description || "Deskripsi"}
      </p>
    </div>
  );
}
