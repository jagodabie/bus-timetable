export function sortGenericItems<T>(
  items: T[],
  compareField: keyof T,
  isAscending: boolean
): T[] {
  return [...items].sort((a, b) => {
    const aValue = a[compareField];
    const bValue = b[compareField];

    // Obsługa specjalna dla czasu
    if (
      compareField === "time" &&
      typeof aValue === "string" &&
      typeof bValue === "string"
    ) {
      const parseTime = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return { hours, minutes };
      };

      const timeA = parseTime(aValue);
      const timeB = parseTime(bValue);

      const timeDifference =
        timeA.hours !== timeB.hours
          ? timeA.hours - timeB.hours
          : timeA.minutes - timeB.minutes;

      return isAscending ? timeDifference : -timeDifference;
    }

    // Obsługa dla liczb
    if (typeof aValue === "number" && typeof bValue === "number") {
      return isAscending ? aValue - bValue : bValue - aValue;
    }

    // Obsługa dla stringów
    if (typeof aValue === "string" && typeof bValue === "string") {
      return isAscending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Domyślny przypadek
    return 0;
  });
}

export const listOfUniqueValues = <T, K extends keyof T>(
  sortedData: T[],
  indicator: K
): T[] => {
  return sortedData.reduce<T[]>((acc, item) => {
    if (!acc.length || item[indicator] !== acc[acc.length - 1][indicator]) {
      acc.push(item);
    }
    return acc;
  }, []);
};
