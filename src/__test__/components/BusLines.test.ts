import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";

import BusLines from "../../components/BusSection.vue";

import "@testing-library/jest-dom";

describe("BusLines.vue", () => {
  it("renders the title and slot content when showTitle is true", () => {
    const sectionTitle = "Bus Line: 42";
    const placeholderTitle = "Please select a bus line";

    render(BusLines, {
      props: {
        showTitle: true,
        sectionTitle,
        placeholderTitle,
      },
      slots: {
        default: "<div>Slot Content</div>",
      },
    });

    expect(screen.getByText(sectionTitle)).toBeInTheDocument();

    expect(screen.getByText("Slot Content")).toBeInTheDocument();
  });

  it("renders the placeholder when showTitle is false", () => {
    const placeholderTitle = "Please select a bus line";

    render(BusLines, {
      props: {
        showTitle: false,
        sectionTitle: "Bus Line: 42",
        placeholderTitle,
      },
    });

    // Check if the placeholder is rendered
    expect(screen.getByText(placeholderTitle)).toBeInTheDocument();

    // Ensure the title is not rendered
    expect(screen.queryByText("Bus Line: 42")).not.toBeInTheDocument();

    // Ensure the slot content is not rendered
    expect(screen.queryByText("Slot Content")).not.toBeInTheDocument();
  });
});
