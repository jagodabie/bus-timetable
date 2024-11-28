<script setup lang="ts">
import { computed, ref, Ref } from "vue";
import { useStore } from "vuex";

import SelectBusLinesSection from "../components/SelectBusLinesSection.vue";
import GenericList from "./../components/ui/GenericList.vue";
import BusSection from "../components/BusSection.vue";

import { BusLine, BusStop } from "@/types";

const selectedLine: Ref<BusLine | null> = ref(null);
const selectedStop: Ref<BusStop | null> = ref(null);

const store = useStore();

const currentBusStopsList = computed(
  () => store.state.fetchBusStops.currentBusStopsList
);

const currentStopDepartures = computed(
  () => store.state.fetchBusStops.currentStopDepartures
);

const handleDepartureTime = () => {
  store.dispatch(
    "fetchBusStops/generateCurrentStopDepartures",
    selectedStop.value
  );
};

const handleLineUpdate = (line: BusLine | null) => {
  selectedLine.value = line;
  selectedStop.value = null;
};
</script>

<template>
  <SelectBusLinesSection
    :selectedLine="selectedLine"
    @update:selectedLine="handleLineUpdate"
    :loading="store.state.fetchBusStops.loading"
  />
  <div class="bus-lines-section">
    <BusSection
      key="stops"
      :showTitle="selectedLine && currentBusStopsList.length"
      :sectionTitle="`Bus Line: ${selectedLine}`"
      :onItemClick="handleDepartureTime"
      :placeholderTitle="`Please select the bus stop first`"
    >
      <GenericList
        v-if="selectedLine && currentBusStopsList.length"
        key="stops"
        :loading="store.state.fetchBusStops.loading"
        header="Bus Stops"
        :items="currentBusStopsList"
        v-model:selected="selectedStop"
        :onItemClick="handleDepartureTime"
        sortField="order"
      />
    </BusSection>

    <BusSection
      :showTitle="selectedStop && currentStopDepartures.length"
      :sectionTitle="`Bus Line: ${selectedStop?.name}`"
      :onItemClick="handleDepartureTime"
      :placeholderTitle="`Please select the bus stop first`"
    >
      <GenericList
        :loading="store.state.fetchBusStops.loading"
        key="timetable"
        v-if="selectedStop && currentStopDepartures.length"
        v-model:selected="selectedStop"
        :items="currentStopDepartures"
        :hiddenSortIcon="true"
        header="Time"
        sortField="time"
      />
    </BusSection>
  </div>
</template>

<style scoped>
.bus-lines-section {
  display: flex;
  gap: 16px;
}

.bus-lines__line-stop-section {
  height: fit-content;
}
</style>
