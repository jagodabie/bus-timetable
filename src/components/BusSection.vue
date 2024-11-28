<template>
  <div class="bus-lines__line-stop-section">
    <div v-if="showTitle" class="bus-lines__line-stop-section__container">
      <h6 class="bus-lines__line-stop-section__title">
        {{ sectionTitle }}
      </h6>

      <slot></slot>
    </div>
    <BusLinePlaceholder v-else :title="placeholderTitle" key="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { Nullable } from "@/types";
import BusLinePlaceholder from "../components/ui/BusPlaceholder.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  showTitle: Nullable<boolean>;
  sectionTitle: string;
  onItemClick?: () => void;
  placeholderTitle: string;
}>();
</script>
<style scoped>
.bus-lines__line-stop-section__title {
  padding: 27px;
  font-size: 14px;
  font-weight: 500;
}
.bus-lines__line-stop-section {
  display: flex;
  flex-direction: column;
  background: #fff;
}
.bus-lines__line-stop-section,
.bus-lines__timetable-section {
  width: 50%;
}
.bus-lines-section {
  background: #fff;
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
