import { createStore, Module } from "vuex";
import { BusStop, ListBusStop } from "@/types/BusStop";
import axios from "axios";
import { listOfUniqueValues } from "@/utils";

interface FetchState {
  data: BusStop[] | [];
  busLinesList: number[];
  currentBusStopsList: BusStop[];
  currentStopDepartures: BusStop[];
  stopsList: string[];
  loading: boolean;
  error: string | null;
}

export const fetchBusStops: Module<FetchState, any> = {
  namespaced: true,

  state: () => ({
    data: [],
    busLinesList: [],
    currentBusStopsList: [],
    currentStopDepartures: [],
    stopsList: [],
    loading: false,
    error: null,
  }),

  mutations: {
    START_LOADING(state) {
      state.loading = true;
      state.error = null;
    },
    SET_DATA(state, payload: BusStop[]) {
      state.data = payload;
    },
    SET_LINES_LIST(state, payload: number[]) {
      state.busLinesList = payload;
    },
    SET_CURRENT_BUS_STOPS_LIST(state, payload: BusStop[]) {
      state.currentBusStopsList = payload;
    },

    SET_STOPS_LIST(state, payload: []) {
      state.stopsList = payload;
    },

    SET_STOP_DEPARTURES(state, payload: BusStop[]) {
      state.currentStopDepartures = payload;
    },

    FAILURE(state, error: string) {
      state.error = error;
      state.loading = false;
    },
    END_LOADING(state) {
      state.loading = false;
    },
  },
  actions: {
    async fetchData({ commit, dispatch }) {
      commit("START_LOADING");
      try {
        const response = await axios.get("http://localhost:3000/stops");
        const data = response.data as BusStop[];

        commit("SET_DATA", data);

        dispatch("generateBusLinesList", data);
      } catch (error: any) {
        commit("FAILURE", error.message || "An error occurred");
      } finally {
        commit("END_LOADING");
      }
    },

    generateBusLinesList({ commit }, data: BusStop[]) {
      const busLinesList = listOfUniqueValues(
        data.sort((a: BusStop, b: BusStop) => a["line"] - b["line"]),
        "line" as keyof BusStop
      ).map((line) => line.line);

      commit("SET_LINES_LIST", busLinesList);
    },

    generateBusStopsList({ commit, state }, selectedBusLine: number) {
      const busStopsList = listOfUniqueValues(
        state.data
          .filter((item: BusStop) => item.line === selectedBusLine)
          .sort((a: BusStop, b: BusStop) => a["order"] - b["order"]),
        "order" as keyof BusStop
      ).map((item) => ({
        id: item.order,
        name: item.stop,
        order: item.order,
        line: item.line,
        time: item.time,
      }));
      commit("SET_CURRENT_BUS_STOPS_LIST", busStopsList);
    },
    generateStopsList({ commit, state }) {
      const stopsList = listOfUniqueValues(
        state.data.sort((a, b) => a["stop"].localeCompare(b["stop"])),
        "stop" as keyof typeof state.data[0]
      ).map((item) => ({
        id: item.stop,
        name: item.stop,
      }));
      commit("SET_STOPS_LIST", stopsList);
    },
    generateCurrentStopDepartures(
      { commit, state },
      selectedStop: ListBusStop
    ) {
      const currentStopDepartures = listOfUniqueValues(
        [...state.data].filter((item) => item.stop === selectedStop?.name),
        "time"
      ).map((item) => ({
        id: item.time,
        name: item.time,
        line: item.line,
        time: item.time,
        stop: item.stop,
      }));
      console.log(currentStopDepartures, "currentStopDepartures");

      commit("SET_STOP_DEPARTURES", currentStopDepartures);
    },
  },
};

const store = createStore({
  modules: {
    fetchBusStops,
  },
});

export default store;
