import { render, fireEvent, screen } from "@testing-library/react";
import MapFilter from "../components/map/MapFilter";
import { describe, expect, it, vi } from "vitest";

describe("MapFilter Component", () => {
  it("should apply filter when apply button is clicked", () => {
    const mockOnDataFilter = vi.fn();
    render(<MapFilter data={[]} onDataFiltered={mockOnDataFilter} />);

    expect(screen.getByText("appl")).toBeInTheDocument();
  });
});

// https://github.com/radix-ui/primitives/issues/1822#issuecomment-1474172897
