export type BusStop = {
  line: number;
  stop: string;
  order: number;
  time: string;
};

export type ListBusStop = Omit<BusStop, "stop"> & {
  name: string;
  id: number;
};

export type BusLine = {
  line: number;
};

export type Tab = {
  path: string;
  label: string;
};
