import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import BusPlaceholder from "../../components/ui/BusPlaceholder.vue";

import "@testing-library/jest-dom";

describe("Placeholder.vue", () => {
  it("renders the title passed as a prop", () => {
    const title = "This is a placeholder";

    render(BusPlaceholder, {
      props: {
        title,
      },
    });

    // Check if the title is rendered
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("placeholder__title");
  });
});
