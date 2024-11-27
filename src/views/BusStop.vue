<template>
  <div class="bus-stops">
    <div class="search__wrapper">
      <!-- Two-way binding for the search term -->
      <SearchBar v-model:query="searchTerm" />
    </div>
    <!-- Pass the filtered bus stops to the GenericList -->
    <GenericList
      :items="filteredBusStops"
      header="Bus Stops"
      sortField="name"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SearchBar from "../components/ui/SearchBar.vue";
import GenericList from "../components/ui/GenericList.vue";

import { useStore } from "vuex";

// Vuex store
const store = useStore();

// Reactive search term
const searchTerm = ref<string>("");

// Bus stops from the Vuex store
const busStops = computed(() => store.state.fetchBusStops.stopsList);

// Filtered bus stops based on search term
const filteredBusStops = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return busStops.value.filter((stop: { name: string }) =>
    stop.name.toLowerCase().includes(term)
  );
});

// Fetch bus stops on mount
onMounted(async () => {
  await store.dispatch("fetchBusStops/generateStopsList");
});
</script>

<style scoped>
.search__wrapper {
  max-width: 256px;
}
</style>
