<template>
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
        :items="currentBusStopsList"
        v-model:selected="selectedStop"
        :header="header"
        sortField="order"
      />
    </div>

    <BusLinePlaceholder
      v-else
      title="Please select the bus stop first"
      key="stops"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import GenericList from "@/components/ui/GenericList.vue";
import BusLinePlaceholder from "@/components/ui/BusLinePlaceholder.vue";

defineProps<{
  selectedLine: string | null;
  currentBusStopsList: Array<Record<string, any>>;
  selectedStop: Record<string, any> | null;
  header: string;
}>();
</script>

<style scoped>
.bus-lines__line-stop-section__container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.bus-lines__line-stop-section__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
