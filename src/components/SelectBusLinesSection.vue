<script setup lang="ts">
import { BusLine } from "@/types";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  selectedLine: BusLine | null;
}>();

const emit = defineEmits<{
  (e: "update:selectedLine", line: BusLine | null): void;
}>();

const selectLine = (line: BusLine) => {
  store.dispatch("fetchBusStops/generateBusStopsList", line);
  emit("update:selectedLine", line);
};

const busLinesList = computed(() => store.state.fetchBusStops.busLinesList);
</script>

<template>
  <div class="bus-lines-select-section__container">
    <h6 class="bus-lines-select-section__title">Select Bus Line</h6>
    <div class="bus-lines-select-section__list">
      <button
        v-for="line in busLinesList"
        :key="line"
        @click="selectLine(line)"
        :class="[
          'bus-lines-select-section__button',
          { selected: selectedLine === line },
        ]"
      >
        {{ line }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.bus-lines-select-section__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px 20px;
  background-color: #fff;
}

.bus-lines-select-section__title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.bus-lines-select-section__button {
  margin: 2px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.bus-lines-select-section__button:hover {
  background-color: #0056b3;
}

.selected {
  background-color: #2e3e6e;
}

.selected:hover {
  opacity: 0.8;
}
</style>
