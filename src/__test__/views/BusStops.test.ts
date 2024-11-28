import { render, screen } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import { createStore } from "vuex";

import BusStopsView from "../../views/BusStopsView.vue";

describe("BusStopsView.vue", () => {
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
});
