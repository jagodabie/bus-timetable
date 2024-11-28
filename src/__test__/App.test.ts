import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import NavTabs from "../components/ui/NavTabs.vue";

import { tabs } from "./utils";

import "@testing-library/jest-dom";

// Mockowane Vuex store
const mockStore = createStore({
  modules: {
    fetchBusStops: {
      namespaced: true,
      actions: {
        fetchData: vi.fn(),
        generateStopsList: vi.fn(),
      },
    },
  },
});

// Mockowane trasy routera
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Bus Lines</div>" } },
    { path: "/stops", component: { template: "<div>Stops</div>" } },
  ],
});

describe("App.vue", () => {
  it("renders the main structure", async () => {
    render(App, {
      global: {
        plugins: [mockStore, mockRouter],
        stubs: {
          NavTabs,
        },
      },
    });

    expect(
      screen.getByRole("heading", { name: /timetable/i })
    ).toBeInTheDocument();

    const navTabs = screen.getByRole("navigation");
    expect(navTabs).toBeInTheDocument();

    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });
});
