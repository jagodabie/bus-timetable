<script setup lang="ts">
import SelectBusLinesSection from "./components/SelectBusLinesSection.vue";
import BusLinePlaceholder from "./components/BusLinePlaceholder.vue";
import GenericList from "./../components/ui/GenericList.vue";
import { BusLine, BusStop } from "@/types";
import { computed, ref, Ref } from "vue";
import { useStore } from "vuex";

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
</script>

<template>
  <div class="bus-lines"></div>
  <SelectBusLinesSection
    :selectedLine="selectedLine"
    @update:selectedLine="selectedLine = $event"
  />
  <div class="bus-lines__container">
    <div class="bus-lines__line-stop-section">
      <div
        v-if="selectedLine && currentBusStopsList.length"
        class="bus-lines__line-stop-section__container"
      >
        <h3 class="bus-lines__line-stop-section__title">
          {{ `Bus Line: ${selectedLine}` }}
        </h3>

        <GenericList
          v-if="selectedLine && currentBusStopsList.length"
          key="stops"
          :items="currentBusStopsList"
          v-model:selected="selectedStop"
          :onItemClick="handleDepartureTime"
          header="Bus Stops"
          sortField="order"
        />
      </div>

      <BusLinePlaceholder
        v-else
        title="Please select the bus stop first"
        key="stops"
      />
    </div>
    <div class="bus-lines__line-stop-section">
      <div
        v-if="selectedStop && currentBusStopsList.length"
        class="bus-lines__line-stop-section__container"
      >
        <h3 class="bus-lines__line-stop-section__title">
          {{ `Bus Stop: ${selectedStop.name}` }}
        </h3>

        <GenericList
          key="timetable"
          v-if="selectedStop && currentStopDepartures.length"
          v-model:selected="selectedStop"
          :items="currentStopDepartures"
          :hiddenSortIcon="true"
          header="Time"
          sortField="time"
        />
      </div>

      <!--  -->
      <BusLinePlaceholder
        v-else
        title="Please select the bus stop first"
        key="timetable"
      />
    </div>
  </div>
</template>

<style scoped>
.bus-lines {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bus-lines__line-stop-section__title {
  padding: 24px 19px 24px 16px;
}
.bus-lines__line-stop-section {
  display: flex;
  flex-direction: column;
}
.bus-lines__line-stop-section,
.bus-lines__timetable-section {
  width: 50%;
}
.bus-lines__container {
  background: #fff;
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
