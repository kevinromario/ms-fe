type PortfolioCardProps = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
};

export default function PortfolioCard({
  title,
  company,
  startDate,
  endDate,
  description,
}: PortfolioCardProps) {
  return (
    <div className="rounded-xl shadow-md pt-2 px-6 pb-4 bg-white mb-8">
      <h3 className="text-base 3xl:text-2xl font-medium">{title}</h3>
      <p className="text-xs 3xl:text-lg font-medium text-gray-500">{company}</p>
      <p className="text-xs 3xl:text-lg text-gray-400">{`${startDate} – ${endDate}`}</p>
      <p className="mt-2 text-xs 3xl:text-lg text-gray-700">{description}</p>
    </div>
  );
}
