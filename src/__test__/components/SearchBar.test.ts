import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../../components/ui/SearchBar.vue";

import "@testing-library/jest-dom";

describe("SearchBar.vue", () => {
  it("renders the label correctly", () => {
    const label = "Search Items";

    render(SearchBar, {
      props: { label },
    });

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("emits the 'update:query' event with a debounced input value", async () => {
    const debounceDelay = 300;
    const onUpdateQuery = vi.fn();

    render(SearchBar, {
      props: { debounceDelay },
      attrs: { "onUpdate:query": onUpdateQuery },
    });

    const input = screen.getByRole("textbox");

    await fireEvent.update(input, "hello");

    expect(onUpdateQuery).not.toHaveBeenCalled();

    await waitFor(
      () => {
        expect(onUpdateQuery).toHaveBeenCalledWith("hello");
      },
      { timeout: debounceDelay + 100 }
    );
  });

  it("shows the floating label on focus", async () => {
    render(SearchBar, {
      props: { label: "Search" },
    });

    const input = screen.getByRole("textbox");
    const label = screen.getByText("Search");

    expect(label).not.toHaveClass("focus-label");

    await fireEvent.focus(input);
    expect(label).toHaveClass("focus-label");

    await fireEvent.blur(input);
    expect(label).not.toHaveClass("focus-label");
  });

  it("hides the search icon when the input is focused", async () => {
    render(SearchBar, {
      props: { label: "Search" },
    });

    const input = screen.getByRole("textbox");
    const icon = screen.queryByTestId("search-icon");

    expect(icon).toBeInTheDocument();

    await fireEvent.focus(input);

    expect(icon).not.toBeInTheDocument();
  });
});
