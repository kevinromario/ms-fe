import { render, screen } from "@testing-library/react";
import Section from "../Section";

describe("Section component", () => {
  it("renders with given title and id", () => {
    render(
      <Section id="profile" title="Profile Section">
        <p>Child content</p>
      </Section>
    );

    const section = screen.getByTestId("section-profile");
    const title = screen.getByTestId("section-title-profile");

    expect(section).toBeInTheDocument();
    expect(title).toHaveTextContent("Profile Section");
  });

  it("renders children correctly", () => {
    render(
      <Section id="about" title="About Me">
        <p data-testid="section-child">This is about me.</p>
      </Section>
    );

    const child = screen.getByTestId("section-child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("This is about me.");
  });

  it("renders action element if provided", () => {
    render(
      <Section
        id="settings"
        title="Settings"
        action={<button data-testid="action-button">Edit</button>}
      >
        <div>Settings content</div>
      </Section>
    );

    const actionButton = screen.getByTestId("action-button");
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveTextContent("Edit");
  });
});
