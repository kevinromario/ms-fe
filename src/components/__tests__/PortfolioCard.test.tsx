import { render, screen } from "@testing-library/react";
import PortfolioCard from "../PortfolioCard";

describe("PortfolioCard component", () => {
  const defaultProps = {
    id: "1",
    title: "Frontend Developer",
    company: "OpenAI",
    startDate: "Jan 2020",
    endDate: "Dec 2024",
    description: "Mengerjakan aplikasi AI modern.",
  };

  it("renders all provided props correctly", () => {
    render(<PortfolioCard {...defaultProps} />);

    expect(screen.getByTestId("portfolio-1-title")).toHaveTextContent(
      "Frontend Developer"
    );
    expect(screen.getByTestId("portfolio-1-company")).toHaveTextContent(
      "OpenAI"
    );
    expect(screen.getByTestId("portfolio-1-date")).toHaveTextContent(
      "Jan 2020 – Dec 2024"
    );
    expect(screen.getByTestId("portfolio-1-description")).toHaveTextContent(
      "Mengerjakan aplikasi AI modern."
    );
  });

  it("renders fallback text when props are missing", () => {
    render(<PortfolioCard id="2" />);

    expect(screen.getByTestId("portfolio-2-title")).toHaveTextContent("Posisi");
    expect(screen.getByTestId("portfolio-2-company")).toHaveTextContent(
      "Perusahaan"
    );
    expect(screen.getByTestId("portfolio-2-date")).toHaveTextContent(
      "Tanggal Mulai – Tanggal Selesai"
    );
    expect(screen.getByTestId("portfolio-2-description")).toHaveTextContent(
      "Deskripsi"
    );
  });
});
