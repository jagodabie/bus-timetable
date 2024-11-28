import { describe, expect, it } from "vitest";

import { sortGenericItems, listOfUniqueValues } from "../../utils";

describe("sortGenericItems", () => {
  it("should sort by numeric field in ascending order", () => {
    const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
    const sorted = sortGenericItems(items, "value", true);
    expect(sorted).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
  });

  it("should sort by numeric field in descending order", () => {
    const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
    const sorted = sortGenericItems(items, "value", false);
    expect(sorted).toEqual([{ value: 3 }, { value: 2 }, { value: 1 }]);
  });

  it("should sort by string field in ascending order", () => {
    const items = [{ name: "banana" }, { name: "apple" }, { name: "cherry" }];
    const sorted = sortGenericItems(items, "name", true);
    expect(sorted).toEqual([
      { name: "apple" },
      { name: "banana" },
      { name: "cherry" },
    ]);
  });

  it("should sort by string field in descending order", () => {
    const items = [{ name: "banana" }, { name: "apple" }, { name: "cherry" }];
    const sorted = sortGenericItems(items, "name", false);
    expect(sorted).toEqual([
      { name: "cherry" },
      { name: "banana" },
      { name: "apple" },
    ]);
  });

  it("should sort by time field in ascending order", () => {
    const items = [{ time: "14:30" }, { time: "09:15" }, { time: "12:45" }];
    const sorted = sortGenericItems(items, "time", true);
    expect(sorted).toEqual([
      { time: "09:15" },
      { time: "12:45" },
      { time: "14:30" },
    ]);
  });

  it("should sort by time field in descending order", () => {
    const items = [{ time: "14:30" }, { time: "09:15" }, { time: "12:45" }];
    const sorted = sortGenericItems(items, "time", false);
    expect(sorted).toEqual([
      { time: "14:30" },
      { time: "12:45" },
      { time: "09:15" },
    ]);
  });

  it("should return an empty array when input is empty", () => {
    const items: { value: number }[] = [];
    const sorted = sortGenericItems(items, "value", true);
    expect(sorted).toEqual([]);
  });

  it("should return unsorted array when compareField does not exist", () => {
    const items = [{ value: 3 }, { value: 1 }, { value: 2 }];
    const sorted = sortGenericItems(
      items,
      "nonexistent" as keyof typeof items[0],
      true
    );
    expect(sorted).toEqual(items);
  });
});

describe("listOfUniqueValues", () => {
  it("should return unique items based on the indicator field", () => {
    const items = [
      { category: "fruit", name: "apple" },
      { category: "fruit", name: "banana" },
      { category: "vegetable", name: "carrot" },
      { category: "vegetable", name: "cucumber" },
    ];
    const unique = listOfUniqueValues(items, "category");
    expect(unique).toEqual([
      { category: "fruit", name: "apple" },
      { category: "vegetable", name: "carrot" },
    ]);
  });

  it("should handle an empty array", () => {
    const items: { category: string }[] = [];
    const unique = listOfUniqueValues(items, "category");
    expect(unique).toEqual([]);
  });

  it("should return first occurrence of duplicates", () => {
    const items = [
      { category: "fruit", name: "apple" },
      { category: "fruit", name: "banana" },
      { category: "fruit", name: "cherry" },
    ];
    const unique = listOfUniqueValues(items, "category");
    expect(unique).toEqual([{ category: "fruit", name: "apple" }]);
  });
});
