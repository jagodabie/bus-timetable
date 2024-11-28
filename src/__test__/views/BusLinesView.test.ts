import { render, screen, fireEvent } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import { createStore } from "vuex";

import BusLinesView from "../../views/BusLinesView.vue";
import SelectBusLinesSection from "../../components/SelectBusLinesSection.vue";
import BusSection from "../../components/BusSection.vue";
import GenericList from "../../components/ui/GenericList.vue";

import "@testing-library/jest-dom";
import { ref } from "vue";

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
  it("renders SelectBusLinesSection with correct props", () => {
    render(BusLinesView, {
      global: {
        plugins: [mockStore],
        components: { SelectBusLinesSection },
      },
    });

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Select Bus Line",
      })
    ).toHaveTextContent("Select Bus Line");
  });

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

  // it("renders GenericList when currentBusStopsList is available", async () => {
  //   const selectedLine = ref("Line 42");
  //   const selectedStop = ref({ id: 1, name: "Stop A" });

  //   render(BusLinesView, {
  //     global: {
  //       plugins: [mockStore],
  //       components: { GenericList },
  //     },
  //     provide: {
  //       selectedLine,
  //       selectedStop,
  //     },
  //   });

  //   screen.debug();

  //   // const items = screen.getAllByRole("listitem");
  //   // expect(items.length).toBe(2); // Two stops in mock data
  // });

  it.skip("dispatches store action when handleDepartureTime is called", async () => {
    const dispatchSpy = vi.spyOn(mockStore, "dispatch");

    render(BusLinesView, {
      global: {
        plugins: [mockStore],
      },
    });

    // Simulate item selection
    const firstStop = screen.getByText("Stop A");
    await fireEvent.click(firstStop);

    // Ensure the action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      "fetchBusStops/generateCurrentStopDepartures",
      expect.any(Object)
    );
  });

  // it.skip("renders currentStopDepartures in GenericList when selectedStop is set", async () => {
  //   render(BusLinesView, {
  //     global: {
  //       plugins: [mockStore],
  //       components: { GenericList },
  //     },
  //   });

  //   const items = screen.getAllByText(/10:00 AM|10:15 AM/);
  //   expect(items.length).toBe(2); // Two departures in mock data
  // });

  // it.skip("updates selectedLine and selectedStop when emitted from child components", async () => {
  //   render(BusLinesView, {
  //     global: {
  //       plugins: [mockStore],
  //     },
  //   });

  //   const selectBusLinesSection = screen.getByRole("combobox");
  //   await fireEvent.update(selectBusLinesSection, "Line A");

  //   expect(screen.getByText("Bus Line: Line A")).toBeInTheDocument();
  // });
});
