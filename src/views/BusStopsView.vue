<script setup lang="ts">
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

import SearchBar from "../components/ui/SearchBar.vue";
import GenericList from "../components/ui/GenericList.vue";

const store = useStore();
const searchTerm = ref<string>("");
const busStops = computed(() => store.state.fetchBusStops.stopsList);
const filteredBusStops = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return busStops.value.filter((stop: { name: string }) =>
    stop.name.toLowerCase().includes(term)
  );
});

onMounted(async () => {
  await store.dispatch("fetchBusStops/generateStopsList");
});
</script>

<template>
  <div class="bus-stops">
    <div class="bus-stops-search-section">
      <div class="search__wrapper">
        <SearchBar v-model:query="searchTerm" label="Search" />
      </div>
    </div>
    <GenericList
      :items="filteredBusStops"
      header="Bus Stops"
      sortField="name"
    />
  </div>
</template>

<style scoped>
.bus-stops-search-section {
  width: 100%;
  background: #fff;
}

.search__wrapper {
  max-width: 299px;
  padding: 13px 6px;
}

.bus-stops > .generic-list__container {
  margin-top: 0;
}
</style>
