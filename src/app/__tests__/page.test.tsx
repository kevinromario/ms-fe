import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../page";
import { vi } from "vitest";
import * as dbUtils from "src/utils/dbUtils";
import { PortfolioType } from "src/types/portfolioType";
import "@testing-library/jest-dom";

vi.mock("src/components/Portfolio", () => ({
  default: () => <div data-testid="portfolio-component">Portfolio Loaded</div>,
}));

vi.mock("src/components/Button", () => ({
  default: ({ text }: { text: string }) => <button>{text}</button>,
}));

const mockPortfolioData: PortfolioType = {
  profile: {
    name: "Kevin",
    title: "Frontend Engineer",
    description: "Build portfolio",
  },
  portfolios: [
    {
      position: "Developer",
      company: "Company A",
      startDate: "2023-01-01",
      endDate: "2023-06-01",
      description: "Deskripsi proyek",
    },
  ],
  backgroundImage: null,
  profileImage: null,
};

describe("HomePage", () => {
  it("shows empty portfolio message when no data", async () => {
    vi.spyOn(dbUtils, "getDbData").mockResolvedValue(null);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/belum punya portofolio/i)).toBeInTheDocument();
    });

    expect(screen.getByText("Buat Portofolio")).toBeInTheDocument();
  });

  it("renders Portfolio component when data exists", async () => {
    vi.spyOn(dbUtils, "getDbData").mockResolvedValue(mockPortfolioData);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("portfolio-component")).toBeInTheDocument();
    });

    expect(screen.getByText("Edit Portofolio")).toBeInTheDocument();
  });
});
