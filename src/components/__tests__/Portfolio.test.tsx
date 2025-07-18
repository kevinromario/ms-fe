import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Portfolio from "../Portfolio";
import { PortfolioProps } from "../Portfolio";

describe("Portfolio", () => {
  const defaultProps: PortfolioProps = {
    backgroundImage: null,
    profileImage: null,
    profile: {
      name: "John Doe",
      title: "Software Engineer",
      description: "Experienced developer",
    },
    portfolios: [
      {
        position: "Frontend Developer",
        company: "Tech Corp",
        startDate: "Jan 2020",
        endDate: "Dec 2021",
        description: "Built amazing UIs",
      },
    ],
  };

  it("renders default background and profile image when none provided", () => {
    render(
      <Portfolio {...defaultProps} backgroundImage={null} profileImage={null} />
    );

    const bgDefault = screen.getByTestId("portfolio-default-bg-pict");
    const profileDefault = screen.getByTestId("portfolio-default-profil-pict");

    expect(bgDefault).toBeInTheDocument();
    expect(profileDefault).toBeInTheDocument();
  });

  it("renders profile info correctly", () => {
    render(<Portfolio {...defaultProps} />);

    expect(screen.getByTestId("portfolio-name")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("portfolio-title")).toHaveTextContent(
      "Software Engineer"
    );
    expect(screen.getByTestId("portfolio-description")).toHaveTextContent(
      "Experienced developer"
    );
  });

  it("renders portfolio items", () => {
    render(<Portfolio {...defaultProps} />);

    expect(screen.getByTestId("portfolio-0-title")).toHaveTextContent(
      "Frontend Developer"
    );
    expect(screen.getByTestId("portfolio-0-company")).toHaveTextContent(
      "Tech Corp"
    );
    expect(screen.getByTestId("portfolio-0-date")).toHaveTextContent(
      "Jan 2020 – Dec 2021"
    );
    expect(screen.getByTestId("portfolio-0-description")).toHaveTextContent(
      "Built amazing UIs"
    );
  });

  it("renders fallback portfolio card when no portfolio data provided", () => {
    render(<Portfolio {...defaultProps} portfolios={[]} />);

    expect(screen.getByTestId("portfolio-1-title")).toHaveTextContent("Posisi");
  });
});
