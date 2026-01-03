import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import JobCard from "../../components/jobs/JobCard";

const mockJob = {
  _id: "1",
  title: "Senior React Developer",
  company: "Tech Corp",
  location: "San Francisco, CA",
  type: "full-time",
  salary: {
    min: 120000,
    max: 160000,
  },
  experienceLevel: "senior",
  isRemote: true,
  skills: ["React", "TypeScript", "Node.js"],
  createdAt: "2024-01-15T10:30:00.000Z",
};

describe("JobCard Component", () => {
  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <JobCard job={mockJob} {...props} />
      </BrowserRouter>
    );
  };

  it("renders job information correctly", () => {
    renderComponent();

    expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
    expect(screen.getByText("full-time")).toBeInTheDocument();
  });

  it("displays remote badge when job is remote", () => {
    renderComponent();
    expect(screen.getByText("Remote")).toBeInTheDocument();
  });

  it("calls onSave when save button is clicked", () => {
    const onSave = jest.fn();
    renderComponent({ onSave });

    const saveButton = screen.getByTitle("Save job");
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith("1");
  });

  it("calls onUnsave when unsave button is clicked on saved job", () => {
    const onUnsave = jest.fn();
    renderComponent({ onUnsave, isSaved: true });

    const unsaveButton = screen.getByTitle("Remove from saved");
    fireEvent.click(unsaveButton);

    expect(onUnsave).toHaveBeenCalledWith("1");
  });

  it("displays skills", () => {
    renderComponent();

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });
});
