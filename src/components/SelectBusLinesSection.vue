<script setup lang="ts">
import { BusLine } from "@/types";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps<{
  selectedLine: BusLine | null;
}>();

// Emit event for selected line
const emit = defineEmits<{
  (e: "update:selectedLine", line: BusLine | null): void;
}>();

// Handle line selection
const selectLine = (line: BusLine) => {
  store.dispatch("fetchBusStops/generateBusStopsList", line);
  emit("update:selectedLine", line);
};

// Access the list of bus lines from Vuex
const busLinesList = computed(() => store.state.fetchBusStops.busLinesList);
</script>

<template>
  <div class="select-bus-lines-section__container">
    <h2 class="select-bus-lines-section__title">Select Bus Line</h2>
    <div class="select-bus-lines-section__list">
      <button
        v-for="line in busLinesList"
        :key="line"
        @click="selectLine(line)"
        :class="[
          'select-bus-lines-section__button',
          { selected: selectedLine === line },
        ]"
      >
        {{ line }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.select-bus-lines-section__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.select-bus-lines-section__button {
  margin: 2px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.select-bus-lines-section__button:hover {
  background-color: #0056b3;
}
.selected {
  background-color: #2e3e6e;
}

.selected:hover {
  opacity: 0.8;
}
</style>
