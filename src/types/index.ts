export type Nullable<T> = T | null;

export type Recordable<T = any> = Record<string, T>;

export type BusLine = {
  line: number;
};

export type BusStop = {
  id: number;
  name: string;
  order: number;
  time: string;
};
