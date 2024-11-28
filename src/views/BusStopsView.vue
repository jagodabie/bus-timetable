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
    <div class="search__wrapper">
      <SearchBar v-model:query="searchTerm" label="Search" />
    </div>
    <GenericList
      :items="filteredBusStops"
      header="Bus Stops"
      sortField="name"
    />
  </div>
</template>

<style scoped>
.search__wrapper {
  max-width: 256px;
}
</style>
