import { render, screen } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import { createStore } from "vuex";

import BusLinesView from "../../views/BusLinesView.vue";

import "@testing-library/jest-dom";

const mockStore = createStore({
  modules: {
    fetchBusStops: {
      namespaced: true,
      state: () => ({
        currentBusStopsList: [
          { id: 1, name: "Stop A", order: 1 },
          { id: 2, name: "Stop B", order: 2 },
        ],
        currentStopDepartures: [
          { id: 1, time: "10:00 AM" },
          { id: 2, time: "10:15 AM" },
        ],
      }),
      actions: {
        generateCurrentStopDepartures: vi.fn(),
      },
    },
  },
});

describe.skip("BusLinesView.vue", () => {
  it("renders BusSection and passes props correctly when line is not selected", () => {
    render(BusLinesView, {
      global: {
        plugins: [mockStore],
      },
    });

    expect(screen.getAllByText("Please select the bus stop first").length).toBe(
      2
    );
  });
});
