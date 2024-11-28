import { render, screen, fireEvent } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import { createStore } from "vuex";

import BusStopsView from "../../views/BusStopsView.vue";

describe("BusStopsView.vue", () => {
  // Mock Vuex store
  const mockStore = createStore({
    modules: {
      fetchBusStops: {
        namespaced: true,
        state: () => ({
          stopsList: [
            { id: 1, name: "Central Station" },
            { id: 2, name: "Main Street" },
            { id: 3, name: "Broadway Avenue" },
          ],
        }),
        actions: {
          generateStopsList: vi.fn(),
        },
      },
    },
  });

  it("renders SearchBar and GenericList components", () => {
    render(BusStopsView, {
      global: {
        plugins: [mockStore],
      },
    });

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();

    expect(screen.getByText("Bus Stops")).toBeInTheDocument();
  });

  it("filters bus stops based on search input", async () => {
    render(BusStopsView, {
      global: {
        plugins: [mockStore],
      },
    });

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();

    // Initially, all items should be visible
    expect(screen.getByText("Central Station")).toBeInTheDocument();
    expect(screen.getByText("Main Street")).toBeInTheDocument();
    expect(screen.getByText("Broadway Avenue")).toBeInTheDocument();

    // Type into the search bar
    await fireEvent.change(input, { target: { value: "23" } });
    expect(input.value).toBe("$23");

    screen.debug();

    // // Only matching items should be visible
    // expect(screen.getByText("Main Street")).toBeInTheDocument();
    // expect(screen.queryByText("Central Station")).not.toBeInTheDocument();
    // expect(screen.queryByText("Broadway Avenue")).not.toBeInTheDocument();
  });

  it.skip("renders a message when no bus stops match the search term", async () => {
    render(BusStopsView, {
      global: {
        plugins: [mockStore],
      },
    });

    const input = screen.getByLabelText("Search");

    // Type a term that doesn't match any bus stop
    await fireEvent.update(input, "Nonexistent Stop");

    // Check that no items are displayed and a fallback message is shown
    expect(screen.queryByText("Central Station")).not.toBeInTheDocument();
    expect(screen.queryByText("Main Street")).not.toBeInTheDocument();
    expect(screen.queryByText("Broadway Avenue")).not.toBeInTheDocument();
    expect(screen.getByText("No items to display.")).toBeInTheDocument();
  });
});
