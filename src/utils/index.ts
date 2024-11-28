type CompareStrategy<T> = (
  aValue: T[keyof T],
  bValue: T[keyof T],
  isAscending: boolean
) => number;

const isString = (value: unknown): value is string => typeof value === "string";

const timeCompareStrategy: CompareStrategy<any> = (
  aValue,
  bValue,
  isAscending
) => {
  if (isString(aValue) && isString(bValue)) {
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
  return 0;
};

const numberCompareStrategy: CompareStrategy<any> = (
  aValue,
  bValue,
  isAscending
) => {
  return isAscending
    ? (aValue as number) - (bValue as number)
    : (bValue as number) - (aValue as number);
};

const stringCompareStrategy: CompareStrategy<any> = (
  aValue,
  bValue,
  isAscending
) => {
  return isAscending
    ? (aValue as string).localeCompare(bValue as string)
    : (bValue as string).localeCompare(aValue as string);
};

const defaultCompareStrategy: CompareStrategy<any> = () => 0;

const getStrategy = <T>(value: unknown, field: keyof T): CompareStrategy<T> => {
  if (field === "time" && isString(value)) return timeCompareStrategy;
  if (typeof value === "string") return stringCompareStrategy;
  if (typeof value === "number") return numberCompareStrategy;
  return defaultCompareStrategy;
};

export function sortGenericItems<T>(
  items: T[],
  compareField: keyof T,
  isAscending: boolean
): T[] {
  return [...items].sort((a, b) => {
    const aValue = a[compareField];
    const bValue = b[compareField];
    const strategy = getStrategy(aValue, compareField);
    return strategy(aValue, bValue, isAscending);
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
