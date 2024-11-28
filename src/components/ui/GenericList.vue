<script setup lang="ts">
import { computed, ref } from "vue";

import SortIcon from "../../assets/icons/SortIcon.vue";

import { Nullable, Recordable } from "@/types";
import { listOfUniqueValues, sortGenericItems } from "../../utils/index";

const props = defineProps<{
  items: Nullable<Recordable[]>; // Array of items (nullable)
  selected?: Nullable<Recordable>; // Currently selected item (nullable)
  header?: Nullable<string>;
  hiddenSortIcon?: Nullable<boolean>; // Hide sort icon
  onItemClick?: () => void; // Callback function for item click
  sortField: string;
}>();

const isAscending = ref(true); // Track sorting direction

const sortedItems = computed(() => {
  if (!props.items) return [];
  return listOfUniqueValues(
    sortGenericItems([...props.items], props.sortField, isAscending.value),
    "id"
  );
});

const emit = defineEmits<{
  (e: "update:selected", item: Recordable): void;
}>();

const handleSelection = (item: any) => {
  emit("update:selected", item);
  if (props.onItemClick) props.onItemClick();
};

const sortItems = () => {
  isAscending.value = !isAscending.value;
};
</script>
<template>
  <div class="generic-list__container">
    <div v-if="header" class="generic-list__header">
      <h6 class="generic-list__title">{{ header }}</h6>
      <div
        v-if="!hiddenSortIcon"
        :class="[
          'generic-list__sort-icon',
          { hidden: hiddenSortIcon },
          { rotated: !isAscending },
        ]"
        @click="sortItems"
      >
        <SortIcon />
      </div>
    </div>
    <ul v-if="sortedItems && sortedItems.length" class="generic-list__items">
      <li
        v-for="item in sortedItems"
        :key="item.id"
        :class="['generic-list__item', { selected: selected?.id === item.id }]"
        @click="handleSelection(item)"
      >
        <slot :item="item">
          {{ item.name || "" }}
        </slot>
      </li>
    </ul>
    <p v-else class="generic-list__error-message">No items to display.</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  list-style-type: none;
  padding: 0;
  padding: 20px;
  margin: 1px;
  background: #fff;
  border-top: 1px solid #d9d9d9;
}

li:hover {
  pointer-events: auto;
  cursor: pointer;
}

.selected {
  color: #1952e1;
}
.hidden {
  display: none;
}

.generic-list__header {
  display: flex;
  gap: 10px;
  padding: 20px 19px 20px 16px;
  margin-bottom: 1px;
  background: #fff;
  position: relative;
}

.generic-list__title {
  font-size: 12px;
  font-weight: 500;
  position: relative;
}

.generic-list__error-message {
  color: #ff4d4f; /* Red error message */
  font-size: 14px;
  margin-top: 10px;
}

.generic-list__sort-icon {
  cursor: pointer;
  position: absolute;
  left: 80px;
  top: 25%;
}

.generic-list__sort-icon:hover {
  opacity: 0.8;
}
.generic-list__sort-icon.rotated {
  transform: rotate(180deg); /* Rotate 180 degrees */
}
</style>
