import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";

import GenericList from "../../components/ui/GenericList.vue";

import "@testing-library/jest-dom";

describe(
  "GenericList.vue",
  {
    // Add options object as the second argument
  },
  () => {
    const mockItems = [
      { id: 1, name: "Item A" },
      { id: 2, name: "Item B" },
      { id: 3, name: "Item C" },
    ];

    it("renders the header when provided sort icon is shown", () => {
      const header = "Test Header";

      render(GenericList, {
        props: {
          items: mockItems,
          header,
          selected: mockItems[0],
          sortField: "name",
        },
      });
      expect(screen.getByRole("heading", { name: header })).toBeInTheDocument();
      expect(screen.getByTestId("sort-icon")).toBeInTheDocument();
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem").length).toBe(mockItems.length);
    });

    it("renders the header when provided sort icon is hidden", () => {
      const header = "Test Header";

      render(GenericList, {
        props: {
          items: mockItems,
          header,
          selected: mockItems[0],
          hiddenSortIcon: true,
          sortField: "name",
        },
      });
      expect(screen.getByRole("heading", { name: header })).toBeInTheDocument();
      expect(screen.queryByTestId("sort-icon")).not.toBeInTheDocument();
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem").length).toBe(mockItems.length);
    });

    it("displays an error message when item is empty array are provided", () => {
      render(GenericList, {
        props: {
          items: [],
          sortField: "name",
          selected: mockItems[0],
        },
      });

      expect(screen.getByText("No items to display.")).toBeInTheDocument;
    });

    it("sorts items in ascending and descending order when the sort icon is clicked", async () => {
      render(GenericList, {
        props: {
          items: mockItems,
          sortField: "name",
          header: "Test Header",
        },
      });

      const sortIcon = screen.getByTestId("sort-icon");
      expect(sortIcon).toBeInTheDocument();

      await fireEvent.click(sortIcon);
      expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("Item C");

      await fireEvent.click(sortIcon);
      expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("Item A");
    });
    it("applies the 'selected' class to the selected item", async () => {
      render(GenericList, {
        props: {
          items: mockItems,
          selected: mockItems[0],
          sortField: "name",
        },
      });

      const selectedItem = screen.getByText("Item A");
      expect(selectedItem).toHaveClass("selected");
    });
    it("renders slot content for each item", () => {
      render(GenericList, {
        props: {
          items: mockItems,
          sortField: "name",
        },
        slots: {
          default: `<template #default="{ item }">
              <div>Custom Slot: {{ item.name }}</div>
            </template>`,
        },
      });

      mockItems.forEach((item) => {
        expect(
          screen.getByText(`Custom Slot: ${item.name}`)
        ).toBeInTheDocument();
      });
    });
  }
);
