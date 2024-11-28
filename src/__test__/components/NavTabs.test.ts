import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import NavTabs from "../../components/ui/NavTabs.vue";

import "@testing-library/jest-dom";
import { createRouter, createWebHistory } from "vue-router";

const mockTabs = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const routes = mockTabs.map((tab) => ({
  path: tab.path,
  component: { template: `<div>${tab.label} Page</div>` },
}));

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("NavTabs.vue", () => {
  it("renders the correct number of tabs with labels", () => {
    render(NavTabs, {
      props: { tabs: mockTabs },
      global: { plugins: [router] },
    });

    mockTabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it("renders router-link elements with correct paths", () => {
    render(NavTabs, {
      props: { tabs: mockTabs },
      global: { plugins: [router] },
    });

    mockTabs.forEach((tab) => {
      const link = screen.getByText(tab.label);
      expect(link).toHaveAttribute("href", tab.path);
    });
  });

  it("applies the active-tab class to the active tab", async () => {
    render(NavTabs, {
      props: { tabs: mockTabs },
      global: { plugins: [router] },
    });

    await router.push("/about");
    await router.isReady();

    const activeLink = screen.getByText("About");
    expect(activeLink).toHaveClass("active-tab");

    const inactiveLinks = mockTabs
      .filter((tab) => tab.label !== "About")
      .map((tab) => screen.getByText(tab.label));
    inactiveLinks.forEach((link) => {
      expect(link).not.toHaveClass("active-tab");
    });
  });
});
